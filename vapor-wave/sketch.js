let r,g,b

function setup() {
  createCanvas(400, 400);
  background(255,251,150)
  }

function draw() {
  if(keyIsPressed && key == " "){
  background(255,251,150)}
  strokeWeight(2) 
  if(keyIsPressed){
    if(key == "1") {r = 255
                    g = 113
                    b = 206}//pink
    if(key == "2") {r = 5
                    g = 255
                    b = 161}//green
    if(key == "3") {r = 1
                    g = 205
                    b = 254}//blue
    if(key == "4") {r = 185
                    g = 103
                    b = 255}//purple
    }
  if(mouseIsPressed){
    if(mouseX<width/2 && mouseY<height/2){
  for(var y = mouseY; y <= height; y += 40){
    for(var x = mouseX; x <= width; x += 40){
    noStroke()
    fill(r,g,b)
    ellipse(x,y,20, 20)}}}
     if(mouseX<width/2 && mouseY>height/2){
       for(var y = mouseY; y >= 0;y -= 40){
         for(var x = mouseX; x <= width;x += 40){
           stroke(r,g,b)
           fill(255,251,150,0)
           rect(x,y,20,20)}}}
     if(mouseX>width/2 && mouseY<height/2){
       for(var y = mouseY; y <= height;y += 40){
         for(var x = mouseX; x >= 0;x -= 40){
           noStroke()
           fill(r,g,b)
           rect(x,y,20,20)}}}
     if(mouseX>width/2 && mouseY>height/2){
       for(var y = mouseY;y >= 0;y -= 40){
         for(var x = mouseX;x >= 0;x -= 40){
           stroke(r,g,b)
           fill(255,251,15,0)
           ellipse(x,y,20,20)}}}
      }
}
