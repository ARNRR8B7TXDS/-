# Horizon Properties

Static marketing site for a luxury real-estate agency.

## Stack / layout

- `index.html` — single page shell; all sections are rendered client-side.
- `script.js` — the whole app: data arrays at the top (`P`, `TEAM`, `SERV`,
  `WHY`, `FEAT`, `AMEN`), a tiny hash router (`#/`, `#/properties`, `#/about`,
  `#/services`, `#/team`, `#/contact`) and view templates.
- `style.css` — all styling. Images/video (`.jpg`, `.mp4`, `.webm`) live next to
  `index.html` and are referenced by bare relative filename.
- No package manager, no bundler, no backend, no API calls. Nothing to install
  or migrate.

## Running it here

`docker compose -f docker-compose.base44.yml up -d` serves the checkout on
host port 3000 via nginx (repo bind-mounted read-only at
`/usr/share/nginx/html`).

Because there is no dev server or compile step, **edits are visible on reload**
— refresh the preview (the `reload_preview` step) after changing
`index.html`, `style.css` or `script.js`; no rebuild or restart is needed.

## Useful commands

```bash
docker compose -f docker-compose.base44.yml ps          # service health
docker compose -f docker-compose.base44.yml logs web    # nginx logs
curl -s http://localhost:3000/ | head                   # smoke test
```

## How to spot a broken setup

- `curl http://localhost:3000/` should return the real `index.html` (title
  "Horizon Properties | Luxury Real Estate") — anything else means the mount
  or the container is wrong.
- Routes are hash-based, so the server only ever serves `/`; a 404 on
  `#/properties` is a client-side router bug in `script.js`, not a server
  issue.
