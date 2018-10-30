class Background {
  constructor() {
    this.stars = [];
    this.intensity = [];

    for (var i=0;i < height*width/3600;i++) {
      this.stars.push(createVector(random(width),random(height)));
    }
    for (var i=0;i < 200;i++){
      this.intensity.push( (1+sin(TWO_PI*i/200))*100 );
    }
  }

  display() {
    background(0);
    for (var i=0;i<this.stars.length;i++) {
      stroke(this.intensity[(frameCount +i)%this.intensity.length]);
      point(this.stars[i].x,this.stars[i].y);
    }
  }
}
