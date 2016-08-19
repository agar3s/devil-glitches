/**
* read the last events in game, update world 
*/

var messages = [
 'here we are',
 'we are the sacred geometry',
 'we are perfect',
 'after us. nothing',
 'you cant understand our power',
 'you are in a limited space'
]

var particleZ = Math.PI/2;
var score = 0;
let mapLetters = '0123456789?abcdefghijklmnopqrstuvwxyz .';
var letters = [8767,518,1115,1039,1126,1133,1149,7,1151,1135,5123,1143,5391,57,4367,121,113,1085,1142,4361,30,2672,56,694,2230,63,1139,2111,3187,1133,4353,62,8752,10294,10880,4736,8713,0,16];
var message = 'behold our majesty';
function drawLetter14Segments(letter, x, y, size){
  // *****
  // |\|/|
  // -- --
  // |\|/|
  // *****
  if(letter&1){
    ctx.moveTo(x+2, y-1)
    ctx.lineTo(size+x-2, y-1)
  }
  // ---
  // |\/*
  //  --
  // |\/|
  // ---
  if(letter&2){
    ctx.moveTo(size+x+1, y)
    ctx.lineTo(size+x+1, size+y-1)
  }
  // ---
  // |\/|
  //  --
  // |\/*
  // ---
  if(letter&4){
    ctx.moveTo(size+x+1, size+y+1)
    ctx.lineTo(size+x+1, size*2+y)
  }
  // ---
  // |\/|
  //  --
  // |\/|
  // ***
  if(letter&8){
    ctx.moveTo(x+2, size*2+y+1)
    ctx.lineTo(size+x-2, size*2+y+1)
  }
  // ---
  // |\/|
  //  --
  // *\/|
  // ---
  if(letter&16){
    ctx.moveTo(x-1, y+size+1)
    ctx.lineTo(x-1, y+size*2)
  }
  // ---
  // *\/|
  //  --
  // |\/|
  // ---
  if(letter&32){
    ctx.moveTo(x-1, y)
    ctx.lineTo(x-1, size+y-1)
  }
  // ---
  // |\/|
  //  *-
  // |\/|
  // ---
  if(letter&64){
    ctx.moveTo(x+2, size+y)
    ctx.lineTo(x+size/2-2, size+y)
  }
  // ---
  // |*/|
  //  --
  // |/|\|
  // ---
  if(letter&128){
    ctx.moveTo(x+2, y+2)
    ctx.lineTo(x+size/2-2, size+y-2)
  }
  // -----
  // |\*/|
  // -- --
  // |/|\|
  // -----
  if(letter&256){
    ctx.moveTo(size/2+x, y+2)
    ctx.lineTo(size/2+x, size+y-2)
  }
  // -----
  // |\|*|
  // -- --
  // |/|\|
  // -----
  if(letter&512){
    ctx.moveTo(size/2+x+2, size+y-2)
    ctx.lineTo(size+x-2, y+2)
  }
  // -----
  // |\|/|
  // -- **
  // |/|\|
  // -----
  if(letter&1024){
    ctx.moveTo(size/2+x+2, size+y)
    ctx.lineTo(size+x-2, size+y)
  }
  // -----
  // |\|/|
  // -- --
  // |/|*|
  // -----
  if(letter&2048){
    ctx.moveTo(size/2+x+2, size+y+2)
    ctx.lineTo(size+x-2, size*2+y-2)
  }
  // -----
  // |\|/|
  // -- --
  // |/*\|
  // -----
  if(letter&4096){
    ctx.moveTo(size/2+x, size+y+2)
    ctx.lineTo(size/2+x, size*2+y-2)
  }
  // -----
  // |\|/|
  // -- --
  // |*|\|
  // -----
  if(letter&8192){
    ctx.moveTo(x+2, size*2+y-2)
    ctx.lineTo(size/2+x-2, size+y+2)
  }
}

