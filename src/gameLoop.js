/**
* read the last events in game, update world
*/

function die(killer){
  play(heroDie);
  createParticles(hero[0], hero[1], hero[2], 10, 80,6);
  heroShape=[[], []]
  gameOver = true;
  sequence1.stop();
  sequence2.stop();
  sequence3.stop();
  sequence4.stop();
  buttons[0][3] = true;
  t = dt*30;
  checkRecord();
  frame=0;
}

function drawPointer(){
  ctx.save();
  ctx.beginPath();
  setContextAtrribute(-1,2,2);
  ctx.translate(coords[0], coords[1]);
  setContextAtrribute(6);
  ctx.translate(-10, -10);
  crossLine(10,0,20);
  ctx.stroke();
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
    play(fireSounds[~~(getRandomValue(fireSounds.length))]);
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
      if(--enemy[6]>0){
        createParticles(bullet[0], bullet[1], -bullet[3], 2,10,9);
      }
      bullets.splice(i,1);
      enemy[4]=200
      if(enemy[5]>9)
      play(hitSounds[~~(getRandomValue(hitSounds.length))]);
    }
  }

  //update particles
  for(var i=0;i<particles.length;i++){
    var particle = particles[i];
    particle[0] += Math.cos(particle[2])*getRandomValue(3,2);
    particle[1] += Math.sin(particle[2])*getRandomValue(3,2);
    if(--particle[3]<0) particles.splice(i,1)
  }

  // update enemies 
  if(totemDieShakes>0)totemDieShakes-=0.1;
  spatialhashing = {};
  for (var i = enemies.length-1; i >=0; i--) {
    updateEnemy(enemies[i], i);
  }
  updateTrigger();
  updateSummons();
}

function shake(cond, val){
  return cond?getRandomValue(val*2,-val):0;
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

function createParticles(x, y, angle, many, life, color){
  for (var h = -many; h < many; h++) {
    particles.push([x, y, getRandomValue(particleZ*h,angle), life||60, color]);
  }
}


function draw(t){
  // draw map
  //some random points 
  setContextAtrribute(7,1);
  ctx.fillRect(0,0,FW, FH);
  setRandomColor(180,0, 185,0,185,0,0,1);
  for(var i=0;i<6;i++)
    ctx.fillRect(~~(getRandomValue(800)), ~~(getRandomValue(600)), 2, 2);
  
  // draw map 
  ctx.save()
  var gridSize = H/mapSize
  ctx.beginPath();
  shakeScreen = !gameOver?[shake(coords[2]||totemDieShakes>0, totemDieShakes+2), shake(coords[2]||totemDieShakes>0, totemDieShakes+2)]:[0,0];
  setContextAtrribute(-1,1,'rgba(7,8,12,'+ (0.2-(hero[8]>0?0.1:0)) +')');
  ctx.translate(viewPort[0]+shakeScreen[0], viewPort[1]+shakeScreen[1]);
  ctx.fillRect(0, 0, mapPixels, mapPixels);

  setContextAtrribute(1);
  ctx.beginPath();
  for(var i = 0; i <= mapSize; i++){
    crossLine(i*tileset-0.5, 0, mapPixels);
  }
  ctx.stroke();
  ctx.beginPath();
  setContextAtrribute(5);
  for(var i = 0; i <= mapSize; i++){
    crossLine(i*tileset+0.5, 0, mapPixels);
  }
  ctx.stroke();
  ctx.restore();

  // draw corruption 
  ctx.save();
  ctx.beginPath();
  setContextAtrribute(8,1);  //fillstyle
  setContextAtrribute(2);    //stroke style
  for (var j = 0; j < mapSize; j++) {
    for (var i = 0; i < mapSize; i++) {
      if(map[j][i]==0) continue;
      ctx.fillRect(i*tileset+viewPort[0]+shakeScreen[0], j*tileset+viewPort[1]+shakeScreen[1], tileset, tileset);
      ctx.strokeRect(i*tileset+viewPort[0]+shakeScreen[0]-0.5, j*tileset+viewPort[1]+shakeScreen[1]-0.5, tileset+2, tileset+2);
      //ctx.strokeRect(i*tileset+viewPort[0]+shakeScreen[0]+1.5, j*tileset+viewPort[1]+shakeScreen[1]+1.5, tileset-2, tileset-2);
    }
  }
  ctx.stroke();
  ctx.beginPath();
  setContextAtrribute(2);
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
  ctx.translate(hero[0] + viewPort[0], hero[1] + viewPort[1]);
  ctx.rotate(hero[3]+Math.PI/2);
  // strokeWidth to 3
  setContextAtrribute(-1,2,2);
  // strokeStyle to colors[6]
  setContextAtrribute(6);
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
  setContextAtrribute(9,1);//fill
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
  //setRandomColor(125,50, 125,50,125,50,0,1);
//  setContextAtrribute(1)
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    if(particle[0]+viewPort[0]<5||particle[0]+viewPort[0]>W-5||particle[1]+viewPort[1]<5||particle[1]+viewPort[1]>H-5) continue
    ctx.beginPath();
    //ctx.globalAlpha = particle[3]/100;
    setContextAtrribute(particle[4],1);
    //setRandomColor(125,particle[4], 125,particle[5],125,particle[6],0,particle[3]/100);
    ctx.arc(particle[0]+viewPort[0]+shakeScreen[0], particle[1]+viewPort[1]+shakeScreen[1], 2, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // ui 
  ctx.save();
  displayWord(message, 401, 501,14, [26,21,21]);
  //displayWord(viewPort[0]+' '+viewPort[1], 402, 100,14, '#D6AE45');
  if(gameOver){
    setContextAtrribute(22,1);
    ctx.fillRect(0,0,mapPixels, mapPixels);
    if(godMode){
      displayWord('evil mode', 400, 80,22, [0,16]);
    }
    if(newRecord){
      displayWord('-new record-', 400, 240,22, [10,18]);
      displayWord('-share it-', 400, 400,14, [24,18]);
    }else{
      displayWord('game over', 400, 240,20, [0,13]);
    }
    displayWord(score.toFixed(0), 400, 160,newRecord?20:16, [0,9]);
  }else{
    //wave 
    displayWord(wave>6?'evil':(wave+'/6'), 400, 60,9, [0,3]);
    //score 
    displayWord(score.toFixed(0), 750, 60,18, [32,9],1);
    //record 
    var lrd = score>record?'record':record.toFixed(0);
    displayWord(lrd, 750, 110,9, [24,3],1);
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
  else if(bannerEndMessage)updateEnds();
  else if(GLITCHS[6]<0)update(dt);

  if(splashScreen||gameOver){
    switch(frame){
      case 240:
      case 280:
      case 500:
      randomGlitch();
      play(openingGlitch);
      break;
      case 700:
      frame=0;
      break;
    }
  }

  //update buttons
  updateButtons();

  // draw changes 
  ctx.save();
  // draw game
  if(splashScreen)drawSplash();
  else if(!bannerScreen) draw(dt);

  // draw buttons 
  if(!bannerScreen&&!bannerEndMessage)drawPointer();
  ctx.save();
  drawButtons();
  ctx.restore();
  if(bannerScreen)drawBanner();
  else if(bannerEndMessage)drawBannerEnds();
  
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
    setContextAtrribute(-1,1,'rgba(220,220,220,'+fade+')');
    ctx.fillRect(0,0,FW, FH);
  }
  bannerScreen = bannerCounter>0;
  if(bannerScreen){
    bannerCounter-=1;
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
