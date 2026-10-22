# This is the readme for my personal site

Check this thing out and let me know what you think

## Development

This project uses [mise](https://mise.jdx.dev) for tool and task management.
With [mise installed](https://mise.jdx.dev/installing-mise.html), the pinned
tools (Python 3.12 + uv) are picked up automatically when you enter the directory:

```sh
mise install        # install the pinned tools (python, uv)
mise run setup      # sync python dependencies with uv
mise run devserver  # build + live-reload serve at http://localhost:8000
mise run build      # generate the static site into output/
mise run publish    # generate with production settings
mise tasks          # list all available tasks
```

Extra pelican options can be passed via `PELICANOPTS`, e.g.
`PELICANOPTS=-D mise run build` for debug output.

The container image is built on the official `ghcr.io/jdx/mise` image and runs
the same `mise run publish` task; see the `container:*` tasks for local
podman builds.

