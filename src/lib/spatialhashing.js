// custom spatialhashing implementation

var spatialhashing = {};
var ceilHeight = 50;
function getHashItem(item){
  return Math.round(item[0]/ceilHeight)+'-'+Math.round(item[1]/ceilHeight);
}
/* add element to spatialhash*/
function addItem(item){
  var hash = getHash(item);
  spatialhashing[hash]=spatialhashing[hash]||[];
  spatialhashing[hash].push(item);
}

function getHash(x,y){
  return getHashItem([x, y]);
}
/* return elements that collides with element*/
/* only the first element that collides*/
function collideElements(item){
  var list = {};
  var elements = [];
  for (var i = 0; i < 9; i++) {
    var hash = getHash(item[0]+(i%3-1)*item[2], item[1]+(Math.floor(i/3)-1)*item[2]);
    if(!list[hash]){
      list[hash]=1;
      var elements = spatialhashing[hash];
      for (var i = 0; i < elements.length; i++) {
        if(getHypo(item[1]-elements[i][1], item[0]-elements[i][0])<elements[i][2]+item[2]){
          return elements[i]
        }
      }
    }
  }

}