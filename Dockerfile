FROM alpine:3.14 AS build

WORKDIR /root

# RUN apk update && apk install -y \
#   libx11-xcb1 \
#   libxtst6 \
#   libnss3 \
#   libxss1 \
#   libasound2 \
#   libatk1.0-0

RUN apk update \
    && apk install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apk update \
    && apk install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*
 

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