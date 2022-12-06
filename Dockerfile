# build stage
FROM node:12 AS builder
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build
EXPOSE 3000