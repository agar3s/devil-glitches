var splashScreen = true;
var animationLine = 0;
var distanceLine = 30;
var controlHelp = false;
var fade = 0;
function drawDiagonal(x, y, width, vertical, offset){
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(x+(vertical?offset:width),y+(vertical?width:offset));
  ctx.stroke(); 
}
function drawLine(x,y,width, vertical){
  drawDiagonal(x,y,width,vertical,0);
}
function crossLine(x,y,width){
  drawLine(x,y,width,true);
  drawLine(y,x,width);
}

function setGridColor(corruption){
  ctx.strokeStyle = corruption?'rgba(234,34,37,0.6)':'rgba(102,82,156,0.8)';
}

function drawSplash(){
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle= 'rgba(5,4,13,1)';
  ctx.fillRect(0,0,FW, FH);

  ctx.strokeStyle='#fff';

  var halfHeight = FH/2;
  var horizon = distanceLine*2;
  for (var i = 0; i < halfHeight/distanceLine; i++){
    var dis = easeInQuad(i*distanceLine+animationLine, halfHeight+horizon, halfHeight, halfHeight);
    setGridColor();
    drawLine(0,dis+0.5,FW);
    setGridColor(true);
    drawLine(0,FH-dis-0.5,FW);
  }
  var limit = halfHeight-horizon;
  setGridColor(true);
  drawLine(0,limit,FW)
  drawLine(FW/2,limit,-limit, true);

  setGridColor();
  drawLine(0,FH-limit,FW)
  drawLine(FW/2,FH-limit, limit, true);
  for (var i = 1; i < FW/(distanceLine*2); i++) {
    var offset = i*i*5+25;
    setGridColor(true);
    drawDiagonal(i*distanceLine+FW/2,limit,-limit,true,offset);
    drawDiagonal(-i*distanceLine+FW/2,limit,-limit,true,-offset);

    setGridColor();
    drawDiagonal(i*distanceLine+FW/2,FH-limit,limit,true,offset);
    drawDiagonal(-i*distanceLine+FW/2,FH-limit,limit,true,-offset);
  }

  if(controlHelp){ 
    displayWord('move: awsd', 400, 231,12, ['#FFF']);
    displayWord('left click to fire', 400, 270,12, ['#FFF']);
    displayWord('right click to warp', 400, 310,12, ['#FFF']);
  }else{
    displayWord('winners don\'t use drugs', 401, 50,9, ['#FFF']);
    displayWord('devil', 400, 250,20, ['#FFF']);
    displayWord('glitches', 400, 310,20, ['#FFF']);
  }

  displayWord('made by agar3s', 401, 520,9, ['#FFF','#F66']);

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

function startGame(){
  fade=0.01;
}
init();
