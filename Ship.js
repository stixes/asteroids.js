class Ship extends PhysObject {
  constructor() {
    super();

    this.resetPos();
    this.hidden=false;
  }

  resetPos() {
    this.pos.x = width/2;this.pos.y=height/2;
    this.vel.x = 0;this.vel.y=0;
    this.dir = -HALF_PI;
    this.av = 0;
    this.thrust=0;
  }

  display() {
    // console.log(this.hidden);
    if (this.hidden) return;
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

  hide() { this.hidden=true; }
  show() { this.hidden=false; }

  die() {
    this.hide();
    this.resetPos();
    for (var i=0;i<5;i++) {
      world.add(new Explosion(p5.Vector.fromAngle(this.dir).mult(this.size).add(this.pos),random(10,180)));
    }
    startMenu();
  }

  onCollision(o) {
    if (!this.hidden) {
      if (o instanceof Roid) {
        this.die()
      }
    }
  }

}
