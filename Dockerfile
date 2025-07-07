# --- Estágio de Build ---
FROM node:22-alpine AS builder

WORKDIR /app

# Copia os arquivos de configuração do projeto
COPY package*.json ./
RUN npm install # Instala TODAS as dependências (incluindo devDependencies como 'prisma' e 'typescript')

# Copia o código fonte e as configurações do Prisma
COPY src ./src
COPY prisma ./prisma
COPY tsconfig.json ./

# 1. Gerar o Prisma Client (CRUCIALMENTE ANTES de compilar o TS).
# Isso vai criar a pasta 'generated/prisma' no /app dentro do contêiner.
RUN npx prisma generate

# 2. Compilar o TypeScript para JavaScript.
# O compilador agora terá acesso aos tipos gerados em 'generated/prisma'.
RUN npm run build # Isso cria a pasta 'dist'

# --- Estágio de Produção ---
# Usa uma imagem Node.js Alpine ainda mais leve para a imagem final.
FROM node:22-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas o essencial do estágio de build:
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
# NOVO/CORREÇÃO: Copia a pasta 'generated' inteira (que contém generated/prisma)
COPY --from=builder /app/generated ./generated

EXPOSE 3000

# Comando para rodar as migrações e iniciar a aplicação.
# Isso garantirá que o DB seja criado/atualizado e a app inicie.
CMD sh -c "npx prisma migrate deploy && node dist/index.js"
