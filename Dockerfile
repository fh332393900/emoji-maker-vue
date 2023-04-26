# FROM nginx:alpine

# COPY dist/ /usr/share/nginx/html/

# COPY nginx.conf /etc/nginx/conf.d/

FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

RUN npm install --production

RUN npm build

EXPOSE 8082

CMD ["npm", "serve"]
