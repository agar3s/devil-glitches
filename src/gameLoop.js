
var coso = [0, 0]

/**
* read the last events in game, update world 
*/
function update(t){
  t = t*200;
  if((keyMap&keys[65])>0) coso[0]-= t;
  if((keyMap&keys[87])>0) coso[1]-= t;
  if((keyMap&keys[83])>0) coso[1]+= t;
  if((keyMap&keys[68])>0) coso[0]+= t;
}

var angle = 0
function draw(t){
  // simple grid
  ctx.clearRect(0, 0, FW, FH);
  ctx.fillRect(0, 0, FW, FH);
  ctx.save()
  ctx.strokeStyle = "#545EB4";
  var gridSize = W/20
  ctx.beginPath();
  for(var i = 1; i < W; i+=gridSize){
    ctx.moveTo(i, 0);
    ctx.lineTo(i, H);
    ctx.moveTo(0, i);
    ctx.lineTo(W, i);
  }
  ctx.closePath();
  ctx.stroke()
  ctx.restore()

  // stuff
  ctx.save();
  ctx.strokeStyle = '#A352FF'
  ctx.strokeRect(0,0,100,100);
  ctx.strokeStyle = '#CE52FF'
  ctx.strokeRect(0,0,W,H);
  ctx.strokeStyle = '#A352FF'
  ctx.strokeRect(200,200,200,200);
  ctx.fillStyle = '#F952FF'
  ctx.fillRect(200,200,40,40);
  ctx.restore()

  ctx.save();
  ctx.translate(coso[0], coso[1]);
  ctx.fillStyle = 'rgba(13,89,140,0.6)';
  ctx.strokeStyle = "#F952FF";
  ctx.translate(-15, -15);
  ctx.fillRect(0, 0, 30, 30);
  ctx.strokeRect(0, 0, 30, 30);
  ctx.restore()
  
  ctx.save();
  ctx.translate(coords[0]+(coords[2]?(-5+Math.random()*10):0), coords[1]+(coords[2]?(-5+Math.random()*10):0));
  ctx.fillStyle = 'rgba(13,89,140,0.2)';
  ctx.strokeStyle = "#8EFAC8";
  angle+=t*25
  ctx.rotate((Math.PI/180)*angle);
  ctx.translate(-10, -10);
  ctx.fillRect(0,0,20,20);
  ctx.strokeRect(0, 0, 20, 20);
  ctx.restore();

}

var lastTime;
function loop(t){
  // webgl postprocessing 
  if(DEBUG){
    _fps_.begin();
    _processing_.begin();
    _memory_.begin();
  }

  if(!lastTime) lastTime = t;
  dt = (Math.min(100, t-lastTime)/1000);
  lastTime = t;

  // update changes
  update(dt);
  // draw changes 
  draw(dt);

  drawPostProcessing();

  if(DEBUG){
    _fps_.end();
    _processing_.end();
    _memory_.end();
  }
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);