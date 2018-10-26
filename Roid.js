class Roid extends PhysObject {
  constructor(pos,size) {
    super();
    if (pos) {
      this.pos=pos.copy();
    } else {
      if (random(1)< 0.5) {
        this.pos = createVector(0,random(height));
      } else {
        this.pos = createVector(random(height),0);
      }
    }
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
      var overlap = this.size+o.size-p5.Vector.dist(this.pos,o.pos);
      var n = p5.Vector.sub(this.pos,o.pos).setMag(overlap);
      // this.pos.add(n.mult(this.size/(this.size+o.size)));
      this.pos.add(n);
      o.pos.sub(n);
      // Bounce the balls
      var v2 = this.pos.copy().sub(o.pos).normalize(); // Impact normal
      // Deflect in direction of impact normal.
      this.vel = v2.setMag((this.vel.mag()+o.vel.mag())*o.size/(this.size+o.size));
      // Flip angular rotation
      this.av=-this.av;
    }
    if (o instanceof Bullet) {
      this.expire();
      score+=40-this.size;
      if (this.size > 15) {
        var b = 3;
        for (var i=0;i<b;i++){
          world.add(new Roid(p5.Vector.fromAngle(map(i,0,b,0,TWO_PI)).setMag(this.size).add(this.pos),this.size-10));
        }
      }
      var rocks=0;
      world.parts.forEach((o)=>{
        rocks += (int)(o instanceof Roid);
      });
      if (rocks == 1) nextLevel();
    }
  }
}
