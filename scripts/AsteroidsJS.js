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
  ship = new Ship();
  world = new Physics();
  startGame();
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
  ship.hide();
  menu = true;
  fetchHighscore();
  menuTime = millis();
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

function nextLevel() {
  score += 250*level;
  level++;
  for (var i=0;i<level;i++) {
    world.add(new Roid());
  }
}

function gameOver() {
  ship.die()
  lockInput(2000);
  updateHighscore();
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
    textSize(height/16);
    text("ASTEROIDS",0,height/8);
    textSize(height/32);
    for (var i=0;i<highscore.length;i++) {
      var y=height/4 + i*(1.2*height/32);
      textAlign(RIGHT);
      text(highscore[i][0],-10,y);
      textAlign(LEFT);
      text(highscore[i][1],10,y);
    }
  } else { menuTime = millis(); }
  pop();
}


function fetchHighscore() {
  var request = new XMLHttpRequest();
  request.open('GET', hs_endpoint+"/highscore.php", true);
  request.onload = function() { highscore = JSON.parse(this.response); }
  request.send();
}

function updateHighscore() {
  var request = new XMLHttpRequest();
  request.open('POST',hs_endpoint+"/highscore.php",true);
  var params='name='+initials+'&score='+score;
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.onload = function() { console.log(this.response); }
  request.send(params);
  fetchHighscore();
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
