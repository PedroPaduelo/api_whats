FROM alpine:3.14 AS build

WORKDIR /root
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

RUN apk add --update --no-cache nodejs npm
RUN apk update && apk install -y libgconf-2-4


ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN yarn add puppeteer@13.5.0


COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm install
RUN npm run build
RUN npm prune --production

FROM alpine:3.14

WORKDIR /root

COPY --from=build /root/node_modules ./node_modules
COPY --from=build /root/dist ./dist

RUN apk add --update --no-cache postgresql-client nodejs npm

ENTRYPOINT ["node", "dist/server.js"]