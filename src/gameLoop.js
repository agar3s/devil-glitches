/**
* read the last events in game, update world
*/

function die(killer){
  play(heroDie);
  for (var h = -10; h < 10; h++) {
    particles.push([hero[0], hero[1], hero[2]+particleZ*h*Math.random(), 100]);
  }
  heroShape=[[], []]
  gameOver = true;
  sequence1.stop();
  sequence2.stop();
  sequence3.stop();
  sequence4.stop();
  buttons[0][3] = true;
  t = dt*30;
  checkRecord();
}

function drawPointer(){
  ctx.save();
  ctx.lineWidth = 2;
  ctx.translate(coords[0], coords[1]);
  ctx.strokeStyle = "#F952FF";
  ctx.translate(-10, -10);
  crossLine(10,0,20);
  ctx.closePath();
  ctx.restore();
}

function playerUdate(dt){
  
  // apply speed to hero movement
  t = dt*hero[4]*(hero[8]>0?slowMotion:1);
  // move depending on keypressed 
  var speed = dt*hero[4]*(hero[8]>0?1.4:1);
  if(map[Math.round(hero[1]/tileset)]&&map[Math.round(hero[1]/tileset)][Math.round(hero[0]/tileset)]==1){
    speed-=0.5;
  }
  if(keyMap&keys[65]){
    hero[0]-=speed;
    if(hero[0]<hero[2]) hero[0] = hero[2]; // hero limit on x left 
    if(hero[0]>viewPort[2]&&hero[0]<mapPixels-viewPort[2]) viewPort[0]+=speed;
    if(viewPort[0]>32)viewPort[0]=32;
  } 
  if(keyMap&keys[87]){
    hero[1]-=speed;
    if(hero[1]<hero[2]) hero[1] = hero[2];
    if(hero[1]>viewPort[3]&&hero[1]<mapPixels-viewPort[3]) viewPort[1]+=speed;
    if(viewPort[1]>27)viewPort[1]=27;
  }

  if(keyMap&keys[83]){
    hero[1]+=speed;
    if(hero[1]>mapPixels - hero[2]) hero[1] = mapPixels - hero[2];
    if(hero[1]>viewPort[3]&&hero[1]<mapPixels-viewPort[3]) viewPort[1]-=speed;
    if(viewPort[1]<-272)viewPort[1]=-272;
  }
  if(keyMap&keys[68]){
    hero[0]+=speed;
    if(hero[0]>mapPixels - hero[2]) hero[0] = mapPixels - hero[2];
    if(hero[0]>viewPort[2]&&hero[0]<mapPixels-viewPort[2]) viewPort[0]-=speed;
    if(viewPort[0]<-67)viewPort[0]=-67;
  }

  hero[3] = getAngle([hero[0]+viewPort[0], hero[1]+viewPort[1]], coords);

  hero[5]+=(t*25*(coords[2]*8+1))
  hero[5]%=360

  var killer = collideElements(hero);
  if(killer)die(killer);
  // if fire shots fire
  if(coords[2]&&hero[6]<=0&&hero[8]<=0){
    bullets.push([hero[0]+shake(1, 2+hero[7]/30), hero[1]+shake(1, 2+hero[7]/30), 2, hero[3]+shake(1, 0.05+0.001*hero[7])])
    play(fireSounds[~~(Math.random()*fireSounds.length)]);
    hero[6] = 1/hero[7]; //12bullets per second  
  }else{
    hero[6]-=dt;
  }

  if(coords[3]&&hero[8]<=0&&hero[9]<=0){
    play(heroSpeedUp);
    hero[8] = 0.55;
    hero[9] = 1.2;
  }else{
    hero[8]-=dt;
    hero[9]-=dt;
  }
}

