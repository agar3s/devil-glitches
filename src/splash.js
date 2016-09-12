var splashScreen = true;
var animationLine = 0;
var distanceLine = 30;
var controlHelp = false;
var fade = 0;
function drawDiagonal(x, y, width, vertical, offset){
  ctx.moveTo(x,y);
  ctx.lineTo(x+(vertical?offset:width),y+(vertical?width:offset));
}
function drawLine(x,y,width, vertical){
  drawDiagonal(x,y,width,vertical,0);
}
function crossLine(x,y,width){
  drawLine(x,y,width,true);
  drawLine(y,x,width);
}


function drawSplash(){
  ctx.save();
  ctx.beginPath();
  setContextAtrribute(23,1);
  ctx.fillRect(0,0,FW, FH);

  setContextAtrribute(0);
  //
  var halfHeight = FH/2;
  var horizon = distanceLine*2;
  ctx.beginPath();
  for (var i = 0; i < halfHeight/distanceLine; i++){
    var dis = easeInQuad(i*distanceLine+animationLine, halfHeight+horizon, halfHeight, halfHeight);
    setContextAtrribute(1);
    drawLine(0,dis+0.5,FW);
  }
  ctx.stroke(); 
  ctx.beginPath();
  for (var i = 0; i < halfHeight/distanceLine; i++){
    var dis = easeInQuad(i*distanceLine+animationLine, halfHeight+horizon, halfHeight, halfHeight);
    setContextAtrribute(2);
    drawLine(0,FH-dis-0.5,FW);
  }
  ctx.stroke(); 
  var limit = halfHeight-horizon;
  setContextAtrribute(2);
  ctx.beginPath();
  drawLine(0,limit,FW)
  drawLine(FW/2,limit,-limit, true);
  ctx.stroke(); 

  setContextAtrribute(1);
  ctx.beginPath();
  drawLine(0,FH-limit,FW)
  drawLine(FW/2,FH-limit, limit, true);
  ctx.stroke(); 
  ctx.beginPath();
  for (var i = 1; i < FW/(distanceLine*2); i++) {
    var offset = i*i*5+25;
    setContextAtrribute(2);
    drawDiagonal(i*distanceLine+FW/2,limit,-limit,true,offset);
    drawDiagonal(-i*distanceLine+FW/2,limit,-limit,true,-offset);
  }
  ctx.stroke(); 
  ctx.beginPath();
  for (var i = 1; i < FW/(distanceLine*2); i++) {
    var offset = i*i*5+25;
    setContextAtrribute(1);
    drawDiagonal(i*distanceLine+FW/2,FH-limit,limit,true,offset);
    drawDiagonal(-i*distanceLine+FW/2,FH-limit,limit,true,-offset);
  }
  ctx.stroke(); 

  if(controlHelp){ 
    displayWord('controls', 400, 130,12, [0,16]);
    displayWord('move             awsd', 400, 251,12, [0,0]);
    displayWord('fire       left click', 400, 290,12, [0,0]);
    displayWord('warptime  right click', 400, 330,12, [0,0]);
  }else{
    displayWord('winners don\'t use drugs', 401, 50,9, [0,0]);
    displayWord('evil glitch', 400, 270-fade*50,30*(1+fade), [0,9,0,9]);
    //displayWord('glitch', 400, 310+fade*50,20*(1+fade), [0,1,0]); 
  }

  displayWord('made by agar3s', 401, 520,9, [0,10]);

  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function updateSplash(){
  animationLine++;
  if(animationLine>distanceLine){
    animationLine=0;
  }
}

function startGame(){
  fade=0.01;
}

function startGodMode(){
  startFromGodMode = true;
  godMode = true;
  startGame();
}
init();
