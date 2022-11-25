let dancer;

function setup() {
  createCanvas(windowWidth, windowHeight);
  dancer = new AriaDancer(width/2, height/2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only
  dancer.update();
  dancer.display();
}
class AriaDancer{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.scale = random(0.7,1.2)
    this.xSpd = random(-2,2)
    this.ySpd = random(-2,2)
    
  }  
  update(){
    this.rotate1 = sin(frameCount / 10) * 20;
    this.rotate2 = cos(frameCount / 10) * 20;
    this.x += this.xSpd
    this.y += this.ySpd
    if(this.x<width/2 - 50 || this.x>width/2 + 50){
      this.xSpd = this.xSpd * -1
    }
    if(this.y<height/2 - 50 || this.y>height/2 + 50){
      this.ySpd = this.ySpd * -1
    }
    if (mouseIsPressed === true) {
      this.xSpd = 0
      this.ySpd = 0
    }
    
  }
  display(){
    push();
    translate(this.x, this.y);
     //right wing
    push()
    scale(this.scale)
    rotate(radians(this.rotate1))
    noStroke()
    fill(100,149,237)
    ellipse(55,0,60,30)
    pop()
    //left wing
    push()
    scale(this.scale)
    rotate(radians(this.rotate2))
    noStroke()
    fill(100,149,237)
    ellipse(-55,0,60,30)
    pop()
    //body
    push()
    scale(this.scale)
    noStroke()
    fill(100,149,237)
    ellipse(0,0,110,120)
    fill(255)
    ellipse(0,15,80,90)
    fill(0)
    ellipse(-20,-40,10,20)
    ellipse(20,-40,10,20)
    fill(255)
    ellipse(-20,-45,5,5)
    ellipse(20,-45,5,5)
    fill(255,165,0)
    beginShape()
    curveVertex(0,-35)
    curveVertex(0,-35)
    curveVertex(-15,-25)
    curveVertex(0,-10)
    curveVertex(15,-25)
    curveVertex(0,-35)
    curveVertex(0,-35)
    endShape()
    pop()
    //left foot
    push()
    scale(this.scale)
    rotate(radians(this.rotate1/2))
    noStroke()    
    fill(255,165,0)
    ellipse(-30,55,40,20)
    pop()
    //right foot
    push()
    scale(this.scale)
    rotate(radians(this.rotate2/2))
    noStroke()
    fill(255,165,0)
    ellipse(30,55,40,20)
    pop()
    pop();
  }  
  drawReferenceShapes(){
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);                       
    rect(-100, -100, 200, 200);    
    fill(255);
    stroke(0);
  }
  
  
}



