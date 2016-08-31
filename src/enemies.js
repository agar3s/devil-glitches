var necronomicon = [
// normal enemies 
//size, angle, summonTime, type, hits, xpoints, ypoints, customData:angleTarget, customData: angleMomentum, anglediff, speed
// 0: basic square
[10,    0,     0,          0,    2, [-1,1,1,-1], [-1,-1,1,1],                 0, 3,0.1,1.1],
// 1: simple killer
[15,    0,     0,          1,    5, [1,0.3,0,-2,0,0.3], [0,1,0.3,0,-0.3,-1], 0, 3,0.05,0.8],
// 2: follower 
[8,    0,     0,           2,    2, [1,0.25,-1,0.25],[0,-0.5,0,0.5],0, 3.5,0.15,1.6],
// 3: heavy killer
[20,    0,     0,          3,    12, [0,0.25,0.75,0.75,1,0.75,0.75,0.25,0,-0.25,-0.75,-0.75,-1,-0.75,-0.75,-0.25], [-1,-0.75,-0.75,-0.25,0,0.25,0.75,0.75,1,0.75,0.75,0.25,0,-0.25,-0.75,-0.75], 0, 1,0.12,1.05],
//4: guardian
[12,    0,     0,          4,    5, [0,0.25,1,0.25,0,-0.25,-1,-0.25], [-1,-0.25,0,0.25,1,0.25,0,-0.25],                 0, 3,0.03,2.5, 0,0,100], // last two parameters, x y to turnon radiis
//5: bullet basic triangle
[3,    0,     0,          5,    150, [1,-1,-1], [0,1,-1],0, 0,0,1.4], // last two parameters, x y to turnon radiis
// spawners 6
//size, angle, summonTime, type, hits, xpoints, ypoints, customData:nextInvocation, corruptionPower, corruptionRatio
//pyramid solid
[tileset/2, 0, 0, 6, 8, [[-1,0,0],[0,0,1],[-1,1,0]], [[-1.5,-0.5,0.5],[-0.5,0.5,-1.5],[-1.5,-1.5,-0.5]], 1, 0,7],
//cube solid 
[tileset/2, 0, 0, 7, 11, [[-1,0,0,-1],[1,0,0,1],[-1,0,1,0],[-1,0,1,0],[-1,0,0,-1],[1,0,0,1]], [[-1.25,-0.5,0.8,0.25],[-1.25,-0.5,0.8,0.25],[-1.25,-0.5,-1.25,-1.8],[0.25,-0.5,0.25,0.8],[0.25,-0.5,-1.8,-1.25],[0.25,-0.5,-1.8,-1.25]], 0.9, 0,6],
//prism solid 
[tileset*0.8, 0, 0, 8, 16, [[-0.5,0,0.5,0],[-0.5,0,0],[0.5,0,0],[-0.5,0,0],[0.5,0,0]], [[-0.75,-1,-0.75,-0.5],[-0.75,-0.5,0.25],[-0.75,-0.5,0.25],[-0.75,-1.75,-0.5],[-0.75,-1.75,-0.5]], 0.9, 0,4,0.004],
// st
[tileset*1.5, 0, 0, 9, 80, [[0,-0.75,0],[0,0.75,0],[-0.75,0.75,0],[-0.75,0.75,0],[-0.35,0.35,0]], [[-1,0.5,0],[-1,0.5,0],[0.5,0.5,0],[-0.5,-0.5,1],[0.25,0.25,-0.5]], 0.9, 0,4,0.1]
]

// values: x, y, type
function createEnemy(values){
  var enemy = values.slice(0,2).concat(necronomicon[values[2]].slice(0));

  if(enemy[5]>=8){
    for (var j = 0; j<6; j++) {
      var newEnemy = createEnemy([enemy[0]+Math.cos(Math.PI*j/3)*10,enemy[1]+Math.sin(Math.PI*j/3)*10, 4])
      newEnemy[13] = enemy;
      newEnemy[9] = getAngle(newEnemy, enemy); 
      newEnemy[3] = newEnemy[9]+enemy[11];
      newEnemy[15]=0;
      newEnemy[16]=0;
      enemies.push(newEnemy);
    }
  }
// for (var j = 0; j<12; j++) { for the last enemy 
//var newEnemy = createEnemy([enemy[0]+Math.cos(Math.PI*2*j/12+0.1)*10,enemy[1]+Math.sin(Math.PI*2*j/12+0.1)*10, 4])
  return enemy;
}

//draw methods 

