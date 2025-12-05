FROM php:8.2.0-fpm-alpine

USER root
ENV APP_ENV=dev
WORKDIR /app/sfapi

COPY sfapi /app/sfapi

COPY --from=composer:2.9.2 /usr/bin/composer /usr/bin/composer

# Installation des extensions PHP
RUN apk add --no-cache \
        icu-dev \
        libzip-dev \
    && apk add --no-cache --virtual .build-deps \
        $PHPIZE_DEPS \
    && docker-php-ext-install -j$(nproc) \
        intl \
        pdo_mysql \
        zip \
    && pecl install apcu \
    && docker-php-ext-enable apcu \
    && apk del .build-deps \
    && rm -rf /tmp/pear /var/cache/apk/*


# Installation des dépendances Composer
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-scripts \
    --prefer-dist \
    --no-interaction \
    --no-progress \
    && composer clear-cache

# Post-install : autoload optimisé
RUN composer dump-autoload --optimize --classmap-authoritative && \
    if [ ! -f "bin/phpunit" ]; then \
        composer require --dev symfony/phpunit-bridge; \
    fi

COPY sfapi /app/sfapi

# Arguments defined in compose.yml
ARG USER_NAME
ARG USER_ID
ARG GROUP_NAME
ARG GROUP_ID

# Create system user to run Composer and PHP Commands
RUN if [ ! -z ${USER_NAME} ] && [ ! -z ${GROUP_NAME} ] && [ ${USER_ID:-0} -ne 0 ] && [ ${GROUP_ID:-0} -ne 0 ] ; then \
    useradd -G www-data,root -u $USER_ID -d /home/$USER_NAME $USER_NAME && \
    mkdir -p /home/$USER_NAME/.composer  && \
    chown -Rf ${USER_NAME}:${GROUP_NAME} /home/$USER_NAME  && \
    chown -R ${USER_NAME}:${GROUP_NAME} /app \
    ; fi

# Login to container as non-root user
USER ${USER_ID:-0}:${GROUP_ID:-0}

EXPOSE 9000

CMD ["php-fpm"]