function update(dt){

  if(!gameOver) playerUdate(dt);

  // update bullets
  bulletsCycle: for (var i = bullets.length-1; i >= 0; i--) {
    var bullet = bullets[i];
    bullet[0] += Math.cos(bullet[3])*t*bullet[2]; // bullet speed *2
    bullet[1] += Math.sin(bullet[3])*t*bullet[2];
    if(bullet[0]<-20||bullet[0]>mapPixels+20||bullet[1]<-20||bullet[1]>mapPixels+20) bullets.splice(i,1);

    var enemy = collideElements(bullet);
    if(enemy){
      bullets.splice(i,1);
      --enemy[6];
      enemy[4]=200
      if(enemy[5]>5)
      play(hitSounds[~~(Math.random()*hitSounds.length)]);
    }
  }

  //update particles
  for(var i=0;i<particles.length;i++){
    var particle = particles[i];
    particle[0] += Math.cos(particle[2])*(2+Math.random()*3);
    particle[1] += Math.sin(particle[2])*(2+Math.random()*3);
    if(--particle[3]<0) particles.splice(i,1)
  }

  // update enemies 
  spatialhashing = {};
  for (var i = enemies.length-1; i >=0; i--) {
    updateEnemy(enemies[i], i);
  }
  updateTrigger();
  updateSummons();
}

function shake(cond, val){
  return cond?(Math.random()*val*2-val):0;
}

/**
helper function to draw paths. 
*/
function path(xpts, ypts, size){
  ctx.moveTo(xpts[0]*size, ypts[0]*size);
  for (var i = 1; i<xpts.length; i++) {
    ctx.lineTo(xpts[i]*size, ypts[i]*size);
  }
  ctx.lineTo(xpts[0]*size, ypts[0]*size);
}

/**enemies must have colors? */
function getRandomColor(r,r2,g,g2,b,b2,a,a2){
  return 'rgba('+(~~(Math.random()*r)+r2)+','+(~~(Math.random()*g)+g2)+','+(~~(Math.random()*b)+b2)+','+(~~(Math.random()*a)+a2)+')';
}


