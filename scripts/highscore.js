class Highscore {
  constructor(endpoint) {
    this.list = []
    this.endpoint = endpoint
    this.refresh();
  }

  refresh() {
    var request = new XMLHttpRequest();
    request.open('GET', this.endpoint+"/highscore.php", true);
    request.parent = this;
    request.onload = function() {
      this.parent.list = JSON.parse(this.response);
      // console.log(this.response)}
    }
    request.send();
  }

  update() {
    var request = new XMLHttpRequest();
    request.open('POST',this.endpoint+"/highscore.php",true);
    var params='name='+initials+'&score='+score;
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // request.onload = function() { console.log(this.response); }
    request.send(params);
    this.refresh();
  }

  show() {
    textSize(height/16);
    text("ASTEROIDS",0,height/8);
    textSize(height/32);
    for (var i=0;i<this.list.length;i++) {
      var y=height/4 + i*(1.2*height/32);
      textAlign(RIGHT);
      text(this.list[i][0],-10,y);
      textAlign(LEFT);
      text(this.list[i][1],10,y);
    }
  }

}
