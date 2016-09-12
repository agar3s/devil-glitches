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

function drawSummonBoss(x,y,percentage, size){
  ctx.translate(x,y);
  ctx.beginPath();
  setContextAtrribute(-1,1,'rgba(210,0,0,0.9)')
  ctx.arc(0,0,mapPixels*(1-percentage),0, Math.PI*2);
  ctx.stroke();
  ctx.fill();
  ctx.beginPath();
  setContextAtrribute(0);
  if(percentage<0.3){
    ctx.moveTo(-size*percentage/0.3,0);
    ctx.lineTo(size*percentage/0.3,0);
  }else{
    setContextAtrribute(0,1);
    ctx.bezierCurveTo(-size, 0, 0, -size*percentage/3.5, size, 0);
    ctx.bezierCurveTo(size, 0, 0, size*percentage/3.5, -size, 0);
    ctx.fill();
  }
  ctx.closePath();
  ctx.translate(-x,-y);
}

function drawSummons(){
  ctx.beginPath();
  for (var i = 0; i < summons.length; i++) {
    var summon=summons[i];
    var enemyType = summon[4][2];
    var size = necronomicon[enemyType][0];
    var percentage = easeOutQuad(summon[2],1,-1, summon[3]);
    var x = summon[0]+viewPort[0]+shakeScreen[0];
    var y = summon[1]+viewPort[1]+shakeScreen[1];
    if(enemyType==14){
      drawSummonBoss(x, y,percentage, size);
      continue
    }
    setContextAtrribute(-1,0,'rgba(38,82,255,'+percentage+')');
    ctx.fillRect(x-percentage*size, y-percentage*size, percentage*size*2, percentage*size*2);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function scheduleSummon(x,y,time, element){
  if(element[2]==14){
    time *=2;
    play(bossSummon);
  }
  summons.push([x, y, time, time, element])
}

var alSequence=[10,10,11,11,11,12,12,10,10,11,13,10,11,12,12];
var alIndex =0;

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
        message = trigger[0];
      break;
      case 6:
        launchBanner(trigger[0]);
      break;
      case 7:
        trigger[0].stop()
      break;
      case 8:
        wave = trigger[0]
      break;
    }

  }else if(times.length==0){  // to infinite mode 
    if(alIndex++>=alSequence.length){
      alIndex=0;
    }
    triggers[score+5000] = [0,~~(getRandomValue(21)),~~(getRandomValue(21)),alSequence[alIndex]]
    times.push(score+5000)
  }
}