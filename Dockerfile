# build stage
# pull official base image
FROM node:12 AS builder

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm build

# add app
COPY . ./

EXPOSE 3000
# start app
CMD ["npm", "start"]
