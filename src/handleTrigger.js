// x, y, timeleft, baseTime, summonElement, baseanimation...
var summons = [];

function updateSummons(){
  for (var i = 0; i < summons.length; i++) {
    var summon = summons[i];
    summon[2]-=dt;
    if(summon[2]<0){
      enemies.push(createEnemy(summon[4]));
      if(summon[4][2]>9){
        glitchTime = 10;
        play(totemAppears);
      }
      if(summon[4][2]==3){
        bigKiller = enemies[enemies.length-1];
      }
      summons.splice(i, 1);
    }
  }
}

function drawSummons(){
  ctx.beginPath();
  for (var i = 0; i < summons.length; i++) {
    var summon=summons[i];
    var enemyType = summon[4][2];
    var size = necronomicon[enemyType][0];
    var percentage = easeOutQuad(summon[2], 1, -1, summon[3]);
    setContextAtrribute(-1,0,'rgba(38,82,255,'+percentage+')');
    ctx.fillRect(summon[0]+viewPort[0]+shakeScreen[0]-percentage*size, summon[1]+viewPort[1]+shakeScreen[1]-percentage*size, percentage*size*2, percentage*size*2);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function scheduleSummon(x,y,time, element){
  summons.push([x, y, time, time, element])
}


function updateTrigger(){
  if(times.length>0&&score>times[0]){
    var trigger  = triggers[times.splice(0,1)[0]];
    var type = trigger.splice(0,1)[0];
    switch(type){
      case 0:
        trigger[0]=(trigger[0]+0.5)*tileset;
        trigger[1]=(trigger[1]+0.5)*tileset;
        scheduleSummon(trigger[0], trigger[1], 1, trigger);
      break;
      case 1:
        trigger[0].play();
      break;
      case 2:
        GLITCHS = trigger;
      break;
      case 3:
        play(trigger[0])
      break;
      case 4:
        trigger[0].tempo = trigger[1];
        if(trigger[1]==138){trigger[0].stop();trigger[0].play()}
      break;
      case 5:
        message = trigger[0]
      break;
    }

  }else if(times.length==0){  // to infinite mode 
    triggers[score+7500] = [getRandomValue(21*tileset),getRandomValue(21*tileset),6]
    glitchTime = 5;
    times.push(score+7500)
  }
}