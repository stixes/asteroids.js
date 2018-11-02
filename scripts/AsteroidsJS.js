// TODO: (x=Done, /=in progress)
// [x] Player Ship
// [x] Asteroids
// [x] Bullets and impacts
// [x] Explosions
// [x] Scoreboard
// [x] Start screen / menu
// [x] Starry night backdrop
// [ ] Better page layout
// [x] Highscore list
// [x] Serverside highscore
// [ ] Blinking instructions on gamestart
// [ ] Improve highscore tamper security
// [ ] Score based on screen size (smaller screen = bonus)
// [ ] Bullethell graphics
//    [ ] Glowing particles
//    [ ] Engine exhaust
//    [ ] Impressive background
//    [ ] Sprite graphics ?
//    [ ] More explosions!


function setup() {
  createCanvas(windowWidth,windowHeight);
  noSmooth();
  bg = new Background();
  highscore = new Highscore(hs_endpoint);
  ship = new Ship();
  world = new Physics();
  startMenu();
  lockInput(2000);
  world.add(ship);

  world.add(new Roid());
  world.add(new Roid());
  world.add(new Roid());
  world.add(new Roid());
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  initials = random(letters) + random(letters) + random(letters);
}

function startMenu() {
  ship.die();
  menu = true;
  highscore.refresh();
  menuTime = millis();
}

function startGame() {
  level=0;
  score=0;
  menu=false;
  ship.spawn();
  ship.resetPos();
  world.reset();
  world.add(ship);
  nextLevel();
}

function nextLevel() {
  score += 250*level;
  level++;
  for (var i=0;i<level;i++) {
    world.add(new Roid());
  }
}

function gameOver() {
  lockInput(2000);
  highscore.update();
  startMenu();
}

function menuScreen() {
  push();
  translate(width/2,0);
  noStroke();
  fill(255);
  textFont("Arial");
  textAlign(CENTER);
  if (millis() < menuTime + 2500) {
    textSize(height/8);
    text("ASTEROIDS",0,height/2);
    textSize(height/32);
    text("Press SPACE to start",0,height/2+height/8);
  } else if (millis() < menuTime + 6000) {
    highscore.show();
  } else { menuTime = millis(); }
  pop();
}

function scoreBoard() {
  noStroke();
  fill(255);
  textFont("Arial");
  textSize(height/32);
  textAlign(LEFT);
  text("PLAYER: "+initials,0,height/32);
  text("LEVEL: "+level,0,2*height/32);
  text("SCORE: "+score,0,3*height/32);
}

function draw() {
  bg.display();
  world.update();
  world.display();
  scoreBoard();
  if (menu) menuScreen();
}
