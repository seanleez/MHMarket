# build stage
FROM node:16-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
FROM nginx
COPY ./default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]

