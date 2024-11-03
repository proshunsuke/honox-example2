FROM node:22.11.0 AS base

FROM base AS builder

RUN apt-get update && \
    apt-get install -y --no-install-recommends libatomic1 && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY package*json tsconfig.json app public vite.config.ts ./

RUN npm ci && \
    npm run build && \
    npm prune --production

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono

COPY --from=builder --chown=hono:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=hono:nodejs /app/dist /app/dist
COPY --from=builder --chown=hono:nodejs /app/package.json /app/package.json

USER hono
EXPOSE 3000

CMD ["node", "/app/dist/index.js"]

# 開発用のステージ
FROM base AS dev
WORKDIR /app

COPY --from=builder /app /app

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
