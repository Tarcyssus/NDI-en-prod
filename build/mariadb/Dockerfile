FROM mariadb:10.11

# Définit un volume pour la persistance des données
VOLUME /var/lib/mysql

# Configure le jeu de caractères par défaut
ENV MYSQL_CHARSET=utf8mb4
ENV MYSQL_COLLATION=utf8mb4_unicode_ci

# Expose le port MariaDB
EXPOSE 3306

RUN touch /var/log/mysql.log
RUN chown mysql:mysql /var/log/mysql.log
COPY conf/myconf.cnf /etc/mysql/conf.d/