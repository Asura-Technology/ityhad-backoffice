#!/usr/bin/env sh
set -e

# load runtime .env
if [ -f /app/.env ]; then
  export $(grep -v '^\s*#' /app/.env | xargs)
fi

# generate a tiny script that seeds window.__ENV
cat > /app/public/runtime-env.js <<EOF
window.__ENV = {
  NEXT_PUBLIC_STORAGE_URL: "${NEXT_PUBLIC_STORAGE_URL:-}",
  NEXT_PUBLIC_BASE_URL: "${NEXT_PUBLIC_BASE_URL:-}",
  NEXT_PUBLIC_STORAGE_BUCKET: "${NEXT_PUBLIC_STORAGE_BUCKET:-}"
};
EOF

# hand off to your CMD (e.g. yarn start)
exec "$@"
