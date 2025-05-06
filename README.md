Dockerfile:

FROM node:14-alpine
WORKDIR /app          # сюда занесем свое приложение, перешли в /app
COPY package.json ./  # перед поднятием контенера: копируем package.json в /app
COPY . .              # копируем все оcтальное в  /app
RUN npm install  # создасться папка node_modules в /app
EXPOSE 3000  # наружу торчит порт
CMD ["npm", "start"]  # запустится команда "npm start" для запуска dev cервера для реакта, сервер слушает 3000 порт


docker-compose.yaml:

version: "1.0"
services:
  mongodb: # нзв контейнера для БД mongo
    image: mongo
    restart: always # если мини вируталь машина(контенйер) падает то она сразу поднимается
    expose:  # пробрасывает порт из мини виртуальной машины(контенйер) на комп иначе не достуимся до содержимого контенера
      - 27017 
    environment: 
      MONGO_INITDB_ROOT_USERNAME: root # данные для подключения к бд
      MONGO_INITDB_ROOT_PASSWORD: qwerty123
      MONGO_INITDB_DATABASE: crm  # имя бд
    networks:
      - mern-app
    volumes: 
      - mongo-data:/data/db # монтируем в  /data/db останвилаьс на 1Ж13
  mongo-express: # # нзв контейнера для админки для mongo)
    image: mongo-express
    restart: always
    ports:
      - 8081:8081 # слева лок порт, справа порт внутри контенейра
    environment: 
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: qwerty123  
      ME_CONFIG_MONGODB_URL: mongodb://root:qwerty123@mongodb:27017/  # урл для подклюения к бд
    depends_on: 
      - mongodb  # если контенер mongo не поднялася, то mongo-express не нужен(тк коннектиться не к чему)
    networks: 
      - mern-app  
  client:  # нзв контейнера для приложения самого
    build: ./client
    environment:
      CHOKIDAR_USEPOLLING: "true" # чтоб синхронизировать папку в коттрой разарабатываем с папкой в контенере
    volumes:
      - ./client/src:/app/src # синхронизируем содержимоае папки ./client/src в папку /app/src контенера, чоб при изменении файлов в src, автоматом пересобиралось
    stdin_open: true
    tty: true
    command: npm start # запуск сервера
    ports:
      - "3000:3000"
    networks:
      - mern-app # клиент коннектиться к этой сети 
  server: # нзв контейнера для бэкенда
    build: ./server
    environment: 
      CHOKIDAR_USEPOLLING: "true"
    volumes:
      - ./server:/app  
    ports: 
      - "5000:5000"
    depends_on:
      - mongodb
    networks: 
      - mern-app  
networks: # для коннекта бд с бэкендом нужна сеть
  mern-app:
    driver: bridge
volumes: # том связанный с файловой системой хоста(компа на котром разрабатываем)
  mongo-data:
    driver: local



DockerFile у server:

FROM node:14-alpine
WORKDIR /app
COPY package.json ./
COPY . .
RUN npm install
RUN npm install -g nodemon # ставим глобально nodemon(чтоы можно было запустить командой nodemon), следит за файлами и в случае их изменений пересобираетпроект проект
EXPOSE 5000
CMD ["nodemon"]     


index.js:
// сервер написан на express // express  в качетсве веб сервера
const express = require('express');
const bodyParser = require('body-parser');
const cors = require ('cors');
const mongoose = require('mongoose'); // для работв с  доками котые лежат в  бд mongo

const mainRouter = require('./routes/api/main'); // подкючается роутер

const app = express(); // поднимаем сервер

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extentend: true }));
app.use(cors());

app.use('/api', mainRouter);

const connectionString = 'mongodb://mongodb:27017/crm'; // имя_протокала://нзв_контейнера:порт/имя_бд

mongoose
  .connect(connectionString, { useNewUrlParser: true })
  .catch(e => {
    console.error('Connection error', e.message)
  });


app.listen(5000) // порт на котром круттся бэкенд