// TODO: (x=Done, /=in progress)
// [x] Player Ship
// [x] Asteroids
// [x] Bullets and impacts
// [x] Explosions
// [/] Scoreboard
// [ ] Start screen / menu
// [x] Starry night backdrop

var ship;
var world;
var bg;
var level;
var score;
var menu = true;

function setup() {
  createCanvas(windowWidth,windowHeight);
  noSmooth();
  bg = new Background();
  ship = new Ship();
  world = new Physics();
  startGame();
  startMenu();
  world.add(ship);
  world.add(new Roid());
  world.add(new Roid());
  world.add(new Roid());
  world.add(new Roid());
}

function startMenu() {
  ship.hide();
  menu = true;
}

function nextLevel() {
  score += 250*level;
  level++;
  for (var i=0;i<level;i++) {
    world.add(new Roid());
  }
}

function startGame() {
  level=0;
  score=0;
  menu=false;
  ship.show();
  ship.resetPos();
  world.reset();
  world.add(ship);
  nextLevel();
}

function menuScreen() {
  noStroke();
  fill(255);
  textFont("Arial");
  textSize(height/8);
  textAlign(CENTER);
  text("ASTEROIDS",width/2,height/2);
  textSize(height/32);
  text("Press SPACE to start",width/2,height/2+height/8);
}

function scoreBoard() {
  noStroke();
  fill(255);
  textFont("Arial");
  textSize(height/32);
  textAlign(LEFT);
  text("LEVEL: "+level,0,height/32);
  text("SCORE: "+score,0,2*height/32);
}

function draw() {
  bg.display();
  world.update();
  world.display();
  scoreBoard();
  if (menu) menuScreen();
}
