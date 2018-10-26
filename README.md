# Asteroids in a box!

[![Docker Automated build](https://img.shields.io/docker/automated/stixes/asteroids.js.svg)](https://hub.docker.com/r/stixes/asteroids.js/)
[![Docker build status](https://img.shields.io/docker/build/stixes/asteroids.js.svg)](https://hub.docker.com/r/stixes/asteroids.js/)
[![Docker Pulls](https://img.shields.io/docker/pulls/stixes/asteroids.js.svg)](https://hub.docker.com/r/stixes/asteroids.js/)
[![Docker stars](https://img.shields.io/docker/stars/stixes/asteroids.js.svg)](https://hub.docker.com/r/stixes/asteroids.js)

This is a Processing ([https://p5js.org/](https://p5js.org/)) project, implementing a fine little standalone version of the classic [Asteroids](https://en.wikipedia.org/wiki/Asteroids_(video_game)) game.

## Running

Clone the git repo, and access the index.html file with your browser.

OR

Run using the docker image:

    docker run -d -p 8080:8080 stixes/asteroids

and access it through your browser on http://localhost:8080. (Localhost may be another host/ip, depending on your setup).

Look to Google for more information on [Docker](https://docker.org).

## Progress

The ambition is to mimic the original game as well as possible, using all the bells and whistles of a modern platform.

Still todo is:

  * Different speeds for rocks
  * Large ufo
  * Small ufo
  * Hyperspace button
  * Serverside (node.js) highscore list

Fork my repo and drop me a pull-request if you wish to help out :)
