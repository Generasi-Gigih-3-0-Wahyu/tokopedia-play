#  Dockerfile for Node Express Backend

FROM node:18-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 5002

CMD [ "npm", "start" ]