FROM node:18.17.1-alpine

WORKDIR /myapp

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 6000

CMD ["npm", "start"]

