FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install


COPY src ./src
COPY prisma ./prisma
COPY tsconfig.json ./

RUN npx prisma generate

RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

COPY --from=builder /app/generated ./generated

EXPOSE 3000

CMD sh -c "npx prisma migrate deploy && npm run start"
