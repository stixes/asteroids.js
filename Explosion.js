class Explosion extends PhysObject {

  constructor(pos,life) {
    super();
    this.life = life?life:50;
    this.r = random(5,10);
    this.p = random(10,20);
    this.frame = frameCount;
    this.pos = pos.copy();
  }

  display() {
    push();
    translate(this.pos.x,this.pos.y);
    var ao=TWO_PI/this.p;
    var s1 = (frameCount-this.frame)*this.r;
    var s2 = s1 - this.r;
    for (var i=0;i<this.p;i++) {
      rotate(ao);
      line(0,s1,0,s2);
    }
    pop();
    if (frameCount-this.frame > this.life) this.expire();
  }

}
