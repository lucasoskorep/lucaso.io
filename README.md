# lucaso.io

Lucas Oskorep's personal website — an interactive GNOME 1.4 / GTK+ retro desktop environment simulating a multi-window workspace manager with a document viewer, starfield canvas, projects, blog, 3D print portfolio, and secret recipes.

Built with [Astro](https://astro.build) (v7) and TypeScript.

## Development

This project uses [mise](https://mise.jdx.dev) for tool and task management. With mise installed, the pinned tools (`node@latest` and `npm@latest`) are activated automatically upon entering the directory.

```sh
mise install        # install pinned tools (node, npm)
mise run setup      # install dependencies (npm install)
mise run dev        # start local Astro dev server with instant HMR at http://localhost:4321
mise run build      # generate the production static site into output/
mise run preview    # preview the production build locally
mise tasks          # list all available tasks
```

You can also run standard npm commands directly:

```sh
npm install
npm run dev
npm run build
npm run preview
npm run check
```

## Project Structure

```text
├── astro.config.mjs          # Astro build & static output configuration
├── tsconfig.json             # TypeScript configuration
├── mise.toml                 # Tool versions and developer task definitions
├── public/                   # Static assets served at the root (images, etc.)
│   └── images/
├── src/
│   ├── content.config.ts     # Content Collections schemas (Zod validation)
│   ├── content/              # Markdown content collections
│   │   ├── blog/             # Technical blog articles
│   │   ├── models/           # 3D printable designs (STL / Printables)
│   │   ├── projects/         # Software projects & microservices
│   │   ├── recipes/          # Standardized personal recipes
│   │   └── pages/            # Error and index pages
│   ├── layouts/              # Reusable page shells
│   │   ├── BaseLayout.astro  # Top panel, apps menu, desktop background, taskbar
│   │   └── ArticleLayout.astro # Workspace 2 document viewer & Giscus comments
│   ├── components/           # UI components
│   │   ├── DesktopIcons.astro# Left shortcut rail & secret recipes launcher
│   │   ├── Giscus.astro      # GitHub discussions comment widget
│   │   └── windows/          # Reusable GTK+ 1.2 window components
│   ├── styles/               # Retro GTK/GNOME dark theme and syntax styles
│   └── scripts/              # Window manager (drag, resize, focus, tiling) & starfield
└── Dockerfile                # Multi-stage container build (mise -> Nginx release)
```

## Deployment & Containers

The production container is built using a multi-stage Docker build:
1. **Builder stage**: Uses `ghcr.io/jdx/mise` to run `mise install` and `mise run publish`.
2. **Release stage**: Serves the compiled static files from `/app/output/` via `nginx:latest`.

```sh
mise run container:build   # Build multi-arch container image with podman
mise run container:run     # Run container locally on http://localhost:8000
```
