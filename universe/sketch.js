let angle = 0;
let angleV = 0;
let x6, y6;
let x6Speed, y6Speed;
function setup() {
  createCanvas(600, 600);
  x6 = 50;
  y6 = 50;
  x6Speed = random(-1, 1);
  y6Speed = random(-1, 1);
}

function draw() {
  background(32, 42, 71);
  noStroke();
  fill(0, 47, 167);
  angle = angle + angleV;
  angleV = angleV + 0.00003;
  let r = map(sin(angle), -1, 1, 30, width / 10);
  circle(width / 2, height / 2, r);

  let freq = frameCount * 0.01;
  let amp = 100;
  let sinValue = sin(freq) * amp;
  let cosValue = cos(freq) * amp;
  let tanValue = tan(freq) * amp;
  stroke(255);
  noFill();
  ellipse(width / 2, height / 2, 200, 200); //orbit1
  stroke(255);
  noFill();
  ellipse(width / 2, height / 2, 400, 100); //orbit2
  stroke(255);
  noFill();
  ellipse(width / 2, height / 2, 100, 400); //orbit3
  let x1 = width / 2 + cosValue;
  let y1 = height / 2 + sinValue;
  noStroke();
  fill(255, 246, 143);
  ellipse(x1, y1, 30, 30); //planet1

  let x2 = width / 2 + cosValue * 2;
  let y2 = height / 2 + sinValue / 2;
  noStroke();
  fill(146, 168, 209);
  ellipse(x2, y2, 30, 30); //planet2

  let x3 = width / 2 + cosValue / 2;
  let y3 = height / 2 + sinValue * 2;
  noStroke();
  fill(66, 167, 158);
  ellipse(x3, y3, 30, 30); //planet3
  let x4 = width / 2 + tanValue / 2;
  let y4 = height / 2 + tanValue;
  noStroke();
  fill(132, 110, 222);
  ellipse(x4, y4, 30, 30);
  let x5 = width / 2 - tanValue;
  let y5 = height / 2 - tanValue / 2;
  noStroke();
  fill(132, 110, 222);
  ellipse(x5, y5, 30, 30);

  x6 = x6 + x6Speed;
  y6 = y6 + y6Speed;
  if (x6 < 0 || x6 > width) {
    x6Speed = x6Speed * -1;
  }
  if (y6 < 0 || y6 > height) {
    y6Speed = y6Speed * -1;
  }
  fill(255);
  ellipse(x6, y6, 40, 30);
  fill(0);
  ellipse(x6, y6, 20, 15);
}
