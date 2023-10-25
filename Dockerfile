ARG PUBLIC_PATH=//static3.instapainting.com/beta/
FROM node:20-alpine3.17 AS builder
ARG PUBLIC_PATH

# log most things
ENV NPM_CONFIG_LOGLEVEL=notice

# OS packages for compilation
RUN apk add --no-cache make g++ git perl
# RUN apt-get update && apt-get install -y wget make g++ zlib1g-dev
# RUN wget https://www.python.org/ftp/python/3.6.9/Python-3.6.9.tgz && tar xvf Python-3.6.9.tgz && cd Python-3.6.9 && ./configure --enable-optimizations --enable-shared && make -j8 && make altinstall
# RUN corepack enable && yarn init -2 && yarn set version stable
RUN corepack enable

# install NPM packages
WORKDIR /build
# add source
COPY package*.json ./
COPY yarn.lock ./
COPY .yarnrc.yml ./
# COPY node_modules ./node_modules
RUN yarn install --network-timeout 1000000000

COPY . .

ENV PUBLIC_PATH=$PUBLIC_PATH
ENV NODE_ENV=production

# build
RUN yarn rescript
RUN yarn dev:vite:server-fix # This fixes the imports in node_modules
RUN yarn build

########################

FROM node:18.17-alpine
ARG PUBLIC_PATH

WORKDIR /app

# copy source + compiled `node_modules` 
COPY --from=builder /build .

EXPOSE 3000

ENV PUBLIC_PATH=$PUBLIC_PATH
# by default, run in production mode
CMD yarn production