function draw(t){
  // draw map
  //some random points
  ctx.fillStyle= 'rgba(0,0,0,0.1)';
  ctx.fillRect(0,0,FW, FH);
  ctx.fillStyle = getRandomColor(180,0, 185,0,185,0,0,1);
  for(var i=0;i<6;i++) ctx.fillRect(Math.random()*800, Math.random()*600, 2, 2)
  
  // draw map
  ctx.save()
  ctx.strokeStyle = 'rgb(51,193,178)';
  var gridSize = H/mapSize
  ctx.beginPath();
  shakeScreen = !gameOver?[shake(coords[2], 2), shake(coords[2], 2)]:[0,0];
  ctx.fillStyle = 'rgba(15,12,40,'+ (0.2-(hero[8]>0?0.1:0)) +')';
  ctx.translate(viewPort[0]+shakeScreen[0], viewPort[1]+shakeScreen[1]);
  ctx.fillRect(0, 0, mapPixels, mapPixels);
  //ctx.strokeStyle = 'rgba(190,46,92,0.3)'; 
  //ctx.strokeStyle = 'rgba(50,46,92,0.8)'; 
  setGridColor();
  for(var i = 0; i <= mapSize; i++){
    for(var j = 0; j <4; j+=2){
      crossLine(i*tileset-0.5+j, 0, mapPixels);
    }
  }
  ctx.strokeStyle = 'rgba(200,200,200,0.6)';
  for(var i = 0; i <= mapSize; i++){
    crossLine(i*tileset-0.5, 0, mapPixels);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();

  // draw corruption 
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle='rgba(10,4,10,1)';
  setGridColor(true);
  for (var j = 0; j < mapSize; j++) {
    for (var i = 0; i < mapSize; i++) {
      if(map[j][i]==0) continue;
      ctx.fillRect(i*tileset+viewPort[0]+shakeScreen[0], j*tileset+viewPort[1]+shakeScreen[1], tileset, tileset);
      ctx.strokeRect(i*tileset+viewPort[0]+shakeScreen[0]-0.5, j*tileset+viewPort[1]+shakeScreen[1]-0.5, tileset+2, tileset+2);
      ctx.strokeRect(i*tileset+viewPort[0]+shakeScreen[0]+1.5, j*tileset+viewPort[1]+shakeScreen[1]+1.5, tileset-2, tileset-2);
    }
  }
  ctx.stroke();
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(231,197,11,0.3)';
  for (var j = 0; j < mapSize; j++) {
    for (var i = 0; i < mapSize; i++) {
      if(map[j][i]==0) continue;
      ctx.strokeRect(i*tileset+viewPort[0]+shakeScreen[0]+0.5, j*tileset+viewPort[1]+shakeScreen[1]+0.5, tileset, tileset);
    }
  }
  ctx.fill();
  ctx.closePath();
  ctx.restore();

  // draw summons 
  ctx.save();
  drawSummons();
  ctx.restore();

  // draw hero
  ctx.save();
  ctx.translate(hero[0] + viewPort[0] + shake(coords[2], 1), hero[1] + viewPort[1]+ shake(coords[2], 1));
  ctx.rotate(hero[3]+Math.PI/2);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgb(201,133,187)";
  ctx.beginPath();
  path(heroShape[0], heroShape[1],hero[2]);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();

  // draw enemies
  ctx.save();
  for (var i = 0; i < enemies.length; i++) {
    drawEnemy(enemies[i])
  }
  ctx.closePath();
  ctx.restore();

  // draw bullets 
  ctx.save();
  ctx.fillStyle = 'rgb(40,145,160)';
  for (var i = 0; i < bullets.length; i++) {
    var bullet = bullets[i];
    if(bullet[0]+viewPort[0]<20||bullet[0]+viewPort[0]>W-20||bullet[1]+viewPort[1]<20||bullet[1]+viewPort[1]>H-20) continue
    ctx.beginPath();
    ctx.arc(bullet[0]+viewPort[0], bullet[1]+viewPort[1], bullet[2], 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();


  //draw particles 
  ctx.save();
  ctx.fillStyle = getRandomColor(125,50, 125,50,125,50,0,1);
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    if(particle[0]+viewPort[0]<5||particle[0]+viewPort[0]>W-5||particle[1]+viewPort[1]<5||particle[1]+viewPort[1]>H-5) continue
    ctx.beginPath();
    ctx.fillStyle = getRandomColor(125,0, 125,100,125,100,0,particle[3]/100);
    ctx.arc(particle[0]+viewPort[0], particle[1]+viewPort[1], 2, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // ui 
  ctx.save();
  displayWord(message, 401, 501,14, ['#90702F','#D6AE45']);
  //displayWord(viewPort[0]+' '+viewPort[1], 402, 100,14, '#D6AE45');
  if(gameOver){
    ctx.fillStyle='rgba(0,0,0,0.71)';
    ctx.fillRect(0,0,mapPixels, mapPixels);
    if(newRecord){
      displayWord('-new record-', 400, 240,22, ['#F66','#F6F']);
      displayWord('-share it-', 400, 400,14, ['#F6F','#F6F']);
    }else{
      displayWord('game over', 400, 240,20, ['#FFF','#2FF']);
    }
    displayWord(score.toFixed(0), 400, 160,newRecord?20:16, ['#2F2','#FFF']);
  }else{
    //score
    displayWord(score.toFixed(0), 750, 60,18, ['#2F2','#FFF'],1);
    //record 
    var lrd = score>record?'record':record.toFixed(0);
    displayWord(lrd, 750, 110,9, ['#F22','#FFF'],1);
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
    _enemies_.begin();
  }

  if(!lastTime) lastTime = t;
  dt = (Math.min(100, t-lastTime)/1000);
  lastTime = t;
  frame++;

  // update changes 
  if(splashScreen)updateSplash(dt);
  else if(GLITCHS[6]<0)update(dt);
  //update buttons
  updateButtons();

  // draw changes 
  ctx.save();
  // draw game
  if(splashScreen)drawSplash()
  else draw(dt);
  // draw buttons
  drawPointer();
  ctx.save();
  drawButtons();
  ctx.restore();
  
  if(fade>0){
    fade+=0.05;
    if(fade==0.51)play(gameStarts);
  }
  if(fade>1){
    splashScreen=false;
    fade=0;
    init();
  }
  if(fade>0&&fade<1){
    ctx.fillStyle= 'rgba(220,220,220,'+fade+')';
    ctx.fillRect(0,0,FW, FH);
  }

  ctx.restore();

  drawPostProcessing(~~(t));
  if(!gameOver&&!splashScreen) score += dt*1000*(hero[8]>0?slowMotion:1);

  if(DEBUG){
    _fps_.end();
    _processing_.end();
    _memory_.end();
    _enemies_.end();
    enemiesPanel.update(enemies?enemies.length:0, 1000);
  }
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
