/**
* read the last events in game, update world 
*/
function update(dt){
  // apply speed to hero movement
  t = dt*hero[2];
  // move depending on keypressed
  if((keyMap&keys[65])>0){
    hero[0]-=t;
    if(hero[0]<hero[3]/2) hero[0] = hero[3]/2; // hero limit on x left
    if(hero[0]>viewPort[2]&&hero[0]<mapPixels-viewPort[2]) viewPort[0]+=t;
  } 
  if((keyMap&keys[87])>0){
    hero[1]-=t;
    if(hero[1]<hero[3]/2) hero[1] = hero[3]/2;
    if(hero[1]>viewPort[3]&&hero[1]<mapPixels-viewPort[3]) viewPort[1]+=t;
  }

  if((keyMap&keys[83])>0){
    hero[1]+=t;
    if(hero[1]>mapPixels - hero[3]/2) hero[1] = mapPixels - hero[3]/2;
    if(hero[1]>viewPort[3]&&hero[1]<mapPixels-viewPort[3]) viewPort[1]-=t;
  }
  if((keyMap&keys[68])>0){
    hero[0]+=t;
    if(hero[0]>mapPixels - hero[3]/2) hero[0] = mapPixels - hero[3]/2;
    if(hero[0]>viewPort[2]&&hero[0]<mapPixels-viewPort[2]) viewPort[0]-=t;
  }

  // turn according to the pointer 
  hero[4] = getAngle([hero[0]+viewPort[0], hero[1]+viewPort[1]], coords);

  // if fire shots fire
  if(coords[2]&&hero[6]<=0){
    bullets.push([hero[0]+shake(1, 2), hero[1]+shake(1, 2), hero[4]+shake(1, 0.05)])
    play(fireSound)
    hero[6] = 1/hero[7]; //5bullets per second
  }else{
    hero[6]-=dt
  }

  for (var i = bullets.length-1; i >= 0; i--) {
    var bullet = bullets[i];
    bullet[0] += Math.cos(bullet[2])*t*2; // bullet speed *2
    bullet[1] += Math.sin(bullet[2])*t*2;
    if(bullet[0]<-20||bullet[0]>mapPixels+20||bullet[1]<-20||bullet[1]>mapPixels+20) bullets.splice(i,1);
  }
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
  //ctx.clearRect(0, 0, FW, FH);
  ctx.fillStyle= 'rgba(0,0,0,0.18)';
  ctx.fillRect(0,0,FW, FH);
  ctx.fillStyle= `rgba(${Math.floor(Math.random()*180)},${Math.floor(Math.random()*185)}, ${Math.floor(Math.random()*185)},1)`;
  for(var i=0;i<6;i++) ctx.fillRect(Math.random()*800, Math.random()*600, 2, 2)
  ctx.save()
  ctx.strokeStyle = "#545EB4";
  var gridSize = H/mapSize
  ctx.beginPath();
  ctx.translate(shake(coords[2], 2), shake(coords[2], 2));
  ctx.fillStyle = 'rgba(12,27,46,0.2)';
  ctx.translate(viewPort[0], viewPort[1])
  ctx.fillRect(0, 0, mapPixels, mapPixels)
  for(var i = 0; i <= mapSize; i++){
    ctx.moveTo(i*tileset, 0);
    ctx.lineTo(i*tileset, mapPixels);
    ctx.moveTo(0, i*tileset);
    ctx.lineTo(mapPixels, i*tileset);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();

  // draw hero

  ctx.save();
  ctx.translate(hero[0] + viewPort[0] + shake(coords[2], 1), hero[1] + viewPort[1]+ shake(coords[2], 1));
  ctx.strokeStyle = "#F952FF";
  ctx.rotate(hero[4]+Math.PI/2);
  path(heroShape[0], heroShape[1]);
  ctx.stroke()
  ctx.restore()
  
  // cross 
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

  // draw bullets
  ctx.save();
  ctx.fillStyle = '#37ACE7';
  for (var i = 0; i < bullets.length; i++) {
    var bullet = bullets[i];
    if(bullet[0]+viewPort[0]<20||bullet[0]+viewPort[0]>W-20||bullet[1]+viewPort[1]<20||bullet[1]+viewPort[1]>H-20) continue
    ctx.beginPath();
    ctx.arc(bullet[0]+viewPort[0], bullet[1]+viewPort[1], 2, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  }
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
  frame++;

  // update changes
  update(dt);
  // draw changes 
  draw(dt);

  drawPostProcessing(Math.floor(t));

  if(DEBUG){
    _fps_.end();
    _processing_.end();
    _memory_.end();
  }
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);