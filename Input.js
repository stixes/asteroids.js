var inputLockedTimeout=0;
function lockInput(duration) {
  inputLockedTimeout = millis() + duration;
}

function keyPressed() {
  console.log(keyCode);
  if (keyCode == 33) {
    startGame();
    score = 550;
    gameOver();
  }
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
