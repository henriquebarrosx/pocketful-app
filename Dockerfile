FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci && \
  npm i --global @angular/cli@14

COPY . .

RUN npm run build -- --configuration production

FROM nginx:1.21-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/pocketful-app /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]