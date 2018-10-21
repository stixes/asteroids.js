class Bullet extends PhysObject {
  constructor(pos,vel,dir) {
    super();
    this.life = frameCount+100;
    this.pos=pos.copy();
    this.vel=p5.Vector.fromAngle(dir).mult(10.0).add(vel);
  }

  display() {
    var v = this.pos.copy().add(this.vel);
    line(this.pos.x,this.pos.y,v.x,v.y);
    if (frameCount > this.life) this.expire();
  }

  onCollision(o) {
    if (o instanceof Roid) {
      this.expire()
      world.add(new Explosion(this.pos));
    }
  }
}
