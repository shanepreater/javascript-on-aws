FROM node:9.4

WORKDIR /app

RUN git clone https://github.com/shanepreater/javascript-on-aws.git . && \
    npm install && \
    npm run build

CMD npm start --production

EXPOSE 3000