function keyPressed() {
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
