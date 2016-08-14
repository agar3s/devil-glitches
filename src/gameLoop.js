
function read(){
}

function update(){

}

function draw(){
  
}

var lastTime;
function loop(t){
  requestAnimationFrame(loop);
  if(DEBUG){
    _fps_.begin();
    _processing_.begin();
    _memory_.begin();
  }

  if(!lastTime) lastTime = t;
  dt = Math.min(100, t-lastTime);
  lastTime = t;

  // check changes
  read()
  // update changes
  update()
  // draw changes
  draw()

  if(DEBUG){
    _fps_.end();
    _processing_.end();
    _memory_.end();
  }
}

requestAnimationFrame(loop);