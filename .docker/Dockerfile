FROM node:slim

WORKDIR /app

COPY package*.json .

COPY postcss.config.mjs .

RUN npm install

CMD ["npm", "run", "dev"]