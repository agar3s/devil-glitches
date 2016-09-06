function checkRecord(){
  newRecord = score>record;
  if(!newRecord) return;
  record = score;
  storage.setItem('agar3sjs13k-record', score);
  buttons[1][3] = true;
  buttons[2][3] = true;
}

//temp
var locationref = window.location.href||'http://js13kgames.com/entries/';

function baseMessage(){
  return 'I reached '+score.toFixed()+' points in devilGlitches #js13k #js13kgames ';
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