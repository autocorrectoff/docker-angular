FROM node:alpine:12.8.1 as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
RUN npm install -g @angular/cli@8.2.2
COPY . .
RUN ng build --prod

FROM nginx
EXPOSE 80
COPY --from=builder /app/dist/dockerize-angular /usr/share/nginx/html