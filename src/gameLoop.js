
function read(){

}

function update(){

}

function draw(){
  
}

var lastTime;
function loop(t){
  requestAnimationFrame(loop);
  if(!lastTime) lastTime = t;
  dt = Math.min(100, t-lastTime);
  lastTime = t;
  console.log('fps ', dt)

  // check changes
  read()
  // update changes
  update()
  // draw changes
  draw()
}

requestAnimationFrame(loop);