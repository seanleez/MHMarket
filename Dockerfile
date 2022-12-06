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

FROM nginx:alpine
    # Copy config nginx
COPY ./.nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
    # Remove default nginx static assets
RUN rm -rf ./*
    # Copy static assets from builder stage
COPY --from=build /app/build .
    # Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]

