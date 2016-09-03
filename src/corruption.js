//corrupt algorithm 
function corruptZone(x, y, radius){
  var col = ~~(x/tileset);
  var row = ~~(y/tileset);
  var r = Math.ceil(radius/tileset);
  for(var j = row-r; j < row+r; j++){
    if(typeof(map[j])=='undefined') continue;
    for(var i = col-r; i < col+r; i++){
      if(map[j][i]==1||getHypo((j+0.5)*tileset-y, (i+0.5)*tileset-x)>=radius) continue;
      map[j][i]=1;
    }
  }
}

function removeCorruption(x, y, radius){
 var col = ~~(x/tileset);
  var row = ~~(y/tileset);
  var r = Math.ceil(radius/tileset);
  for(var j = row-r; j < row+r; j++){
    if(typeof(map[j])=='undefined') continue;
    for(var i = col-r; i < col+r; i++){
      if(map[j][i]==1||getHypo((j+0.5)*tileset-y, (i+0.5)*tileset-x)<=radius){
        map[j][i]=0;
      }
    }
  } 
}