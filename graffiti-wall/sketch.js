let objs = [];
let buttons = [];
let paints = [];
let FPS = 60;
let timepast = 0;
let R = 200;
let G = 150;
let B = 50;
let bR = 0;
let bG = 0;
let bB = 0;
let eraserRange = 20;
let timerRange = 50;
let brushType = "CIRCLE";
let pbrushType = "CIRCLE";
let isPlaying = true;
let isMenuHide = false;
function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent("canvasContainer");
  frameRate(FPS);
  noCursor();
  strokeCap(PROJECT);
  //Color Buttons
  buttons.push(new ColorButton(5 + 30 * 3, 5, 30, 30, 200, 50, 50));
  buttons.push(new ColorButton(5 + 30 * 4, 5, 30, 30, 200, 100, 50));
  buttons.push(new ColorButton(5 + 30 * 5, 5, 30, 30, 200, 150, 50));

  buttons.push(new ColorButton(5 + 30 * 6, 5, 30, 30, 150, 200, 50));
  buttons.push(new ColorButton(5 + 30 * 7, 5, 30, 30, 100, 200, 50));
  buttons.push(new ColorButton(5 + 30 * 8, 5, 30, 30, 50, 200, 50));

  buttons.push(new ColorButton(5 + 30 * 9, 5, 30, 30, 50, 150, 200));
  buttons.push(new ColorButton(5 + 30 * 10, 5, 30, 30, 50, 100, 200));
  buttons.push(new ColorButton(5 + 30 * 11, 5, 30, 30, 50, 50, 200));

  buttons.push(new ColorButton(5 + 30 * 12, 5, 30, 30, 100, 50, 200));
  buttons.push(new ColorButton(5 + 30 * 13, 5, 30, 30, 150, 50, 200));
  buttons.push(new ColorButton(5 + 30 * 14, 5, 30, 30, 200, 50, 200));

  //Function Buttons
  buttons.push(new FunctionButton(5, 5 + 30 * 4, 30, 30, "sun"));
  buttons.push(new FunctionButton(5, 5 + 30 * 5, 30, 30, "paint"));
  buttons.push(new FunctionButton(5, 5 + 30 * 6, 30, 30, "circle"));
  if (isPlaying) {
    buttons.push(new FunctionButton(5, 5 + 30 * 7, 30, 30, "pause"));
  } else {
    buttons.push(new FunctionButton(5, 5 + 30 * 7, 30, 30, "play"));
  }
  buttons.push(new FunctionButton(5, 5 + 30 * 8, 30, 30, "timer"));
  buttons.push(new FunctionButton(5, 5 + 30 * 9, 30, 30, "eraser"));
  buttons.push(new FunctionButton(5, 5 + 30 * 10, 30, 30, "clear"));
  buttons.push(new FunctionButton(5, 5 + 30 * 11, 30, 30, "save"));
}

