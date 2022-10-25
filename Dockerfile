FROM node:12 AS builder

# Environment

# # Set the working directory
WORKDIR /app

# Copy project specification and dependencies lock files
COPY . ./

RUN yarn install --network-timeout 900000
RUN yarn build

CMD yarn start

EXPOSE 3000