var keyMap = 0;
var keys = {
  '65':1,         // left
  '87':2,         // up
  '68':4,         // right
  '83':8          // down
}

document.onkeydown = function(e){
  var key = e.keyCode|| e.which;
  if(keys[key]){
    keyMap|=keys[key];
    e.preventDefault();
  }
}

document.onkeyup = function(e){
  var key = e.keyCode ? e.keyCode : e.which;
  if(keyMap&keys[key]){
    keyMap^=keys[key];
    e.preventDefault();
  }
}
