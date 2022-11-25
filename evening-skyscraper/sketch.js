function setup() {
    createCanvas(600, 400);
  }
  
  function draw() {
    background(201, 192, 211);
    noStroke();
    fill(122, 114, 129);
    rect(0, 200, 600, 400);
    noStroke();
    fill(101, 101, 101);
    beginShape();
    vertex(600, 223);
    vertex(361, 280);
    vertex(99, 400);
    vertex(600, 400);
    endShape();
    fill(211, 211, 211);
    rect(30, 250, 50, 150);
    fill(199, 184, 161);
    rect(150, 225, 45, 175);
    fill(147, 147, 145);
    rect(125, 275, 60, 125);
    fill(150, 164, 139);
    rect(250, 175, 70, 225);
    fill(224, 229, 223);
    triangle(250, 175, 285, 100, 320, 175);
    fill(134, 150, 167);
    rect(400, 180, 100, 220);
    fill(156, 168, 184);
    rect(420, 150, 60, 30);
    fill(193, 203, 215);
    rect(440, 120, 20, 30);
    fill(165, 108, 65);
    rect(230, 350, 120, 50);
    fill(95, 82, 74);
    rect(380, 370, 150, 30);
    fill(95, 82, 74);
    triangle(380, 370, 530, 370, 530, 330);
  
    stroke(0);
    strokeWeight(1);
    line(450, 120, 450, 100);
  }
  