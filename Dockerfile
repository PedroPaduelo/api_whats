FROM alpine:3.14 AS build

WORKDIR /root

RUN apk add --update --no-cache nodejs npm

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm install
RUN npm run build

FROM alpine:3.14

WORKDIR /root

COPY --from=build /root/node_modules ./node_modules
COPY --from=build /root/dist ./dist

RUN apk add --update --no-cache nodejs npm 


# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser



# Run everything after as non-privileged user.
USER pptruser

ENTRYPOINT ["node", "dist/server.js"]