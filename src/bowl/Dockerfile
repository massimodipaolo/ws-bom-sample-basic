FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm install pm2 -g

FROM base AS pruner
WORKDIR /app
RUN npm i -g turbo@1.10.7
COPY turbo.json ./turbo.json
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY src/bowl/payload/package.json ./src/bowl/payload/package.json
#RUN npm i --package-lock-only
COPY src/bowl ./src/bowl
RUN npm run prune:bowl

FROM base AS builder
WORKDIR /app
#install
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm i 
# build
COPY --from=pruner /app/out/full/ .
#ARG PAYLOAD_PUBLIC_SERVER_URL
#ENV PAYLOAD_PUBLIC_SERVER_URL=${PAYLOAD_PUBLIC_SERVER_URL}
RUN npm run build:bowl

FROM base as runtime
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src/bowl/payload/dist ./
COPY --from=builder /app/src/bowl/payload/build ./build
#COPY ksm-config.json ./ksm-config.json
ENV NODE_ENV=production
EXPOSE 4000
ENV PORT 4000
CMD ["pm2-runtime", "server.js"]
