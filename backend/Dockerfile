FROM node:18-alpine3.17

WORKDIR /app

# ENV NODE_ENV production

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["./startup.sh"]