function explodeAt(x,y,size=15,count=1) {
  for (var i=0; i < count; i++) {
    world.add(new Explosion(p5.Vector.fromAngle(random(TWO_PI)).mult(size).add(createVector(x,y)),random(10,180)));
  }
}

class Explosion extends PhysObject {

  constructor(pos,life) {
    super();
    this.life = life?life:50;
    this.r = random(5,10);
    this.p = random(10,20);
    this.frame = frameCount;
    this.pos = pos.copy();
    this.ao = TWO_PI/this.p;
    this.as = random(TWO_PI);
  }

  display() {
    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.as);
    stroke(255);
    var s1 = (frameCount-this.frame)*this.r;
    var s2 = s1 - this.r;
    for (var i=0;i<this.p;i++) {
      rotate(this.ao);
      line(0,s1,0,s2);
    }
    pop();
    if (frameCount-this.frame > this.life) this.expire();
  }

}
