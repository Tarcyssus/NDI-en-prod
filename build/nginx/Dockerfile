FROM nginx:stable

COPY sfapi.conf /etc/nginx/templates/default.conf.template

ENV PHP_FPM_HOST=php
ENV PHP_FPM_PORT=9000

CMD ["sh", "-c", "envsubst '${PHP_FPM_HOST} ${PHP_FPM_PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]