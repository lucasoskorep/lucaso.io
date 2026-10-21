FROM ghcr.io/jdx/mise:2026.10.4-debian AS builder
LABEL authors="lucasoskorep"

WORKDIR /app

# Install the project's tools (python, uv) from mise.toml
COPY mise.toml ./
RUN mise trust && mise install

# Pull python dependencies with uv (cached until the lockfile changes)
COPY pyproject.toml uv.lock README.md ./
RUN uv sync --frozen

COPY . .
RUN mise run publish

FROM docker.io/library/nginx:latest AS release
LABEL authors="lucasoskorep"

COPY --from=builder /app/output/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
