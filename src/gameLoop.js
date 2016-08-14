
var coso = [0, 0]

function read(){
  if((keyMap&keys[65])>0) coso[0]--
  if((keyMap&keys[87])>0) coso[1]--
  if((keyMap&keys[83])>0) coso[1]++
  if((keyMap&keys[68])>0) coso[0]++
  console.log(coords)
}

function update(){

}

function draw(t){
  ctx.save();
  ctx.clearRect(0, 0, FW, FH);
  ctx.strokeStyle = '#FFF'
  ctx.strokeRect(0,0,100,100);
  ctx.strokeStyle = '#F00'
  ctx.strokeRect(0,0,W,H);
  ctx.strokeStyle = '#FFF'
  ctx.strokeRect(200,200,200,200);
  ctx.fillStyle = '#0F0'
  ctx.fillRect(200,200,40,40);
  ctx.restore()

  ctx.save();
  ctx.translate(coso[0], coso[1]);
  ctx.fillStyle = "blue";
  ctx.rotate((Math.PI/180)*25);
  ctx.fillRect(-50, -50, 100, 100);
  ctx.restore()
  
  ctx.save();
  ctx.translate(coords[0]+(coords[2]?(-5+Math.random()*10):0), coords[1]+(coords[2]?(-5+Math.random()*10):0));
  ctx.strokeStyle = "red";
  ctx.rotate((Math.PI/180)*(t/60));
  ctx.translate(-50, -50);
  ctx.strokeRect(0,0,100,100);
  ctx.restore()
  
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
  read();
  // update changes
  update();
  // draw changes
  draw(t);
  // webgl postprocessing
  drawPostProcessing();

  if(DEBUG){
    _fps_.end();
    _processing_.end();
    _memory_.end();
  }
}

requestAnimationFrame(loop);