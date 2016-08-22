// mouse states 
// x, y, down
var coords = [0, 0, 0];

c.onmousedown = function(e){
  coords[2] = e.which==3?0:1;
  coords[3] = e.which==3?1:0;
  e.preventDefault();
}

c.onmouseup = function(e){
  coords[2] = 0;
  coords[3] = 0;
  e.preventDefault();
}

c.onmousemove = function(e){
  coords[0] = e.offsetX;
  coords[1] = e.offsetY;
}
