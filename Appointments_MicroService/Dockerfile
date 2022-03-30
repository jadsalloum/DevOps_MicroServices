FROM node:16.13.2
WORKDIR /Appointments_MicroService
COPY package.json .
RUN npm install
COPY . .
CMD npm start
EXPOSE 3003
