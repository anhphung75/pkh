FROM nginx:1.17.8-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

ENV APP_HOME=/home/web
WORKDIR $APP_HOME
#RUN mkdir -p /home/web/ssl_cert
#RUN mkdir -p /home/web/static

EXPOSE 443 80

# run entrypoint.prod.sh
# ENTRYPOINT ["/home/app/web/entrypoint.prod.sh"]
# ENTRYPOINT ["nginx", "-g ","daemon off"]