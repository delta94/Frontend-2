FROM nginx:1.15.2-alpine
WORKDIR /var/www
COPY ./target/classes/static/ /var/www/
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]