FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json ./
RUN npm ci

COPY . .
RUN npm run build:ssr


FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4177

COPY package.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server

EXPOSE 4177
CMD ["node", "server/index.js"]
