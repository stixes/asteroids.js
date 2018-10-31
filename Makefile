IMAGE_NAME=asteroids-dev
HS_URL=http://192.168.99.100:8080/highscore.php

all: build test

build:
	docker build . -t ${IMAGE_NAME}
	docker image ls ${IMAGE_NAME}

test:
	docker run --rm ${IMAGE_NAME} ls -lR /srv

run: build
	winpty docker run --rm -it -p 8080:80 -e HS_URL=${HS_URL} --name ast-dev ${IMAGE_NAME}

start: build test
	docker run --rm -d -p 8080:80 --name ast-dev ${IMAGE_NAME}

logs:
	docker logs -f ast-dev

stop:
	docker kill ast-dev

shell:
	winpty docker run --rm -it ${IMAGE_NAME} /bin/sh

.PHONY: all build test start stop run logs shell
