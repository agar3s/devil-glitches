var bannerScreen = false;
var bannerMessage;
var bannerCounter = 0;

function drawBanner(){
  var widthSequence = [8,8,8,8,8,8,8,8,8,8,8,8];
  ctx.save();
  ctx.beginPath();
  setContextAtrribute(2,1);
  ctx.fillRect(0,0,FW, FH);
  displayWord(bannerMessage, 430,180,bannerMessage.length<5?120:70,widthSequence);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}