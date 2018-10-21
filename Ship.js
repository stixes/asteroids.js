class Ship extends PhysObject {
  constructor() {
    super();

    this.pos.x = width/2;this.pos.y=height/2;
    this.dir = -HALF_PI;
    this.av = 0;
    this.thrust=0;
  }

  display() {
    var s = 15;
    stroke(255);
    noFill();
    push();s
    translate(this.pos.x,this.pos.y);
    rotate(this.dir);
    triangle(-s,s,-s,-s,s,0);
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
    world.add(new Bullet(this.pos.add(p5.Vector.fromAngle(this.dir).mult(this.size)),this.vel,this.dir));
  }

  onCollision(o) {
    if (o instanceof Roid) {
      console.log("Player hit by rock!");
    }

  }

}
