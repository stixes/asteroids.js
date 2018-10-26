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

function setup() {
  createCanvas(windowWidth,windowHeight);
  noSmooth();
  bg = new Background();
  ship = new Ship();
  world = new Physics();
  startGame();
  world.add(ship);
  world.add(new Roid());
}

function nextLevel() {
  score += 250*level;
  level++;
  for (var i=0;i<level;i++) {
    world.add(new Roid());
  }
}

function startGame() {
  level=1;
  score=0;
  world.reset();
}

function scoreBoard() {
  // textFont(createFont("Arial",height/32,false));
  textAlign(LEFT);
  text("LEVEL: "+level,0,height/32);
  text("SCORE: "+score,0,2*height/32);
}

function draw() {
  bg.display();
  world.update();
  world.display();
  scoreBoard();
}
