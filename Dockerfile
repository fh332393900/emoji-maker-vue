FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install --production --silent && mv node_modules ../

RUN npm run build

COPY . .

EXPOSE 8082

RUN chown -R node /usr/src/app

USER node

CMD ["npm", "serve"]