function update(dt){
  // apply speed to hero movement
  t = dt*hero[2];
  // move depending on keypressed
  if(keyMap&keys[65]){
    hero[0]-=t;
    if(hero[0]<hero[3]/2) hero[0] = hero[3]/2; // hero limit on x left
    if(hero[0]>viewPort[2]&&hero[0]<mapPixels-viewPort[2]) viewPort[0]+=t;
  } 
  if(keyMap&keys[87]){
    hero[1]-=t;
    if(hero[1]<hero[3]/2) hero[1] = hero[3]/2;
    if(hero[1]>viewPort[3]&&hero[1]<mapPixels-viewPort[3]) viewPort[1]+=t;
  }

  if(keyMap&keys[83]){
    hero[1]+=t;
    if(hero[1]>mapPixels - hero[3]/2) hero[1] = mapPixels - hero[3]/2;
    if(hero[1]>viewPort[3]&&hero[1]<mapPixels-viewPort[3]) viewPort[1]-=t;
  }
  if(keyMap&keys[68]){
    hero[0]+=t;
    if(hero[0]>mapPixels - hero[3]/2) hero[0] = mapPixels - hero[3]/2;
    if(hero[0]>viewPort[2]&&hero[0]<mapPixels-viewPort[2]) viewPort[0]-=t;
  }

  hero[4] = getAngle([hero[0]+viewPort[0], hero[1]+viewPort[1]], coords);

  // if fire shots fire
  if(coords[2]&&hero[6]<=0){
    bullets.push([hero[0]+shake(1, 2+hero[7]/30), hero[1]+shake(1, 2+hero[7]/30), hero[4]+shake(1, 0.05+0.001*hero[7])])
    play(fireSound);
    hero[6] = 1/hero[7]; //12bullets per second
  }else{
    hero[6]-=dt
  }

  // update bullets
  bulletsCycle: for (var i = bullets.length-1; i >= 0; i--) {
    var bullet = bullets[i];
    bullet[0] += Math.cos(bullet[2])*t*2; // bullet speed *2
    bullet[1] += Math.sin(bullet[2])*t*2;
    if(bullet[0]<-20||bullet[0]>mapPixels+20||bullet[1]<-20||bullet[1]>mapPixels+20) bullets.splice(i,1);


    for (var j = enemies.length-1; j >=0 ; j--) { 
      
      if(getHypo(bullet[1]-enemies[j][1], bullet[0]-enemies[j][0])>enemies[j][2]+5) continue;
      bullets.splice(i,1);
      // testing
      // enemy hit
      if(--enemies[j][8]>0) continue;
      for (var h = -10; h < 10; h++) {
        particles.push([bullet[0], bullet[1], bullet[2]+particleZ*h*Math.random(), 100])
      }
      enemies.splice(j,1);
      continue bulletsCycle;
    }

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
    if(Math.abs(enemy[2+1]-enemy[3+1])<0.005){
      enemy[3+1] = getAngle(enemy, hero);
      enemy[4+1] = (enemy[3+1]-enemy[2+1])/25;
    }
    enemy[2+1] += enemy[4+1];
    enemy[0] += Math.cos(enemy[2+1])*t*1.4;
    enemy[1] += Math.sin(enemy[2+1])*t*1.4;

    
    if(getHypo(hero[1]-enemy[1], hero[0]-enemy[0])>enemy[2]+10) continue;
    //console.log('die')
    
  }

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
  ctx.rotate(enemy[2+1])
  ctx.moveTo(enemy[5+1][0], enemy[6+1][0]);
  for (var i = 1; i<enemy[5+1].length; i++) {
    ctx.lineTo(enemy[5+1][i], enemy[6+1][i]);
  }
  ctx.closePath();
  ctx.rotate(-enemy[2+1])
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
  ctx.lineWidth = 2;
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

  // ui
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle='#2F2';
  drawWord(score.toFixed(0), 750, 60,16);
  ctx.stroke();
  ctx.strokeStyle='#FFFFFF';
  drawWord(score.toFixed(0), 751, 61,16);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.strokeStyle='#90702F';
  drawWordCenter(message, 401, 501,14);
  ctx.stroke();
  ctx.strokeStyle='#D6AE45';
  drawWordCenter(message, 402, 502,14);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();

}

function drawWord(word, x, y, size){
  for (var i = 0; i < word.length; i++) {
    drawLetter14Segments(letters[mapLetters.indexOf(word[i])], shakeScreen[0]+x-(size+10)*(word.length-i), shakeScreen[1]+y, size);
  }
}
function drawWordCenter(word, x, y, size){
  x += (size+10)*word.length/2
  drawWord(word, x, y, size)
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
  score += dt*1000;

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

var letterIndex = 0;
function summon(){
  letterIndex+=0.1;
  if(letterIndex>=messages.length)
    letterIndex=0;
  message = messages[Math.floor(letterIndex)]
console.log(message)
  setTimeout(function(){
    if(enemies.length>200) return
            enemies.push([500,420, 10,0, 0, 3, [-10,10,10,-10], [-10,-10,10,10],3,0,0.001])
            summon()
          }, 1000)
  }
summon()