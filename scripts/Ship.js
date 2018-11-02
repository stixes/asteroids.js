var ShipStates = { ALIVE: 1, DEAD: 2}

class Ship extends PhysObject {
  constructor() {
    super();
    this.state = ShipStates.ALIVE;
    this.size = 15;
    this.resetPos();
  }

  resetPos() {
    this.pos.x = width/2;this.pos.y=height/2;
    this.vel.x = 0;this.vel.y=0;
    this.dir = -HALF_PI;
    this.av = 0;
    this.thrust=0;
  }

  display() {
    if (this.state==ShipStates.DEAD) return;
    push();
    stroke(255);
    fill(0);
    translate(this.pos.x,this.pos.y);
    rotate(this.dir);
    beginShape();
    vertex(this.size*1.5,0);
    vertex(-this.size,-this.size);
    vertex(0,0);
    vertex(-this.size,this.size);
    endShape(CLOSE);
    pop()
  }

  update() {
    super.update();
    this.vel.mult(0.99);
    this.dir += this.av;
    this.vel.add(p5.Vector.fromAngle(this.dir).mult(this.thrust));
  }

  setTurn(a) { this.av = a; }
  setThrust(t) { this.thrust = t; }
  shoot() {
    if (this.state==ShipStates.DEAD) return;
    var bulletPos = p5.Vector.fromAngle(this.dir).mult(this.size).add(this.pos);
    world.add(new Bullet(bulletPos,this.vel,this.dir));
  }

  hit() {
    explodeAt(this.pos.x,this.pos.y,this.size,8);
    this.die();
    gameOver();
  }

  die() {
    this.state=ShipStates.DEAD;
    this.resetPos();
  }

  spawn() {
    this.state=ShipStates.ALIVE;
    this.resetPos();
  }

  onCollision(o) {
    if (this.state==ShipStates.DEAD) return;
    if (o instanceof Roid) {
      this.hit();
    }
  }

}
