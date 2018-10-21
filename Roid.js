class Roid extends PhysObject {
  constructor(pos) {
    super();
    this.pos=pos.copy();
    this.vel=p5.Vector.fromAngle(random(TWO_PI)).mult(5);
    this.size=30;
    this.dir=0;
    this.av=random(-0.05,0.05);

    this.roidShape = [];
    for (var i=0;i<10;i++) {
      var d = this.size*0.50;
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
      this.pos.add(n.mult(-this.size/(this.size+o.size)));
      // Bounce the balls
      var v2 = this.pos.copy().sub(o.pos).normalize(); // Impact normal
      // Deflect in direction of impact normal.
      this.vel = v2.setMag(this.vel.mag()+o.vel.mag()).mult(this.size/(this.size+o.size));
      // Flip angular rotation
      this.av=-this.av;

    }
  }
}
