/**
* read the last events in game, update world 
*/
function update(t){
  // apply speed to hero movement
  t = t*hero[2];
  // move depending on keypressed
  if((keyMap&keys[65])>0){
    hero[0]-=t;
    viewPort[0]+=t;
  } 
  if((keyMap&keys[87])>0){
    hero[1]-=t;
    viewPort[1]+=t;
  }

  if((keyMap&keys[83])>0){
    hero[1]+=t;
    viewPort[1]-=t;
  }
  if((keyMap&keys[68])>0){
   hero[0]+=t;
    viewPort[0]-=t;
  }

  // turn according to the pointer
  hero[4] = getAngle([hero[0]+viewPort[0], hero[1]+viewPort[1]], coords)
}

function shake(cond, val){
  return cond?(Math.random()*val*2-val):0;
}

/**
helper function to draw paths.
*/
function path(xpts, ypts){
  ctx.beginPath();
  for (var i = 0; i<xpts.length-1; i++) {
    ctx.moveTo(xpts[i], ypts[i]);
    ctx.lineTo(xpts[i+1], ypts[i+1]);
  }
  ctx.moveTo(xpts[i], ypts[i]);
  ctx.lineTo(xpts[0], ypts[0]);
  ctx.closePath();
}

function draw(t){
  // draw map
  ctx.clearRect(0, 0, FW, FH);
  ctx.save()
  ctx.strokeStyle = "#545EB4";
  var gridSize = H/mapHeight
  ctx.beginPath();
  ctx.translate(shake(coords[2], 2), shake(coords[2], 2));
  for(var i = 0; i <= mapHeight; i++){
    ctx.moveTo(viewPort[0]+i*tileset, viewPort[1]);
    ctx.lineTo(viewPort[0]+i*tileset, viewPort[1]+mapHeight*tileset);
    ctx.moveTo(viewPort[0], viewPort[1]+i*tileset);
    ctx.lineTo(viewPort[0]+mapHeight*tileset, viewPort[1]+i*tileset);
  }
  ctx.closePath();
  ctx.stroke()
  ctx.restore()

  // draw hero
  ctx.save();
  ctx.translate(hero[0] + viewPort[0] + shake(coords[2], 1), hero[1] + viewPort[1]+ shake(coords[2], 1));
  ctx.fillStyle = 'rgba(13,89,140,0.6)';
  ctx.strokeStyle = "#F952FF";
  ctx.translate(-hero[3]/2, -hero[3]/2);
  ctx.rotate(hero[4]);
  path([-10, 10, 10, -10],[-10, -10, 10, 10])
  //ctx.fillRect(0, 0, hero[3], hero[3]);
  //ctx.strokeRect(0, 0, hero[3], hero[3]);
  ctx.stroke()
  ctx.restore()
  
  // hit
  ctx.save();
  ctx.translate(coords[0], coords[1]);
  ctx.strokeStyle = "#C36084";
  hero[5]+=(t*25*(coords[2]*8+1))
  hero[5]%=360
  ctx.rotate((Math.PI/180)*hero[5]);
  ctx.translate(-10, -10);
  ctx.beginPath();
  ctx.moveTo(0, 10)
  ctx.lineTo(20, 10)
  ctx.moveTo(10, 0)
  ctx.lineTo(10, 20)
  ctx.closePath();
  ctx.stroke();
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