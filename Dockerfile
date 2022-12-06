FROM node:12-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY . ./

COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm build

EXPOSE 3000

CMD ["npm", "start"]
