FROM node:14-buster

RUN apt-get update && apt-get install -y \
  libx11-xcb1 \
  libxtst6 \
  libnss3 \
  libxss1 \
  libasound2 \
  libatk1.0-0

# Adicione o resto das instruções do seu Dockerfile aqui
