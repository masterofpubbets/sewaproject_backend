FROM node

WORKDIR /app

COPY package.json /app

RUN npm install --save

COPY . /app

RUN npm build

EXPOSE 3000

CMD ["node", "app.js"]




