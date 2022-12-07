# build stage
FROM node:16-alpine as build-stage
WORKDIR /app
COPY . .
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm build
## các bạn có thể dùng yarn install .... tuỳ nhu cầu nhé
# add app
COPY . ./

# production stage
FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

