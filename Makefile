IMAGE_NAME=asteroids-dev

all: build test

build:
	docker build . -t ${IMAGE_NAME}
	docker image ls ${IMAGE_NAME}

test:
	docker run --rm ${IMAGE_NAME} ls -lR /srv

run: build
	winpty docker run --rm -it -p 8080:8080 --name ast-dev ${IMAGE_NAME}

start: build test
	docker run --rm -d -p 8080:8080 --name ast-dev ${IMAGE_NAME}

logs:
	docker logs -f ast-dev

stop:
	docker kill ast-dev

npm:
	docker run --rm -v /c/projects/AsteroidsJS:/work -w /work node pwd

.PHONY: all build test start stop run logs npm
