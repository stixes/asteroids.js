var inputLockedTimeout=0;
function lockInput(duration) {
  inputLockedTimeout = millis() + duration;
}

function mousePressed() {
  if (mouseY < height/32 && mouseX<11*height/32) {
    initials=prompt("Player initials ? (3 letter max)").substr(0,3).toUpperCase();
  }
}

function keyPressed() {
  if (inputLockedTimeout > millis()) return;
  if (menu) {
    startGame();
  } else {
    if (key == ' ') {
      ship.shoot();
    } else switch (keyCode) {
      case RIGHT_ARROW:
        ship.setTurn(0.1);
        break;
      case LEFT_ARROW:
        ship.setTurn(-0.1);
        break;
      case UP_ARROW:
        ship.setThrust(0.3);
        break;
    }
  }
}

function keyReleased() {
  if (inputLockedTimeout > millis()) return;
  if (!menu) {
    switch (keyCode) {
      case RIGHT_ARROW:
      case LEFT_ARROW:
        ship.setTurn(0);
        break;
      case UP_ARROW:
        ship.setThrust(0);
        break;
    }
  }
}
