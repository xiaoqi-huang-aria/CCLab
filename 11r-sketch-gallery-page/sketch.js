let mode = 0
let particles = []
let NUM_OF_PARTICLES = 5000
let noiseScale = 0.005
let ang
let len
let NUM_OF_RAINDROPS = 500;
let raindrops = [];
let NUM_OF_FISHES = 10;
let fishes = [];
let NUM_OF_BIRDS = 8;
let birds = [];
let NUM_OF_SNOWFLAKES = 500;
let snowflakes = [];
let a = 0
function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.parent("canvasContainer");
  ang = PI/9
  len = 40
 for (let i = 0; i < NUM_OF_PARTICLES; i++) {
particles.push(new Particle(random(width), random(height/2,height)))
  }
  for (let i = 0; i < NUM_OF_RAINDROPS; i++) {
  raindrops.push( new Raindrop(random(width), random(height)) );
  }
  for (let i = 0; i < NUM_OF_SNOWFLAKES; i++) {
  snowflakes.push( new Snowflake(random(width), random(height)) );
  }
}
function draw() {
  switch (mode) {
    case 0:
      scene0()
      break
    case 1:
      scene1();
      break;
    case 2:
      scene2(); 
      break;  
    case 3:
      scene3(); 
      break;  
    case 4:
      scene4()
      break
    default:
      //  
  }
}
function keyPressed() {
  if(key == " "){
  mode++;
  a = 0
  }
  if(key == "p"){
    a = 90
  }
}
function scene0(){
  textSize(20)
  text("Press space to change season",50,50)
  text("Press p to plant trees",50,100)
  text("Try mouse click",50,150)
  textSize(50)
  text("Ink Landscape",width/2,height/2)
}
function scene1() {
  background(255)
  push()
  noStroke()
  fill(255)
  rect(0,0,width,height/2)
  fill(198,223,200,80)
  mountain()
  pop()
  push()
  noStroke()
  fill(0,0,255,10)
  rect(0,height/2,width,height)
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.return()
    p.display()
  }
  pop()
for(let x = 50;x<width-50;x+=80){
  push()
  translate(x,height/2);
  strokeWeight(3)
  stroke(0,a)
  line(0,0,0,-len);
  translate(0,-len);
  branch(len,241,196,205,a);
  pop()
  }
  for (let i = 0; i < raindrops.length; i++) {
    let r = raindrops[i];
    if (mouseIsPressed) {
      r.stop();
    }
    r.move();
    r.return()
    r.display();
  }
}
function scene2() {
  background(255)
  push()
  noStroke()
  fill(255)
  rect(0,0,width,height/2)
  fill(92,179,204,80)
  mountain()
  pop()
  push()
  noStroke()
  fill(0,255,0,10)
  rect(0,height/2,width,height)
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.return()
    p.display()
  }
  pop()
for(let x = 50;x<width-50;x+=80){
  push()
  translate(x,height/2);
  strokeWeight(3)
  stroke(0,a)
  line(0,0,0,-len);
  translate(0,-len);
  branch(len,23,161,98,a);
  pop()
  }
  for (let i = 0; i < fishes.length; i++) {
    let f = fishes[i];
    f.move();
    f.display();
  }
  while (fishes.length > NUM_OF_FISHES) {
    fishes.splice(0, 1); 
  }

if(mouseIsPressed) {
  if(mouseY > height/2){
  fishes.push(new Fish(mouseX, mouseY)); 
  fishes.push(new Fish(mouseX + 10,mouseY - 10))
  fishes.push(new Fish(mouseX - 10,mouseY + 10))
  }
}
}
function scene3() {
  background(255)
  push()
  noStroke()
  fill(255)
  rect(0,0,width,height/2)
  fill(248,223,112,80)
  mountain()
  pop()
  push()
  noStroke()
  fill(0,255,255,10)
  rect(0,height/2,width,height)
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.return()
    p.display()
  }
  pop()
for(let x = 50;x<width-50;x+=80){
  push()
  translate(x,height/2);
  strokeWeight(3)
  stroke(0,a)
  line(0,0,0,-len);
  translate(0,-len);
  branch(len,194,31,48,a);
  pop()
  }
  for (let i = 0; i < birds.length; i++) {
    let b = birds[i];
    b.move();
    b.reappear()
    b.display();
  }
  while (birds.length > NUM_OF_BIRDS) {
    birds.splice(0, 1); 
 }
  if(mouseIsPressed) {
    if(mouseY < height/2){
  for(let i = 0;i<=8;i+=1){
  birds.push(new Bird(mouseX + i*15, mouseY + i*5));
  }  
}
}
}
function scene4() {
  background(255)
  push()
  noStroke()
  fill(255)
  rect(0,0,width,height/2)
  fill(122,115,116,80)
  mountain()
  pop()
  push()
  noStroke()
  fill(255,10)
  rect(0,height/2,width,height)
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    //p.move();
    //p.return()
    p.display()
  }
  pop()
