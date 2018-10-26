FROM node:alpine
MAINTAINER Jesper Mathiassen <jesper.mathiassen@gmail.com>

RUN npm install -g http-server
EXPOSE 8080

COPY *.js index.html /srv/

USER nobody
CMD ["/usr/local/bin/http-server","/srv","-r"]
