FROM node:alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
RUN npm install -g @angular/cli@8.2.2
EXPOSE 4200
COPY . .
RUN ng build --prod

FROM nginx
COPY --from=builder /app/dist/dockerize-angular /usr/share/nginx/html