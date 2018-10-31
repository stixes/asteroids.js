FROM php:7-alpine
MAINTAINER Jesper Mathiassen <jesper.mathiassen@gmail.com>

COPY highscore.db /srv/data/
COPY scripts/* /srv/scripts/
COPY highscore.php index.php robots.txt /srv/

VOLUME /srv/data
EXPOSE 80

CMD ["php","-S","0.0.0.0:80","-t","/srv"]
