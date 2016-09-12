var necronomicon = [
// normal enemies 
//size, angle, summonTime, type, hits, xpoints, ypoints, customData:angleTarget, customData: angleMomentum, anglediff, speed
// 0: basic square
[15,    0,     0,          0,    1, [1,0.25,-1,0.25],[0,-0.75,0,0.75],                 0, 3,0.1,1.1],
// 1: simple killer
[15,    0,     0,          1,    4, [1,0.3,0,-2,0,0.3], [0,1,0.3,0,-0.3,-1], 0, 3,0.05,0.8],
// 2: follower 
[8,    0,     0,           2,    2, [1,0.25,-1,0.25],[0,-0.5,0,0.5],0, 3.5,0.15,1.6],
// 3: heavy killer
[20,    0,     0,          3,    9, [0,0.25,0.75,0.75,1,0.75,0.75,0.25,0,-0.25,-0.75,-0.75,-1,-0.75,-0.75,-0.25], [-1,-0.75,-0.75,-0.25,0,0.25,0.75,0.75,1,0.75,0.75,0.25,0,-0.25,-0.75,-0.75], 0, 1,0.12,1.05],
//4: guardian
[12,    0,     0,          4,    5, [0,0.25,1,0.25,0,-0.25,-1,-0.25], [-1,-0.25,0,0.25,1,0.25,0,-0.25],                 0, 3,0.03,2.5, 0,0,0], // last two parameters, x y to turnon radiis
//5: bullet basic triangle
[3,    0,     0,           5,    150, [1,-1,-1], [0,1,-1],0, 0,0,1.4], // last two parameters, x y to turnon radiis
//6: totem seed - countdown=13 
[16,   0,     0,           6,    9, [1,0.25,-1,0.25],[0,-0.75,0,0.75], 0,0,0,0.6,3.5],
//7: totem seed - countdown=13 
[18,   0,     0,           7,    8, [1,0.25,-1,0.25],[0,0.75,0,-0.75], 0,0,0,0.8,2.5],
//8: nothing decided
[20,   0,     0,           8,   7, [1,0.25,-1,0.25],[0,0.75,0,-0.75], 0,0,0,1.2,1.5],
//9: nothing decided 
,
// spawners 10 -- por si acaso
//size, angle, hitEffect, type, hits, xpoints, ypoints, customData:nextInvocation, corruptionPower, corruptionRatio
//pyramid solid
[tileset/2, 0, 0, 10, 9, [[-1,0,0],[0,0,1],[-1,1,0]], [[-1.5,-0.5,0.5],[-0.5,0.5,-1.5],[-1.5,-1.5,-0.5]], 100, 0,7],
//cube solid 
[tileset/2, 0, 0, 11, 10, [[-1,0,0,-1],[1,0,0,1],[-1,0,1,0],[-1,0,1,0],[-1,0,0,-1],[1,0,0,1]], [[-1.25,-0.5,0.8,0.25],[-1.25,-0.5,0.8,0.25],[-1.25,-0.5,-1.25,-1.8],[0.25,-0.5,0.25,0.8],[0.25,-0.5,-1.8,-1.25],[0.25,-0.5,-1.8,-1.25]], 100, 0,6],
//prism solid 
[tileset*0.8, 0, 0, 12, 15, [[-0.5,0,0.5,0],[-0.5,0,0],[0.5,0,0],[-0.5,0,0],[0.5,0,0]], [[-0.75,-1,-0.75,-0.5],[-0.75,-0.5,0.25],[-0.75,-0.5,0.25],[-0.75,-1.75,-0.5],[-0.75,-1.75,-0.5]], 0.9, 0,4,0.004],
// st
[tileset*1.2, 0, 0, 13, 50, [[0,-0.75,0],[0,0.75,0],[-0.75,0.75,0],[-0.75,0.75,0],[-0.35,0.35,0]], [[-1,0.5,0],[-1,0.5,0],[0.5,0.5,0],[-0.5,-0.5,1],[0.25,0.25,-0.5]], 0.9, 0,13,0.1],
// flower of fucking life - summon counter=13 
[tileset*2.5, 0, 0, 14, 200, [], [], 0.9, 0,60,0.003, 1,0,[6,7,6,7,8]]
];

