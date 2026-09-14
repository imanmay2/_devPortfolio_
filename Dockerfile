# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Portfolio — Manmay Chakraborty
#
# Two targets:
#   prod (default) — Vite production build served by nginx on :80
#   dev            — Vite dev server with HMR on :5173
#
# Quick look (production build):
#   docker build -t portfolio .
#   docker run --rm -p 8080:80 portfolio
#   open http://localhost:8080
#
# Live editing (hot reload):
#   docker compose up dev
#   open http://localhost:5173
# ---------------------------------------------------------------------------


# --- Dependencies ----------------------------------------------------------
# Isolated so that a source-only change does not re-run the install.
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
# react/react-dom are declared as optional peers rather than direct deps, but
# they are pinned in the lockfile, so `npm ci` resolves them correctly.
RUN npm ci --no-audit --no-fund


# --- Dev server ------------------------------------------------------------
FROM node:20-alpine AS dev
WORKDIR /app
ENV NODE_ENV=development

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 5173
# --host binds to 0.0.0.0 so the port is reachable from outside the container.
CMD ["npx", "vite", "--host", "0.0.0.0", "--port", "5173"]


# --- Production build ------------------------------------------------------
FROM node:20-alpine AS build
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build


# --- Static server ---------------------------------------------------------
FROM nginx:1.27-alpine AS prod

COPY --from=build /app/dist /usr/share/nginx/html

# Single-page app: hashed assets cache forever, index.html never does, and any
# unknown path falls back to the app rather than nginx's 404 page.
RUN printf '%s\n' \
  'server {' \
  '  listen 80;' \
  '  server_name _;' \
  '  root /usr/share/nginx/html;' \
  '  index index.html;' \
  '' \
  '  gzip on;' \
  '  gzip_comp_level 6;' \
  '  gzip_min_length 512;' \
  '  gzip_types text/plain text/css application/javascript application/json image/svg+xml;' \
  '' \
  '  location /assets/ {' \
  '    expires 1y;' \
  '    add_header Cache-Control "public, immutable";' \
  '  }' \
  '' \
  '  location / {' \
  '    try_files $uri $uri/ /index.html;' \
  '    add_header Cache-Control "no-cache";' \
  '  }' \
  '}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://localhost/ >/dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
