class Bullet extends PhysObject {
  constructor(pos,vel,dir) {
    super();
    this.life = frameCount+100;
    this.pos=pos.copy();
    this.vel=p5.Vector.fromAngle(dir).mult(15.0).add(vel);
  }

  display() {
    var v = this.pos.copy().add(this.vel);
    stroke(255);
    line(this.pos.x,this.pos.y,v.x,v.y);
    if (frameCount > this.life) this.expire();
  }

  onCollision(o) {
    if (o instanceof Roid) {
      this.expire()
      explodeAt(this.pos.x,this.pos.y,this.size);
      // world.add(new Explosion(this.pos));
    }
  }
}
