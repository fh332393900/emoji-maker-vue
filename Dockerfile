# FROM nginx:alpine

# COPY dist/ /usr/share/nginx/html/

# COPY nginx.conf /etc/nginx/conf.d/

FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm install -g npm@9.6.5

RUN npm ci --legacy-peer-deps --only=production && npm cache clean --force

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build-only

EXPOSE 8082

CMD ["npm", "serve"]
