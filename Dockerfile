# build stage
# pull official base image
FROM node:12 AS builder
ENV NODE_ENV production

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

COPY . ./

RUN npm install
RUN npm build

# add app

EXPOSE 3000
# start app
CMD ["npm", "start"]

# nginx state for serving content
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY ./.nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
