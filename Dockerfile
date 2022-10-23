FROM node:latest

WORKDIR /frontend

COPY ./package.json /frontend

RUN npm install

COPY . .

# build the folder
CMD [ "npm", "run", "start" ]

