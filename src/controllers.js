function checkRecord(){
  newRecord = score>record;
  if(!newRecord) return;
  record = score;
  storage.setItem('agar3sjs13k-record', score);
  buttons[1][3] = true;
  buttons[2][3] = true;
}

//temp
var locationref = 'http://js13kgames.com/entries/evil-glitch';

function baseMessage(){
  return 'I reached '+score.toFixed()+' '+(godMode?'#evilMode ':'')+'points in #evilGlitch #js13k #js13kgames by @agar3s ';
}
function shareTwitter(){
  var message = baseMessage()+locationref;
  var link = encodeURIComponent(message);
  window.open('https://twitter.com/home?status='+link);
}
function shareFacebook(){
  var link = encodeURIComponent(locationref)+'&description='+encodeURIComponent(baseMessage());
  window.open('https://www.facebook.com/sharer/sharer.php?u='+link);
}
var fullscreen = false;
function toggleFullscreen(evt){
  if (document.fullscreenEnabled) {
    fullscreen?document.exitFullscreen():document.body.requestFullscreen();
  } else if (document['webkitFullscreenEnabled']) {
    fullscreen?document.webkitExitFullscreen():document.body.webkitRequestFullscreen();
  } else if (document.mozFullScreenEnabled) {
    fullscreen?document.mozCancelFullScreen():document.body.mozRequestFullScreen();
  }
  fullscreen=!fullscreen;
  evt.preventDefault();
}
document.getElementById('f').onclick=toggleFullscreen;

function getRandomValue(value, offset){
  return Math.random()*(value||1) + (offset||0);
}
function randomSign(){
  return getRandomValue()>0.5?1:-1;
}
function randomGlitch(){
  var tempDuration = getRandomValue(10,5);
  GLITCHS=[tempDuration,tempDuration,tempDuration,getRandomValue(10,5),getRandomValue(10,5),getRandomValue(10,5),0];
}

function toggleControls(){
  play(heroSpeedUp);
  controlHelp = !controlHelp;
  buttons[3][3] = !controlHelp;
  buttons[5][3] = !controlHelp&&godModeAvailable;
  buttons[4][5] = controlHelp?'go back':'controls';
}
