#!/usr/bin/env sh
set -e

# load runtime .env
if [ -f /app/.env ]; then
  export $(grep -v '^\s*#' /app/.env | xargs)
fi

# generate a tiny script that seeds window.__ENV
cat > /app/public/runtime-env.js <<EOF
window.__ENV = {
  NEXT_PUBLIC_HASURA_API_URL: "${NEXT_PUBLIC_HASURA_API_URL:-}",
  NEXT_PUBLIC_HASURA_ADMIN_SECRET: "${NEXT_PUBLIC_HASURA_ADMIN_SECRET:-}"
};
EOF

# hand off to your CMD (e.g. yarn start)
exec "$@"
