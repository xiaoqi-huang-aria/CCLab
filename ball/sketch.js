let x, y;
let xSpeed, ySpeed;
function setup() {
  createCanvas(400, 400);
   x = 50
  y = 250
  xSpeed = random(-5,5)
  ySpeed = random(-5,5)
}

function draw() {
  background(0);
  x = x + xSpeed
  y = y + ySpeed
  if(x < 0 || x > width){xSpeed = xSpeed * -1}//bouncing
  if(y < 0 || y > height){ySpeed = ySpeed * -1}
 circle(x,y,50)
  
}