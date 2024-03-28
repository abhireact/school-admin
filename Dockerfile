FROM node:18.17.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps


COPY . .

RUN npm run build 

EXPOSE 3000

CMD ["npm","start"]