FROM node:alpine

# set working directory
WORKDIR /frontend

COPY ./package.json /frontend

# install app dependencies
RUN npm install


# add app
COPY . .

EXPOSE 3000

# start app
CMD [ "npm", "run", "start" ]

