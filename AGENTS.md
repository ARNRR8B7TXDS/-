# BODRĒN landing page — repo notes

Static site: `index.html`, `style.css`, `script.js`, `assets/*.svg`. No build step, no
package manager, no database, no environment variables or secrets.

## Running it here (Base44 sandbox)

```bash
docker compose -f docker-compose.base44.yml up -d --build   # serves the repo on http://localhost:3000
docker compose -f docker-compose.base44.yml logs -f web     # request log
docker compose -f docker-compose.base44.yml down
```

`docker-compose.base44.yml` runs a plain `nginx:alpine` with the repo bind-mounted, so
the served files are always the cloned source. Two non-obvious details, both sandbox-only:

- The sandbox clones the repo into a `0700` directory that nginx's unprivileged worker
  user cannot traverse, and the mount is read-only. The service therefore rewrites the
  `user` directive in `/etc/nginx/nginx.conf` to `root` before starting nginx. Never
  needed outside the sandbox.
- `nginx.base44.conf` serves from `/usr/share/nginx/html` with caching disabled
  (`Cache-Control: no-store`) and a `/healthz` probe used by the Compose healthcheck.

There is no live-reload dev server, so after editing a file use the preview's full
reload to see the change.

## Verifying

Serve `http://localhost:3000/` and check, in the browser: the hero composition
(caramel splash, dark takeaway cup, cream iced cup, floating beans), the three product
cards, the "Посмотреть меню" expander, the quiz result, and the cart counter after
clicking a `+` button. Add-to-cart state lives in memory only (no storage, no backend).

## Notes

- `A.png … F.png` and the `*.jpg` / `*.mp4` files at the repo root are leftovers from an
  earlier real-estate version of this branch and are not referenced by the coffee page.
- Product imagery is hand-built SVG in `assets/` (no external image hosts, no network
  requests at runtime), so it stays crisp at any size and adds no download weight.
