# Use the Docker BuildKit syntax
# syntax=docker/dockerfile:1

################################################################################
# STEP 1: Install dependencies only when needed
################################################################################
FROM node:18-alpine AS deps

# Set working directory
WORKDIR /app

# Install OS deps
RUN apk add --no-cache libc6-compat

# Copy dependency definitions
COPY package.json yarn.lock .npmrc* ./

# Install all node modules (including devDependencies)
RUN yarn install --frozen-lockfile

################################################################################
# STEP 2: Build the application
################################################################################
FROM node:18-alpine AS builder
WORKDIR /app

# Copy over dependencies and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_PUBLIC_HASURA_API_URL="https://api.ityhad.com/v1/graphql"
ENV NEXT_PUBLIC_HASURA_ADMIN_SECRET="ityhad2025"
ENV NEXT_PUBLIC_AUTH_API="https://auth.ityhad.com"
ENV NEXT_PUBLIC_APP_URL="https://app.ityhad.com"

# Build Next.js refine app
RUN yarn build

################################################################################
# STEP 3: Setup production image
################################################################################
FROM node:18-alpine AS runner
WORKDIR /app

# Define production environment variable
ENV NODE_ENV=production

# Copy built app and dependencies from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./

# Expose default Next.js port
EXPOSE 3000
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
# Launch the Next.js server
CMD ["yarn", "start"]
