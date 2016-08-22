var necronomicon = [
// normal enemies 
//size, angle, summonTime, type, hits, xpoints, ypoints, customData:angleTarget, customData: angleMomentum, anglediff, speed
// 0: basic square
[10,    0,     0,          0,    2, [-1,1,1,-1], [-1,-1,1,1],                 0, 3,0.1,1.2],
// 1: other guy 
[15,    0,     0,          0,    6, [1,0.3,0,-2,0,0.3], [0,1,0.3,0,-0.3,-1], 0, 3,0.05,0.8],
,
,
,
,
// spawners
//size, angle, summonTime, type, hits, xpoints, ypoints, customData:nextInvocation
//basic totem pyramid solid
[tileset/2, 0, 0, 6, 15, [[-1,0,0],[0,0,1],[-1,1,0]], [[-1.5,-0.5,0.5],[-0.5,0.5,-1.5],[-1.5,-1.5,-0.5]], 1]
]

// values: x, y, type
function createEnemy(values){
  return values.slice(0,2).concat(necronomicon[values[2]].slice(0))
}

//draw methods

function drawFace(xPath, yPath, size, index){
  ctx.beginPath();
  var value = 125-index*20;
  ctx.fillStyle = getRandomColor(value,50, value,50,value,50,0,1);
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
  if(enemy[5]<5){
    ctx.strokeStyle = getRandomColor(125,50, 125,50,125,50,0,1);
    ctx.lineWidth = 3;
    pathEnemy(enemy);
  }else{
    ctx.strokeStyle = '#07000A';
    ctx.lineWidth = 1;
    pathTotem(enemy);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.translate(-offsetX, -offsetY)
}


// update methods
function updateEnemy(enemy,index){
  // have zero life
  if(enemy[6]<=0){
    enemies.splice(index,1);
    for (var h = -10; h < 10; h++) {
      particles.push([enemy[0], enemy[1], enemy[2]+particleZ*h*Math.random(), 100])
    }
    return;
  }

  // miniom  
  if(enemy[5]<5){
    if(enemy[10]*(enemy[9]-enemy[3])>0){
      enemy[3] = getAngle(enemy, hero);
      enemy[10] = enemy[3]>enemy[9]?enemy[11]:-enemy[11];
    }

    var otherEnemy = collideElements(enemy);
    enemy[9] +=(otherEnemy?-1:1)*enemy[10];

    enemy[0] += Math.cos(enemy[9])*t*enemy[12];
    enemy[1] += Math.sin(enemy[9])*t*enemy[12];

  // spawner
  }else{
    enemy[9]-=dt;

    if(enemy[9]<0){
      for (var j = 0; j<9; j++) {
        if(j==4) continue;  //summon especial 
        var newEnemy = createEnemy([enemy[0]+(j%3-1)*tileset,enemy[1]+(Math.floor(j/3)-1)*tileset, j==1?1:0])
        enemies.push(newEnemy);
      }
      enemy[9]=20;  // time to summon again
    }
  }
  addItem(enemy);
}