var invocationTimes={
  10: 2800,
  11: 2600,
  12: 60,
  13:200
}

var totemDieShakes = 0;

function summonGuardian(enemy, j){
  var newEnemy = createEnemy([enemy[0]+Math.cos(Math.PI*j/3)*10,enemy[1]+Math.sin(Math.PI*j/3)*10, 4])
  newEnemy[13] = enemy;
  newEnemy[9] = getAngle(newEnemy, enemy); 
  newEnemy[3] = newEnemy[9]+enemy[11];
  newEnemy[15]=0;
  newEnemy[16]=0;
  enemies.push(newEnemy);
}

// values: x, y, type
function createEnemy(values){
  var enemy = values.slice(0,2).concat(necronomicon[values[2]].slice(0));

  if(enemy[5]==12||enemy[5]==14){
    for (var j = 0; j<6; j++) {
      summonGuardian(enemy, j);
    }
  }
// for (var j = 0; j<12; j++) { for the last enemy 
// var newEnemy = createEnemy([enemy[0]+Math.cos(Math.PI*2*j/12+0.1)*10,enemy[1]+Math.sin(Math.PI*2*j/12+0.1)*10, 4])
  return enemy;
}

//draw methods 

function drawFace(xPath, yPath, size, index, color){
  ctx.beginPath();
  var value = 125-index*20;
  setContextAtrribute(-1,1,'rgba('+color+')');
  path(xPath, yPath,size)
  ctx.closePath();
  ctx.fill()
  ctx.stroke()
}

