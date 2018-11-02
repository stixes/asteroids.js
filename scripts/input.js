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
  world.handleKeyPressed();
  if (menu && key==' ')
    startGame();
}

function keyReleased() {
  if (inputLockedTimeout > millis()) return;
  world.handleKeyReleased();
}
