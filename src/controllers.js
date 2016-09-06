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
  uploadImgr();
  var link = encodeURIComponent(locationref)+'&description='+encodeURIComponent(baseMessage());
  window.open('https://www.facebook.com/sharer/sharer.php?u='+link);
}

function uploadImgr(){
  authorization = 'Client-ID d65571b4543e280';

  var r = new XMLHttpRequest();
  r.open("POST", "https://api.imgur.com/3/image", true);
  r.setRequestHeader('Authorization',authorization);
  r.setRequestHeader('Accept','application/json')
  r.onreadystatechange = function () {
    if (r.readyState != 4 || r.status != 200) return;
    alert("Success: " + r.responseText);
  };
  r.send("image="+c.toDataURL().replace("data:image/png;base64,", "")+'&type=base64');
  //window.location = 'https://imgur.com/gallery/' + id;
}
