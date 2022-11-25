function setup() {
    createCanvas(600, 600);
    background(255);
    let space = 30;
    for (let x1 = 0; x1 <= width; x1 += space) {
    for (let y1 = 0; y1 <= height; y1 += space) {
    noStroke()
    fill(random(255), random(255), random(255), random(100))
    rect(x1, y1, space + random(50), space + random(50))}
  for (let dia = space * 2; dia <= 800; dia += space * 2) {
      let start = QUARTER_PI * random(8);
      let end = QUARTER_PI * random(8);
      strokeWeight(random(2))
      stroke(random(255),random(255),random(255),random(30))
      noFill()
      arc(width/2, height / 2, dia, dia, start, end, PIE)}
    push()
    translate(width/2,height/2)
    for(var i = 1;i <= 10;i += 0.5){ 
    rotate(PI / i)
    noStroke()
    fill(176,224,230,random(10))//blue
    //fill(189,252,201,random(10))//green
    //fill(106,90,205,random(5))//purple
    beginShape();
    vertex(-300, 0);
    vertex(-100,-100);
    vertex(0, -300);
    vertex(100,-100);
    vertex(300, 0);
    vertex(100,100);
    vertex(0, 300);
    vertex(-100,100);
    endShape();}
    pop()
   }
}