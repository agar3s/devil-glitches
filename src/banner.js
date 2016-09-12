var bannerScreen = false;
var bannerMessage='';
var bannerCounter = 0;
function launchBanner(message,length){
  GLITCHS[6]=30;
  bannerCounter=length||30;
  glitchTime = 10;
  bannerMessage = message;
}

function drawBanner(){
  var widthSequence = [20,20,20,20,20,20,20,20,20,20,20,20];
  ctx.save();
  ctx.beginPath();
  setContextAtrribute(2,1);
  ctx.fillRect(0,0,FW, FH);
  displayWord(bannerMessage, 430,180,bannerMessage.length<5?120:70,widthSequence);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

var endMessages = [
'',
'now i see',
'i am creation',
'you are destruction',
'we are going to be',
'in this battle',
'forever'];

var endBannerCounter = 0;
var bannerEndMessage;
function updateEnds(){
  switch(endBannerCounter){
    case 90:
      launchBanner('what',30);
    break;
    case 120:
      launchBanner('have',30);
    break;
    case 150:
      launchBanner('you',30);
    break;
    case 180:
      launchBanner('done?',120);
    break;
    case 185:
      GLITCHS=[100,100,100,0,0,0,0];
    break
    case 215:
      GLITCHS=[100,100,100,100,100,100,100];
      sequence1.stop();
      sequence2.stop();
      sequence2.tempo=1;
      sequence2.play();
      sequence3.stop();
      sequence3.tempo=1;
      sequence3.play();
      sequence4.stop();
    break;
    case 320:
      sequence2.stop();
      sequence3.stop();
      sequence2.tempo=138;
      sequence3.tempo=138;
      bannerMessage='';
    break;
    case 434:
      totemDieShakes=0;
    break;
  }
  if(endBannerCounter>435&&endBannerCounter<1694){
    bannerMessage=endMessages[~~((endBannerCounter-435)/180)];
  }
  if(endBannerCounter>1694){
    bannerEndMessage= false;
    score=300000;
    wave=7;
    enemies = [];
    bullets=[];
    godMode = true;
    storage.setItem('agar3sjs13k-gm', 'qyui');
    loadGod();
  }
  endBannerCounter++;
}
function drawBannerEnds(){
  if(endBannerCounter<300)return;
  var widthSequence = [0,0,0,0];
  ctx.save();
  ctx.beginPath();
  if(endBannerCounter<436){
    setContextAtrribute(-1,1,'rgba(0,0,0,'+(1-(436-endBannerCounter)/120)+')');
    ctx.fillRect(0,0,FW,FH);
    
  }else{
    setContextAtrribute(23,1);
    ctx.fillRect(0,0,FW,FH);
    displayWord(bannerMessage,400,250,16,widthSequence);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