function pathEnemy(enemy){
  ctx.rotate(enemy[9])
  path(enemy[7], enemy[8], enemy[2])
  //ctx.strokeRect(enemy[7][0], enemy[8][1], enemy[2]*2, enemy[2]*2)  
  ctx.rotate(-enemy[9])
}
var flowerOfpoints = [];
for (var i = 0; i < 6; i++) {
  var angle = (i-3)*Math.PI/3+Math.PI/6;
  var x = Math.cos(angle);
  var y = Math.sin(angle);
  flowerOfpoints.push(x,y);
}
function drawFlowerOfLife(enemy){
  var color = 'hsla('+enemy[3]*20+',50%,60%, 0.5)';
  setContextAtrribute(-1,2,2);
  ctx.beginPath();
  setContextAtrribute(-1,0,enemy[4]>0?colors[3]:color);
  var relativeSize = enemy[2]/3.5;
  ctx.arc(0,0, relativeSize/2, 0, Math.PI*2, false);
  ctx.stroke();
  ctx.beginPath();
  ctx.bezierCurveTo(-relativeSize, 0, 0, -relativeSize, relativeSize, 0);
  ctx.bezierCurveTo(relativeSize, 0, 0, relativeSize, -relativeSize, 0);
  ctx.stroke(); 
  ctx.rotate(enemy[3]);
  for (var i = 0; i < 6; i++) {
    var x= flowerOfpoints[i*2];
    var y= flowerOfpoints[i*2+1]
    var angle = (i-3)*Math.PI/3;
    ctx.beginPath(); 
    ctx.arc(4*x*relativeSize,4*y*relativeSize, relativeSize, 0, Math.PI*2, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(2*x*relativeSize,2*y*relativeSize, relativeSize, 0, Math.PI*2, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x*relativeSize*4,y*relativeSize*4);
    ctx.lineTo(relativeSize*4*flowerOfpoints[(i*2+2)%12],relativeSize*4*flowerOfpoints[(i*2+3)%12]);
    ctx.lineTo(relativeSize*4*flowerOfpoints[(i*2+6)%12],relativeSize*4*flowerOfpoints[(i*2+7)%12]);
    ctx.moveTo(x*relativeSize*2,y*relativeSize*2);
    ctx.lineTo(relativeSize*2*flowerOfpoints[(i*2+2)%12],relativeSize*2*flowerOfpoints[(i*2+3)%12]);
    ctx.lineTo(relativeSize*2*flowerOfpoints[(i*2+6)%12],relativeSize*2*flowerOfpoints[(i*2+7)%12]);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.rotate(-enemy[3]);

}

// greater the percentage blink fast
function blink(percentage, i){
  if(percentage>0.99) return 1;
  var value = percentage*100;
  var umbral = 1/(percentage);
  return value%(umbral)>(umbral/2)?1:0;
}
var blinkValues={};
for (var i = 0; i < 10000; i++) {
  blinkValues[(i/10000).toFixed(4)] = blink(i/10000, i)
}

function pathTotem(totem){
  var loading = (invocationTimes[totem[5]]-totem[9])/invocationTimes[totem[5]];
  var green = totem[4]>0?-55:~~(200*loading)*blinkValues[loading.toFixed(4)];
  //setContextAtrribute(totem[4]>0?15:green==0?16:17)
  setContextAtrribute(16)
  for(var i = 0; i < totem[7].length; i++){
    drawFace(totem[7][i], totem[8][i], totem[2], i, [80+totem[4],55+green,130+~~(green/2),totem[4]>0?0.9:0.2]);
  }
}

function drawEnemy(enemy){
  if(enemy[0]+viewPort[0]<20||enemy[0]+viewPort[0]>W-20||enemy[1]+viewPort[1]<20||enemy[1]+viewPort[1]>H-20) return;
  var offsetX = enemy[0]+viewPort[0]+shakeScreen[0]+randomSign()*enemy[4]/40; // 20 /2 width/2
  var value = (enemy[5]>9?Math.sin((frame/50)%(Math.PI*2))*5+5:0);
  var offsetY = enemy[1]+viewPort[1]+shakeScreen[1]+randomSign()*enemy[4]/40-value;
  ctx.translate(offsetX, offsetY);
  ctx.beginPath();
  if(enemy[5]<10){
    setContextAtrribute(enemy[5]+24);//temporal
    //setContextAtrribute(-1,0,'hsla('+enemy[5]*36+',50%,60%,0.8)');
    setContextAtrribute(-1,2,2);
    pathEnemy(enemy);
  }else if(enemy[5]==14){
    drawFlowerOfLife(enemy,1);
  }else {
    setContextAtrribute(-1,2,2);
    pathTotem(enemy);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.translate(-offsetX, -offsetY)
}

var spawns = {
  10: function(enemy){
    for (var j = 0; j<9; j++) {
      if(j==4) continue;  //summon especial
      var x = enemy[0]+(j%3-1)*tileset;
      var y = enemy[1]+(~~(j/3)-1)*tileset;
      scheduleSummon(x,y,0.65,[x,y,j==1?1:0]);
      //var newEnemy = createEnemy([enemy[0]+(j%3-1)*tileset,enemy[1]+(~~(j/3)-1)*tileset, j==1?1:0])
      //enemies.push(newEnemy);
    }
    enemy[9]=invocationTimes[10];  // time to summon again 
  },
  11: function(enemy){
    for (var j = 0; j<12; j++) {
      if(j==4) continue;  //summon especial
      var x = enemy[0]+(j%3-1)*tileset;
      var y = enemy[1]+(~~(j/3)-1)*tileset;
      scheduleSummon(x,y,0.65,[x,y,j==1?3:2])

      //if(j==1) bigKiller = newEnemy;
      //enemies.push(newEnemy);
    }
    enemy[9]=invocationTimes[11];
  },
  12: function(enemy){ // 
    for (var i = 0; i < 2; i++) {
      var newEnemy = createEnemy([enemy[0],enemy[1], 5])
      newEnemy[9] = enemy[3]+i*Math.PI;
      enemies.push(newEnemy);
    } 
    enemy[9]=invocationTimes[12]; //crazy  0.3
  },
  13: function(enemy){
    for (var i = 0; i < 6; i++) {
      var newEnemy = createEnemy([enemy[0],enemy[1], 5])
      newEnemy[9] = enemy[3]+(i-3)*Math.PI/3;
      newEnemy[12]+=0.5;
      enemies.push(newEnemy);
    }
    enemy[9]=45;
  },
  14:function(enemy){
    for (var i = 0; i < 6; i++) {
      var newEnemy = createEnemy([enemy[0],enemy[1], 5])
      newEnemy[9] = enemy[3]+(i-3)*Math.PI/3+Math.PI/6;
      newEnemy[12]-=0.6;
      enemies.push(newEnemy);
    } 
    if(enemy[13]%16==0){
      var newEnemy = createEnemy([enemy[0],enemy[1], enemy[15][enemy[14]%enemy[15].length]]);
      newEnemy[9] = enemy[3]/2;
      enemies.push(newEnemy);
      enemy[14]++;
    }
    if(enemy[13]%100==0){
      for (var j = 0; j<6; j++) {
        summonGuardian(enemy, j);
      }
    }
    enemy[9]=70; 
    enemy[13]++;
  }
}

// update methods   
function updateEnemy(enemy,index){
  // have zero life
  if(enemy[6]<=0){
    enemies.splice(index,1);
    if(enemy[5]==5) return;
    if(enemy[5]==14){
      bannerEndMessage = true;
    }
    createParticles(enemy[0], enemy[1], enemy[2], necronomicon[enemy[5]][0],necronomicon[enemy[5]][0]*2,enemy[5]+24);
    if(enemy[5]>9){
      removeCorruption(enemy[0], enemy[1], enemy[10]);
      totemDieShakes=4;
      play(totemDestroyed);
    }else{
      play(enemyDie);
    }
    return;
  }

  if(enemy[4]>0){
    enemy[4]-=50;
  }
  // miniom
  if(enemy[5]<10){
    if(enemy[10]*(enemy[9]-enemy[3])>0){
      if(enemy[5]==2){//follower 
        enemy[3] = getAngle(enemy, bigKiller||[0,0]);
      }else if(enemy[5]==4){
        enemy[3]+=enemy[9]+enemy[11];
      }else{
        enemy[3] = getAngle(enemy, hero);
      }
      enemy[10] = enemy[3]>enemy[9]?enemy[11]:-enemy[11];
    }

    var otherEnemy = collideElements(enemy);
    if(enemy[5]==4){
      enemy[9] +=enemy[10]*t;
    }else if(enemy[5]!=3||(otherEnemy&&otherEnemy[5]==3)){  //type 3 dont collide with followers and collide with himself
      enemy[9] +=(otherEnemy?-1:1)*enemy[10];
    }else{
      enemy[9] +=enemy[10];
    }
    
    if(enemy[5]==5){
      enemy[6]-=t/10;
    }

    if(enemy[5]>5&&enemy[5]<10){
      enemy[13]-=dt;
      if(enemy[13]<0){ 
        var coords = [(~~(enemy[0]/tileset)+0.5)*tileset, (~~(enemy[1]/tileset)+0.5)*tileset,enemy[5]+4];
        scheduleSummon(coords[0], coords[1], 1, coords);
        enemies.splice(index,1);
        return;
      }
    }

    if(enemy[5]!=4){
      enemy[0] += Math.cos(enemy[9])*t*enemy[12];
      enemy[1] += Math.sin(enemy[9])*t*enemy[12];
    }else{
      // guardians moves
      if(enemy[13][6]<1){
        enemy[10]*=0.99;
      }
      enemy[15] = tileset*2*(-Math.cos(enemy[16])+1.2);
      enemy[16]+=t/200;
      enemy[0] = enemy[13][0]+Math.cos(enemy[9])*enemy[15];
      enemy[1] = enemy[13][1]+Math.sin(enemy[9])*enemy[15];
    }

  // spawner
  }else{
    enemy[9]-=t;
    if(enemy[5]>=12)enemy[3]+=enemy[12]*t;
    if(enemy[9]<0&&!gameOver){
      spawns[enemy[5]](enemy);
    }
    enemy[10]+=dt*enemy[11];
    corruptZone(enemy[0], enemy[1], enemy[10]);
  }
  addItem(enemy);
}
