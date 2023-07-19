FROM node:16-alpine AS base
RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm install pm2 -g

FROM base AS pruner
WORKDIR /app
RUN npm i -g turbo@1.10.7
COPY turbo.json ./turbo.json
COPY package.json ./package.json
#COPY package-lock.json ./package-lock.json
COPY .eslintrc.js ./.eslintrc.js 
COPY .npmrc ./.npmrc 
COPY .nvmrc ./.nvmrc
COPY .bom ./.bom
COPY src/mixer/packages ./src/mixer/packages
COPY src/mixer/web ./src/mixer/web
RUN npm i --package-lock-only
RUN npm run prune:web

FROM base AS builder
WORKDIR /app
#install
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm ci
# build
COPY --from=pruner /app/out/full/ .
#COPY ksm-config.json ./ksm-config.json
RUN npm run build:web

FROM base as runtime
WORKDIR /app
#COPY ksm-config.json ./ksm-config.json
COPY --from=builder /app/node_modules ./node_modules
#COPY --from=pruner /app/out/full/src/mixer/web/public ./public
COPY --from=builder /app/src/mixer/web/.next/standalone ./
COPY --from=builder /app/src/mixer/web/.next/static ./.next/static
ENV NODE_ENV=production
EXPOSE 3000
ENV PORT 3000
CMD ["pm2-runtime", "server.js"]
