FROM ghcr.io/jdx/mise:2026.10.19-debian AS builder
LABEL authors="lucasoskorep"

WORKDIR /app

# Install tools from mise.toml (node, npm)
COPY mise.toml ./
RUN mise trust && mise install

# Install dependencies (cached until package files change)
COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN mise run publish

FROM docker.io/library/nginx:latest AS release
LABEL authors="lucasoskorep"

COPY --from=builder /app/output/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
