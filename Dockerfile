FROM node:20.11-alpine as build

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

FROM node:20.11-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app /usr/src/app

CMD ["npm", "run", "start:app"]