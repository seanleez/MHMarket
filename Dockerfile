# build stage
FROM node:16-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.17-alpine as production-stage

RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/conf.d/default.conf
COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
