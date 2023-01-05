FROM alpine:3.14 AS build

WORKDIR /root

RUN apk update && apk --install -y \
  libx11-xcb1 \
  libxtst6 \
  libnss3 \
  libxss1 \
  libasound2 \
  libatk1.0-0

RUN apk add --update --no-cache nodejs npm

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY tokens ./tokens

RUN npm install
RUN npm run build
RUN npm prune --production



FROM alpine:3.14
WORKDIR /root

COPY --from=build /root/node_modules ./node_modules
COPY --from=build /root/dist ./dist

ENTRYPOINT ["node", "dist/server.js"]