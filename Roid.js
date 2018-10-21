class Roid extends PhysObject {
  constructor(pos,size) {
    super();
    this.pos=pos.copy();
    this.vel=p5.Vector.fromAngle(random(TWO_PI)).mult(random(2,7));
    this.size=size?size:30;
    this.dir=0;
    this.av=random(-0.05,0.05);

    this.roidShape = [];
    for (var i=0;i<10;i++) {
      var d = this.size*0.30;
      d = random(this.size-d,this.size+d);
      this.roidShape.push([d*cos(i*TWO_PI/10),d*sin(i*TWO_PI/10)]);
    }
  }

  display() {
    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.dir);
    stroke(255);
    beginShape();
    noFill();
    stroke(255);
    this.roidShape.forEach((x)=>{
      vertex(x[0],x[1]);
    });
    endShape(CLOSE);
    pop();
  }

  update() {
    super.update();
    this.dir+=this.av;
  }

  onCollision(o) {
    if (o instanceof Roid) {
      // reset to collision edge, wrt. obj sizes.
      var overlap = p5.Vector.dist(this.pos,o.pos)-(this.size+o.size);
      var n = p5.Vector.sub(this.pos,o.pos).setMag(overlap);
      // this.pos.add(n.mult(this.size/(this.size+o.size)));
      this.pos.sub(n);
      // Bounce the balls
      var v2 = this.pos.copy().sub(o.pos).normalize(); // Impact normal
      // Deflect in direction of impact normal.
      this.vel = v2.setMag((this.vel.mag()+o.vel.mag())*o.size/(this.size+o.size));
      // Flip angular rotation
      this.av=-this.av;
    }
    if (o instanceof Bullet) {
      this.expire();
      if (this.size > 15) {
        // world.add(new Roid(createVector(random(width),random(height)),this.size-10));
        // world.add(new Roid(p5.Vector.random2D().mult(size).add(this.pos),this.size-10));
        world.add(new Roid(this.pos.copy().add(p5.Vector.random2D().setMag(size*2)),this.size-10));
        world.add(new Roid(this.pos.copy().add(p5.Vector.random2D().setMag(size*2)),this.size-10));
        // world.add(new Roid(this.pos.copy().add(p5.Vector.random2D().setMag(size)),this.size-10));
        // world.add(new Roid(p5.Vector.random2D().mult(size).add(this.pos),this.size-10));
        // world.add(new Roid(p5.Vector.random2D().mult(size)),this.size-10));
        // world.add(new Roid(p5.Vector.random2D().mult(size)),this.size-10));
      }
    }
  }
}