function drawFace(xPath, yPath, size, index){
  ctx.beginPath();
  var value = 125-index*20;
  ctx.fillStyle = 'rgba(80,80,130,0.4)';
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

function pathTotem(totem){

  for (var i = 0; i < totem[7].length; i++) {
    drawFace(totem[7][i], totem[8][i], totem[2], i);
  }
}

function drawEnemy(enemy){
  if(enemy[0]+viewPort[0]<20||enemy[0]+viewPort[0]>W-20||enemy[1]+viewPort[1]<20||enemy[1]+viewPort[1]>H-20) return;
  //ctx.rotate(enemy[2]);  
  var offsetX = enemy[0]+viewPort[0]+shakeScreen[0]; // 20 /2 width/2
  var offsetY = enemy[1]+viewPort[1]+shakeScreen[1]; // 
  ctx.translate(offsetX, offsetY)
  ctx.beginPath();
  if(enemy[5]<6){
    ctx.strokeStyle = 'rgba(185,185,114,0.6)';
    ctx.lineWidth = 3;
    pathEnemy(enemy);
  }else{
    ctx.strokeStyle='rgba(126,129,181,1)';
    ctx.lineWidth = 2;
    pathTotem(enemy);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.translate(-offsetX, -offsetY)
}

var spawns = {
  '6': function(enemy){
    for (var j = 0; j<9; j++) {
      if(j==4) continue;  //summon especial 
      var newEnemy = createEnemy([enemy[0]+(j%3-1)*tileset,enemy[1]+(Math.floor(j/3)-1)*tileset, j==1?1:0])
      enemies.push(newEnemy);
    }
    enemy[9]=2800;  // time to summon again 
  },
  '7': function(enemy){
    for (var j = 0; j<12; j++) {
      if(j==4) continue;  //summon especial  
      var newEnemy = createEnemy([enemy[0]+(j%3-1)*tileset,enemy[1]+(Math.floor(j/3)-1)*tileset, j==1?3:2])
      if(j==1) bigKiller = newEnemy;
      enemies.push(newEnemy);
    }
    enemy[9]=2600;
  },
  '8': function(enemy){ // 
    for (var i = 0; i < 2; i++) {
      var newEnemy = createEnemy([enemy[0],enemy[1], 5])
      newEnemy[9] = enemy[3]+i*Math.PI;
      enemies.push(newEnemy);
    }
    enemy[9]=60; //crazy  0.3 
  },
  '9': function(enemy){
    
    for (var i = 0; i < 8; i++) {
      var newEnemy = createEnemy([enemy[0],enemy[1], 5])
      newEnemy[9] = enemy[3]+(i-4)*Math.PI/4;
      enemies.push(newEnemy);
    }

      enemy[9]=32; //crazy  0.3   
    //enemy[12]-=0.0003; 
  }
}

// update methods 
function updateEnemy(enemy,index){
  // have zero life
  if(enemy[6]<=0){
    enemies.splice(index,1);
    if(enemy[5]==5) return;
    for (var h = -10; h < 10; h++) {
      particles.push([enemy[0], enemy[1], enemy[2]+particleZ*h*Math.random(), 100]);
    }
    if(enemy[5]>5){
      removeCorruption(enemy[0], enemy[1], enemy[10]);
      play(totemDestroyed);
    }else{
      play(enemyDie);
    }
    return;
  }

  // miniom
  if(enemy[5]<6){
    if(enemy[10]*(enemy[9]-enemy[3])>0){
      if(enemy[5]==2){//follower
        enemy[3] = getAngle(enemy, bigKiller);
      }else if(enemy[5]==5){

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
    }
    else if(enemy[5]!=3||(otherEnemy&&otherEnemy[5]==3)){  // type 3 dont collide with followers and collide with himself
      enemy[9] +=(otherEnemy?-1:1)*enemy[10];
    }else{
      enemy[9] +=enemy[10];
    }
    
    if(enemy[5]==5){
      enemy[6]-=t/10;
    }

    if(enemy[5]!=4){
      enemy[0] += Math.cos(enemy[9])*t*enemy[12];
      enemy[1] += Math.sin(enemy[9])*t*enemy[12];
    }else{
      // guardians moves
      enemy[16]+=t/200;
      enemy[15] = tileset*2*(Math.sin(enemy[16])+1.2);
      enemy[0] = enemy[13][0]+Math.cos(enemy[9])*enemy[15];
      enemy[1] = enemy[13][1]+Math.sin(enemy[9])*enemy[15];
    }

  // spawner 
  }else{
    enemy[9]-=t;
    if(enemy[5]>=8)enemy[3]+=enemy[12]*t;
    if(enemy[5]==9){
      enemy[0]+= t*Math.cos(enemy[3]/30);
      enemy[1]+= t*Math.sin(enemy[3]/30);
    }
    if(enemy[9]<0){
      spawns[enemy[5]](enemy);
    }
    enemy[10]+=dt*enemy[11];
    corruptZone(enemy[0], enemy[1], enemy[10]);
  }
  addItem(enemy);
}
