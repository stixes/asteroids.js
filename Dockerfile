FROM node:alpine
MAINTAINER Jesper Mathiassen <jesper.mathiassen@gmail.com>

RUN npm install -g http-server
EXPOSE 8080

COPY index.html /srv/public/
COPY scripts/*.js /srv/public/scripts/

USER nobody
CMD ["/usr/local/bin/http-server","/srv/public","-r"]
