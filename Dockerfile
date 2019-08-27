FROM nginx
WORKDIR '/app'
COPY ./dist/dockerize-angular ./dist/dockerize-angular
EXPOSE 80
COPY /dist/dockerize-angular /usr/share/nginx/html