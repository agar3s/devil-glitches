/**
* read the last events in game, update world 
*/

var particleZ = Math.PI/2;
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
    play(fireSound);
    hero[6] = 1/hero[7]; //5bullets per second
  }else{
    hero[6]-=dt
  }

  // update bullets
  for (var i = bullets.length-1; i >= 0; i--) {
    var bullet = bullets[i];
    bullet[0] += Math.cos(bullet[2])*t*2; // bullet speed *2
    bullet[1] += Math.sin(bullet[2])*t*2;
    if(bullet[0]<-20||bullet[0]>mapPixels+20||bullet[1]<-20||bullet[1]>mapPixels+20) bullets.splice(i,1);


    // for (var j = enemies.length-1; j >=0 ; j--) {
    //   if(Math.hypot(bullet[1]-enemies[j][1], bullet[0]-enemies[j][0])<10){
    //     //testing
    //     for (var h = -10; h < 10; h++) {
    //       particles.push([bullet[0], bullet[1], bullet[2]+particleZ*h*Math.random(), 100])
    //     }
    //     enemies.splice(j,1);
    //     bullets.splice(i,1);
    //     play(enemyDie);
    //   }
    // }

  }

  //update particles
  for(var i=0;i<particles.length;i++){
    let particle = particles[i];
    particle[0] += Math.cos(particle[2])*(2+Math.random()*3);
    particle[1] += Math.sin(particle[2])*(2+Math.random()*3);
    if(--particle[3]<0) particles.splice(i,1)
  }

  // update enemies
  for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];
    if(Math.abs(enemy[2+2]-enemy[3+2])<0.005){
      enemy[3+2] = getAngle(enemy, hero);
      enemy[4+2] = (enemy[3+2]-enemy[2+2])/30;
    }

    if(enemy[8+2]==0){
      enemy[2+2] += enemy[4+2];
      enemy[0] += Math.cos(enemy[2+2])*t;
      enemy[1] += Math.sin(enemy[2+2])*t;
    }else{
      enemy[8]--;
      continue;
    }
    // glitch mutation simple concept...
    // let test = Math.random()
    // if(test<0.0001&&enemy[5+2].length<15){
    //   let angle = Math.random()*Math.PI*2;
    //   enemy[5+2].splice(0,1);
    //   enemy[6+2].splice(0,1);
    //   let x = Math.cos(angle)*(Math.random()*18+6);
    //   let y = Math.sin(angle)*(Math.random()*18+6);
    //   enemy[5+2].push(x);
    //   enemy[6+2].push(y);
    //   enemy[8+2] = 15;
    // }else if(test<0.0002&&enemy[5+2].length>4){ //remove a part
    //   enemy[5+2].splice(0,1);
    //   enemy[6+2].splice(0,1);
    //   enemy[8+2] = 15;
    // }else if(test<(0.0001+enemy[9+2])){ //lag
    //   let lag = Math.random()*20;
    //   enemy[0] -= Math.cos(enemy[2+2])*t*lag;
    //   enemy[1] -= Math.sin(enemy[2+2])*t*lag;
    //   enemy[8+2] = 12;
    //   if(enemy[9+2]<0.01)
    //     enemy[9+2]+=0.001;  //increase lag probability 
    // }else {
    // }
    
  }
  checkUpdateQuad(quadTree);

}

function shake(cond, val){
  return cond?(Math.random()*val*2-val):0;
}

/**
helper function to draw paths.
*/
function path(xpts, ypts, offsetX, offsetY){
  offsetX = offsetX || 0
  offsetY = offsetY || 0
  ctx.beginPath();
  ctx.moveTo(xpts[0]+offsetX, ypts[0]+offsetY);
  for (var i = 1; i<xpts.length; i++) {
    ctx.lineTo(xpts[i]+offsetX, ypts[i]+offsetY);
  }
  ctx.closePath();
  ctx.stroke();
}

