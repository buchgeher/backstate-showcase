# Multi-stage Dockerfile to build and run Backstage smoothly
# -------------------------------------------------------------
# Stage 1: Build packages
FROM node:22-bookworm-slim AS build

# Install python and build tools for sqlite3 / node-gyp
RUN apt-get update && \
    apt-get install -y --no-install-recommends python3 g++ make libsqlite3-dev && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy yarn and configuration files
COPY .yarn ./.yarn
COPY .yarnrc.yml ./
COPY backstage.json ./
COPY package.json yarn.lock ./

# Copy package descriptors
COPY packages/app/package.json ./packages/app/
COPY packages/backend/package.json ./packages/backend/

# Install dependencies
RUN yarn install --immutable

# Copy source code and config
COPY tsconfig.json ./
COPY packages ./packages
COPY app-config*.yaml ./
COPY examples ./examples

# Build backend and frontend bundles
RUN yarn tsc
RUN yarn build:backend --config ../../app-config.yaml

# -------------------------------------------------------------
# Stage 2: Runtime Image
FROM node:22-bookworm-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends python3 python3-pip libsqlite3-dev mkdocs-material && \
    pip install --break-system-packages mkdocs-techdocs-core mkdocs-kroki-plugin && \
    rm -rf /var/lib/apt/lists/*

USER node
WORKDIR /app

ENV NODE_ENV=production

# Copy built backend bundle
COPY --chown=node:node --from=build /app/yarn.lock /app/package.json /app/packages/backend/dist/skeleton.tar.gz ./
RUN tar xzf skeleton.tar.gz && rm skeleton.tar.gz

COPY --chown=node:node --from=build /app/.yarn ./.yarn
COPY --chown=node:node --from=build /app/.yarnrc.yml ./
COPY --chown=node:node --from=build /app/backstage.json ./

# Install production dependencies
RUN yarn workspaces focus --all --production && rm -rf "$(yarn cache clean)"

# Copy backend bundle, examples, and app configurations
COPY --chown=node:node --from=build /app/packages/backend/dist/bundle.tar.gz ./
RUN tar xzf bundle.tar.gz && rm bundle.tar.gz
COPY --chown=node:node --from=build /app/app-config*.yaml ./
COPY --chown=node:node --from=build /app/examples ./examples

EXPOSE 7007

CMD ["node", "packages/backend", "--config", "app-config.yaml"]
