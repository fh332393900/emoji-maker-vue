# FROM nginx:alpine

# COPY dist/ /usr/share/nginx/html/

# COPY nginx.conf /etc/nginx/conf.d/

FROM node:18-alpine

ENV NODE_ENV=production

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm ci --legacy-peer-deps --only=production && npm cache clean --force

RUN npm run build-only

EXPOSE 8082

CMD ["npm", "serve"]
