class PhysObject {
  constructor() {
    this.pos = createVector();
    this.vel = createVector();
    this.size=0;
    this.expired=false;
  }
  expire() { this.expired=true;}
  update() {
    this.pos.add(this.vel);
    if (this.pos.x > width+this.size) this.pos.x-=width+2*this.size;
    if (this.pos.x < -this.size) this.pos.x+=width+2*this.size;
    if (this.pos.y > height+this.size) this.pos.y-=height+2*this.size;
    if (this.pos.y < -this.size) this.pos.y+=height+2*this.size;
  }

  display() {}
}


class Physics {
  constructor() { this.parts = [] }
  add(o) { this.parts.push(o) }
  reset() { this.parts = [] }
  display() { this.parts.forEach((p) => { p.display(); })}
  update() {
    this.parts.forEach((p) => { p.update(); })
    for (var i=0;i<this.parts.length-1;i++) {
      for (var t=i+1;t<this.parts.length;t++) {
        var a = this.parts[i];
        var b = this.parts[t];
        var overlap = p5.Vector.dist(a.pos,b.pos)-(a.size+b.size);
        if (overlap < 0) {
          // trigger calbacks
          a.onCollision(b);
          b.onCollision(a);
        }
      }
    }
  }
}