function pathEnemy(enemy){
  let offsetX = enemy[0]+viewPort[0]+shakeScreen[0]; // 20 /2 width/2
  let offsetY = enemy[1]+viewPort[1]+shakeScreen[1]; // 
  
  ctx.beginPath();
  ctx.translate(offsetX, offsetY)
  ctx.rotate(enemy[2+2])
  ctx.moveTo(enemy[5+2][0], enemy[6+2][0]);
  for (var i = 1; i<enemy[5+2].length; i++) {
    ctx.lineTo(enemy[5+2][i], enemy[6+2][i]);
  }
  ctx.closePath();
  ctx.rotate(-enemy[2+2])
  ctx.translate(-offsetX, -offsetY)
  
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
  shakeScreen = [shake(coords[2], 2), shake(coords[2], 2)]
  ctx.translate(shakeScreen[0], shakeScreen[1]);
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
  ctx.lineWidth = 3;
  ctx.translate(hero[0] + viewPort[0] + shake(coords[2], 1), hero[1] + viewPort[1]+ shake(coords[2], 1));
  ctx.strokeStyle = "#F952FF";
  ctx.rotate(hero[4]+Math.PI/2);
  path(heroShape[0], heroShape[1]);
  ctx.restore()

  // draw enemies

  ctx.save();
  ctx.strokeStyle = '#07000A';
  ctx.lineWidth = 3;
  for (var i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    if(enemy[0]+viewPort[0]<20||enemy[0]+viewPort[0]>W-20||enemy[1]+viewPort[1]<20||enemy[1]+viewPort[1]>H-20) continue
    //ctx.rotate(enemy[2]);
    ctx.strokeStyle= `rgba(${Math.floor(Math.random()*125)+50},${Math.floor(Math.random()*125)+50}, ${Math.floor(Math.random()*125)+50},1)`;
    pathEnemy(enemy);
    //ctx.fill();
    ctx.stroke()
  }
  ctx.restore()
  

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


  //draw particles 
  ctx.save();
  ctx.fillStyle= `rgba(${Math.floor(Math.random()*125)+50},${Math.floor(Math.random()*125)+50}, ${Math.floor(Math.random()*125)+50},1)`;
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    if(particle[0]+viewPort[0]<5||particle[0]+viewPort[0]>W-5||particle[1]+viewPort[1]<5||particle[1]+viewPort[1]>H-5) continue
    ctx.beginPath();
    ctx.fillStyle= `rgba(${Math.floor(Math.random()*125)},${Math.floor(Math.random()*125)+100}, ${Math.floor(Math.random()*125)+100},${particle[3]/100})`;
    ctx.arc(particle[0]+viewPort[0], particle[1]+viewPort[1], 2, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // cross  
  ctx.save();
  ctx.lineWidth = 1;
  ctx.translate(coords[0], coords[1]);
  ctx.strokeStyle = "#F952FF";
  hero[5]+=(t*25*(coords[2]*8+1))
  hero[5]%=360
  ctx.translate(-10, -10);
  ctx.beginPath();
  ctx.moveTo(0, 10)
  ctx.lineTo(20, 10)
  ctx.moveTo(10, 0)
  ctx.lineTo(10, 20)
  ctx.closePath();
  ctx.stroke();
  ctx.restore();

  if(DEBUG){
    ctx.save();
    drawQuad(quadTree, ctx);
    ctx.restore()
  }

}

var lastTime;
function loop(t){
  // webgl postprocessing  
  if(DEBUG){
    _fps_.begin();
    _processing_.begin();
    _memory_.begin();
    _enemies_.begin();
  }

  if(!lastTime) lastTime = t;
  dt = (Math.min(100, t-lastTime)/1000);
  lastTime = t;
  frame++;

  // update changes
  update(dt);
  // draw changes 
  ctx.save()
  draw(dt);
  ctx.restore()

  drawPostProcessing(Math.floor(t));

  if(DEBUG){
    _fps_.end();
    _processing_.end();
    _memory_.end();
    _enemies_.end();
    enemiesPanel.update( enemies.length, 1000);
  }
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

function summon(){

setTimeout(function(){
  if(enemies.length>200) return
          enemies.push([Math.floor(Math.random()*mapPixels),Math.floor(Math.random()*mapPixels), 10,10,0, 0, 3, [-10,10,10,-10], [-10,-10,10,10],3,0,0.001])
          insertQuad(enemies[enemies.length-1], quadTree)
          summon()
        }, 100)
}
summon()