FROM node:9.4

WORKDIR /app

COPY . /app

RUN npm install && npm run build

CMD npm start --production

EXPOSE 3000