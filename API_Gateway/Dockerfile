FROM node:16.13.2
WORKDIR /API_Gateway
COPY package.json .
RUN npm install
COPY . .
CMD npm start
EXPOSE 3333