function draw() {
  background(bR, bG, bB);
  timepast += 1 / FPS;
  if (mouseIsPressed && ((mouseX > 40 && mouseY > 40) || isMenuHide)) {
    if (brushType == "CIRCLE" || brushType == "TRIANGLE" || brushType == "SQUARE") {
      let position = createVector(mouseX, mouseY);
      objs.push(new Bubble(position,sqrt(sq(mouseX - pmouseX) + sq(mouseY - pmouseY)),R,G,B));
    } else if (brushType == "PAINT") {
      paints.push(new Paint((mouseX, mouseY), R, G, B));
    } else if (brushType == "ERASER") {
      for (let i = 0; i < objs.length; i++) {
      if (sqrt(sq(objs[i].position.x  -mouseX)+sq(objs[i].position.y - mouseY)) <= eraserRange) {
      objs.splice(i, 1);
      break;
        }
      }
      for (let i = 0; i < paints.length; i++) {
        if (
          sqrt(
            sq(paints[i].position.x - mouseX) +
              sq(paints[i].position.y - mouseY)
          ) <= eraserRange
        ) {
          paints.splice(i, 1);
          break;
        }
      }
    } else if (brushType == "TIMER" ) {
      for (let i = 0; i < objs.length; i++) {
        if (
          sqrt(
            sq(objs[i].position.x - mouseX) + sq(objs[i].position.y - mouseY)
          ) <= timerRange
        ) {
          objs[i].timepast += 2 / FPS;
          objs[i].isPlaying = false;
        }
      }
    }
  }
  for (let i = 0; i < paints.length; i++) {
    paints[i].update();
    paints[i].display();
  }
  for (let i = 0; i < objs.length; i++) {
    objs[i].drawing();
    objs[i].update();
  }
  stroke(0);
  strokeWeight(2);
  if (!isMenuHide) {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].displayButton();
      if (buttons[i].isMouseInButton()) {
        cursor(HAND);
      }
    }
  }
  if ((mouseX > 40 && mouseY > 40) || isMenuHide) {
    noCursor();
    fill(R * 1.5, G * 1.5, B * 1.5);
    stroke(R * 1.5, G * 1.5, B * 1.5);
    if (brushType == "CIRCLE") {
      ellipse(mouseX, mouseY, 10, 10);
    } else if (brushType == "TRIANGLE") {
      triangle(
        mouseX - 5,
        mouseY + 3,
        mouseX + 5,
        mouseY + 3,
        mouseX,
        mouseY - 5
      );
    }else if(brushType == "SQUARE"){
      rect(mouseX,mouseY,10,10)
    } else if (brushType == "PAINT") {
      ellipse(mouseX, mouseY, 10, 8);
    } else if (brushType == "ERASER") {
      translate(mouseX, mouseY);
      noFill();
      stroke(255 - bR);
      ellipse(0, 0, eraserRange, eraserRange);
      resetMatrix();
    } else if (brushType == "TIMER") {
      translate(mouseX, mouseY);
      stroke(255 - bR);
      noFill();
      ellipse(0, 0, timerRange, timerRange);
      ellipse(0, 0, 22, 22);
      ellipse(0, 0, 25, 25);
      fill(255 - bR);
      ellipse(0, 0, 3, 3);
      strokeWeight(2);
      line(0, 0, 6, 0);
      line(0, 0, 0, -7);
      resetMatrix();
    }
  }
}
function mouseClicked() {
  if (!isMenuHide) {
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].isMouseInButton()) {
        buttons[i].clickButton();
      }
    }
  }
  return false;
}
function keyPressed() {
  if (keyCode == 16) {
    //Shift L
    isMenuHide = !isMenuHide;
  }
}
function FunctionButton(x, y, w, h, CMD) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.cmd = CMD;
}
FunctionButton.prototype.isMouseInButton = function () {
  if (
    mouseX >= this.x &&
    mouseX <= this.x + this.w &&
    mouseY >= this.y &&
    mouseY <= this.y + this.h
  ) {
    return true;
  } else {
    return false;
  }
};
FunctionButton.prototype.clickButton = function () {
  print("ClickBtn!");
  if (this.cmd == "sun") {
    bR = 255;
    bG = 255;
    bB = 255;
    this.cmd = "moon";
  } else if (this.cmd == "moon") {
    bR = 0;
    bG = 0;
    bB = 0;
    this.cmd = "sun";
  } else if (this.cmd == "pause") {
    isPlaying = false;
    for (var i = 0; i < objs.length; i++) {
      objs[i].isPlaying = false;
    }
    this.cmd = "play";
  } else if (this.cmd == "play") {
    isPlaying = true;
    for (let i = 0; i < objs.length; i++) {
      objs[i].isPlaying = true;
    }
    this.cmd = "pause";
  } else if (this.cmd == "timer") {
    brushType = "TIMER";
  } else if (this.cmd == "eraser") {
    brushType = "ERASER";
  } else if (this.cmd == "clear") {
    objs = [];
    paints = [];
    particles = []
  } else if (this.cmd == "save") {
    saveCanvas("Painting", "png");
  } else if (this.cmd == "circle") {
    brushType = "TRIANGLE";
    pbrushType = "CIRCLE";
    this.cmd = "triangle";
  } else if (this.cmd == "triangle") {
    brushType = "SQUARE";
    pbrushType = "TRIANGLE";
    this.cmd = "square";
  } else if (this.cmd == "square"){
    brushType = "CIRCLE"
    pbrushType = "SQUARE"
    this.cmd = "circle"
  } else if (this.cmd == "paint") {
    brushType = "PAINT";
  }
}
FunctionButton.prototype.displayButton = function () {
  push();
  stroke(0);
  strokeWeight(1);
  fill(255, 255, 255);
  rect(this.x, this.y, this.w, this.h, 5);
  pop();

  if (this.cmd == "sun") {
    fill(255, 50, 50);
    translate(this.x + this.w / 2, this.y + this.h / 2);
    for (var i = 0; i < 8; i++) {
      rotate(PI / 4.0);
      line(0, 0, 8, 8);
    }
    resetMatrix();
    ellipse(this.x + this.w / 2, this.y + this.h / 2, 15, 15);
  } else if (this.cmd == "moon") {
    fill(255, 255, 50);
    translate(this.x + this.w / 2, this.y + this.h / 2);
    arc(-5, 0, 25, 25, PI + HALF_PI, HALF_PI, CHORD);
    resetMatrix();
  } else if (this.cmd == "pause") {
    fill(0);
    translate(this.x + this.w / 2, this.y + this.h / 2);
    rectMode(CENTER);
    rect(-4, 0, 4, 15);
    rect(4, 0, 4, 15);
    rectMode(CORNER);
    resetMatrix();
  } else if (this.cmd == "play") {
    fill(0);
    translate(this.x + this.w / 2, this.y + this.h / 2);
    triangle(-2, -8, -2, 8, 6, 0);
    resetMatrix();
  } else if (this.cmd == "timer") {
    translate(this.x + this.w / 2, this.y + this.h / 2);
    noFill();
    ellipse(0, 0, 22, 22);
    ellipse(0, 0, 25, 25);
    fill(0);
    ellipse(0, 0, 3, 3);
    strokeWeight(2);
    line(0, 0, 6, 0);
    line(0, 0, 0, -7);
    resetMatrix();
  } else if (this.cmd == "eraser") {
    fill(0);
    noStroke();
    translate(this.x + this.w / 2, this.y + this.h / 2);
    textSize(25);
    textAlign(CENTER);
    textStyle(BOLD);
    text("E", 0, 8);
    resetMatrix();
  } else if (this.cmd == "clear") {
    fill(0);
    noStroke();
    translate(this.x + this.w / 2, this.y + this.h / 2);
    textSize(25);
    textAlign(CENTER);
    textStyle(BOLD);
    text("C", 0, 8);
    resetMatrix();
  } else if (this.cmd == "save") {
    fill(0);
    noStroke();
    translate(this.x + this.w / 2, this.y + this.h / 2);
    textSize(25);
    textAlign(CENTER);
    textStyle(BOLD);
    text("S", 0, 8);
    resetMatrix();
  } else if (this.cmd == "circle") {
    noFill()
    stroke(0)
    translate(this.x + this.w / 2, this.y + this.h / 2);
    ellipse(6, -2, 10, 10);
    ellipse(-5, -5, 5, 5);
    ellipse(3, 8, 4, 4);
    resetMatrix();
  } else if (this.cmd == "triangle") {
    noFill()
    stroke(0)
    translate(this.x + this.w / 2, this.y + this.h / 2);
    triangle(0, 0, 10, 0, 5, -8);
    triangle(-5, 8, 5, 8, 0, 0);
    triangle(-8, -5, -3, -5, -5.5, -9);
    resetMatrix();
  } else if (this.cmd == "square") {
    noFill()
    stroke(0)
    translate(this.x + this.w / 2, this.y + this.h / 2);
    rect(1, -7, 10, 10);
    rect(-7, -8, 5, 5);
    rect(-2, 6, 4, 4);
    resetMatrix();
  } else if (this.cmd == "paint") {
    fill(0);
    translate(this.x + this.w / 2, this.y + this.h / 2);
    ellipse(0, 0, 10, 8);
    resetMatrix();
  }
}
function ColorButton(x, y, w, h, givenR, givenG, givenB) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.r = givenR;
  this.g = givenG;
  this.b = givenB;
}
ColorButton.prototype.isMouseInButton = function () {
  if (
    mouseX >= this.x &&
    mouseX <= this.x + this.w &&
    mouseY >= this.y &&
    mouseY <= this.y + this.h
  ) {
    return true;
  } else {
    return false;
  }
};
ColorButton.prototype.clickButton = function () {
  R = this.r;
  G = this.g;
  B = this.b;
  if (brushType == "ERASER" || brushType == "TIMER") {
    brushType = pbrushType;
  }
};
ColorButton.prototype.displayButton = function () {
  push();
  noStroke();
  fill(this.r * 1.5, this.g * 1.5, this.b * 1.5);
  rect(this.x, this.y, this.w, this.h, 5);
  pop();
};
function Bubble(position, givenSize, givenR, givenG, givenB) {
  this.R = givenR;
  this.G = givenG;
  this.B = givenB;
  this.position = createVector(position.x, position.y);
  this.position.x += random(20) - 10;
  this.position.y += random(20) - 10;
  this.size = createVector(0, 0);
  this.sizeScale = 0.5;
  var randomSize = givenSize / 2 + random(10);
  this.baseSize = createVector(randomSize, randomSize);
  this.timepast = 0;
  this.isPlaying = isPlaying;
  this.rotateAngle = random(2 * PI);
  this.shapeType = brushType;
  this.pmouseX = pmouseX;
  this.pmouseY = pmouseY;
  this.mouseX = mouseX;
  this.mouseY = mouseY;
}
Bubble.prototype.update = function () {
  this.size = createVector(
    this.baseSize.x + sin(this.timepast) * this.baseSize.x * this.sizeScale,
    this.baseSize.y + sin(this.timepast) * this.baseSize.y * this.sizeScale
  );
  if (this.isPlaying) {
    this.timepast += 1 / FPS;
  }
};
Bubble.prototype.drawing = function () {
  noStroke();
  if (this.shapeType == "CIRCLE") {
    translate(this.position.x, this.position.y);
    fill(
      (this.size.x * this.R) / 10,
      (this.size.x * this.G) / 10,
      (this.size.x * this.B) / 10,
      round(sin(this.timepast) * 128)
    );
    ellipse(
      sin(this.timepast) * this.baseSize.x,
      cos(this.timepast) * this.baseSize.y,
      this.size.x * 1.25,
      this.size.y * 1.25
    );
    fill(
      (this.size.x * this.R) / 10,
      (this.size.x * this.G) / 10,
      (this.size.x * this.B) / 10,
      255
    );
    ellipse(
      sin(this.timepast) * this.baseSize.x,
      cos(this.timepast) * this.baseSize.y,
      this.size.x,
      this.size.y
    );
    resetMatrix();
  } else if (this.shapeType == "TRIANGLE") {
    translate(this.position.x, this.position.y);
    rotate(this.rotateAngle);
    fill(
      (this.size.x * this.R) / 10,
      (this.size.x * this.G) / 10,
      (this.size.x * this.B) / 10,
      round(sin(this.timepast) * 128)
    );
    triangle(
      sin(this.timepast) * this.baseSize.x - this.size.x * 1.5 * 0.5,
      cos(this.timepast) * this.baseSize.y - this.size.y * 1.5 * 0.5,

      sin(this.timepast) * this.baseSize.x + this.size.x * 1.5 * 0.5,
      cos(this.timepast) * this.baseSize.y - this.size.y * 1.5 * 0.5,

      sin(this.timepast) * this.baseSize.x * 0.5,
      cos(this.timepast) * this.baseSize.y + this.size.y * 1.5 * 0.9 * 0.5
    );

    fill(
      (this.size.x * this.R) / 10,
      (this.size.x * this.G) / 10,
      (this.size.x * this.B) / 10,
      255
    );
    triangle(
      sin(this.timepast) * this.baseSize.x - this.size.x * 0.5,
      cos(this.timepast) * this.baseSize.y - this.size.y * 0.5,

      sin(this.timepast) * this.baseSize.x + this.size.x * 0.5,
      cos(this.timepast) * this.baseSize.y - this.size.y * 0.5,

      sin(this.timepast) * this.baseSize.x * 0.5,
      cos(this.timepast) * this.baseSize.y + this.size.y * 0.9 * 0.5
    );
    resetMatrix();
  }else if (this.shapeType == "SQUARE"){
    translate(this.position.x, this.position.y);
    rotate(this.rotateAngle);
    fill(this.size.x * this.R / 10, this.size.x * this.G / 10, this.size.x * this.B / 10, round(sin(this.timepast) * 128));
    rect(sin(this.timepast) * this.baseSize.x, cos(this.timepast) * this.baseSize.y, this.size.x * 1.25, this.size.y * 1.25);
    fill(this.size.x * this.R / 10, this.size.x * this.G / 10, this.size.x * this.B / 10, 255);
    rect(sin(this.timepast) * this.baseSize.x, cos(this.timepast) * this.baseSize.y, this.size.x, this.size.y);
    resetMatrix();
    }
};
class Paint {
  constructor(position, givenR, givenG, givenB) {
    this.pmouseX = pmouseX;
    this.pmouseY = pmouseY;
    this.mouseX = mouseX;
    this.mouseY = mouseY;
    this.R = givenR;
    this.B = givenB;
    this.G = givenG;
    this.position = createVector(position.x, position.y);
    this.position.x = this.mouseX;
    this.position.y = this.mouseY;
    this.size = createVector(0, 0);
    this.randomSize =
      sqrt(sq(this.mouseX - this.pmouseX) + sq(this.mouseY - this.pmouseY)) /
        2 +
      random(5);
    this.baseSize = createVector(this.randomSize, this.randomSize);
    this.timepast = 0;
    this.shapeType = brushType;
  }
  update() {
    this.size = createVector(
      this.baseSize.x + sin(this.timepast) * this.baseSize.x * 0.5,
      this.baseSize.y + sin(this.timepast) * this.baseSize.y * 0.5
    );
    if (this.isPlaying) {
      this.timepast += 1 / FPS;
    }
  }
  display() {
    if (this.shapeType == "PAINT") {
      translate(this.position.x, this.position.y);
      noStroke();
      fill(this.R,this.G,this.B, 80);
      ellipse(0, 0, this.size.x * 2, this.size.y);
      fill(this.R, this.G, this.B, 50);
      ellipse(sin(this.timepast) * this.size.x,cos(this.timepast) * this.size.y,40,20);
      ellipse(cos(this.timepast) * this.size.x,sin(this.timepast) * this.size.y,40,20);
      resetMatrix();
    }
  }
}
