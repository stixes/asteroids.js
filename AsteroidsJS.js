// TODO: (x=Done, /=in progress)
// [x] Player Ship
// [/] Asteroids
// [ ] Bullets and impacts
// [ ] Explosions
// [/] Scoreboard
// [ ] Start screen / menu
// [ ] Starry night backdrop

var ship;
var world;
var level;
var score;

function setup() {
  createCanvas(windowWidth,windowHeight);
  noSmooth();
  ship = new Ship();
  world = new Physics();
  startGame();
  world.add(ship);
  world.add(new Roid(createVector(random(width),random(height))));
  world.add(new Roid(createVector(random(width),random(height))));
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
  background(0);
  world.update();
  world.display();
  scoreBoard();
}
