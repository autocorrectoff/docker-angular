FROM node:12.8.1-alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .

FROM nginx
EXPOSE 80
COPY --from=builder /app/dist/dockerize-angular /usr/share/nginx/html