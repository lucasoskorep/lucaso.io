FROM ghcr.io/astral-sh/uv:python3.12-bookworm-slim as builder
LABEL authors="lucasoskorep"
ARG JUST_VERSION=1.39.0

RUN apt update && apt install make -y

# RUN \
#  wget -O - https://github.com/casey/just/releases/download/${JUST_VERSION}/just-${JUST_VERSION}-x86_64-unknown-linux-musl.tar.gz \
#  | tar --directory /usr/local/bin --extract --gzip --file - just

WORKDIR /app

COPY pyproject.toml .
COPY README.md .

RUN uv sync

COPY . .

RUN uv run make publish

FROM docker.io/library/nginx:latest as release
LABEL authors="lucasoskorep"

COPY --from=builder /app/output/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]