for(let x = 50;x<width-50;x+=80){
  push()
  translate(x,height/2);
  strokeWeight(3)
  stroke(0,a)
  line(0,0,0,-len);
  translate(0,-len);
  branch(len,255,255,255,a);
  pop()
  }
  for (let i = 0; i < snowflakes.length; i++) {
    let s = snowflakes[i];
    if (mouseIsPressed) {
      s.stop();
    }
    s.move();
    s.return()
    s.display();
  }
}

function mountain(){
  beginShape();
  let xoff = frameCount * 0.02; 
  for(let h = 0;h <= 60;h += 30){
  for (let x = 0; x <= width; x += 10) {
     let y = map(sin(xoff),-1,1,50,150) + map(noise(xoff),0,1,0,100) - h
     vertex(x, y);
    xoff += 0.1;
}
  vertex(width, height/2);
  for(let x = width; x >= 0; x -= 10){
  let y = map(noise(width - xoff),0,1,height/2,height/2 + 30)
    vertex(x,y)
    xoff += 0.1
  }
  vertex(0, height/2);
  endShape(CLOSE);
  }
}
class Particle{
  constructor(x,y){
    this.x = x
    this.y = y
    this.noise = noise(this.x * noiseScale,this.y * noiseScale)
    this.angle = TWO_PI * this.noise
  }
  move(){
    this.x += cos(this.angle)
    this.y += sin(this.angle)
  }
  return(){
    if(this.x<0 || this.x>width || this.y<height/2 || this.y>height){
      this.x = random(width)
      this.y = random(height/2,height)
  }
}
  display(){
  noStroke()
  fill(0,random(100,200),random(150,200),10)
  ellipse(this.x,this.y,10,5)
  }
}
function branch(h,r,g,b) {
  h *= 0.66;
  if (h > 10) {
    push(); 
    rotate(ang)
    strokeWeight(3)
    stroke(0,a)
    line(0, 0, 0, -h);
    noStroke()
    fill(r,g,b,a*2)
    ellipse(-10,10,8,5)
    ellipse(10,-10,8,5)
    translate(0, -h); 
    branch(h); 
    pop();   
    push();
    rotate(-ang);
    strokeWeight(3)
    stroke(0,a)
    line(0, 0, 0, -h);
    noStroke()
    fill(r,g,b,a*2)
    ellipse(8,-10,8,5)
    ellipse(10,8,8,5)
    translate(0, -h);
    branch(h);
    pop();
      
  }
}
class Raindrop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xSpd = 0; 
    this.ySpd = 1; 
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  return() {
    if(this.y>height){
      this.x = random(width)
      this.y = 0
    }
  }
  stop(){
    this.xSpd = 0
    this.ySpd = this.ySpd * 0.9
  }
  display() {
    push();
    translate(this.x, this.y);
    stroke(0,random(100),random(220,255),80)
    line(0,0,0,15)
    pop();
  }
}
class Fish {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xSpd = random(-2, 2);
    this.ySpd = random(0,2);
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  display() {
    push();
    translate(this.x, this.y);
    noStroke()
    fill(240,55,82,90);
    ellipse(0, 0,10,6);
    pop();
  }
}

class Bird {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xSpd = -1;
    this.ySpd = -0.5;
    this.dia = 5;
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  reappear(){
    if (this.x < 0) {
    this.x = width;
  } 
    if(this.y < 0){
      this.y = 200
    }
  }
  display() {
    push();
    translate(this.x, this.y);
    noStroke()
    fill(0,90);
    circle(0, 0, this.dia);
    pop();
  }
}

class Snowflake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xSpd = 0; 
    this.ySpd = 1;
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  return() {
    if(this.y>height){
      this.x = random(width)
      this.y = 0
    }
  }
  stop(){
    this.xSpd = 0
    this.ySpd = this.ySpd * 0.9
  }
  display() {
    push();
    translate(this.x, this.y);
    noStroke()
    fill(255,80)
    circle(0,0,5)
    pop();
  }
}