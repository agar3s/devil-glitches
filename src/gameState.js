var mapSize = 25,
tileset = 40,
frame=0,
mapPixels = mapSize*tileset,
map = new Array(mapSize).fill(new Array(mapSize).fill(0)),
viewPort = [0, 0, 380, 285], // [x, y, leftOffset, topOffset]
// [x, y, speed, size, angle, crossFireAngle, countDown, bulletRatio]
hero = [400, 300, 150, 32, 0, 0, 0, 12],  
heroShape = [[0,16,0,-16],[-16,16,8,16]]
bullets = [],
// enemy description 
// 0x, 1y, 2angleIncrement, 3angle, 4angleMomentum, 5xpath, 6ypath, 7hit, 8freezetime,9lag
enemies = [[250,250, 0, 0, 3, [-10,10,10,-10], [-10,-10,10,10],3,0,0.001]]
totems = [],
particles = [[300,300,45,100]],
quadTree = createQuad([0, 0, mapPixels, mapPixels]) // for enemies
;

if(DEBUG){

  let elements = [[20,20,5,5]];
  insertQuad(elements, quadTree)

  for (var i = 0; i < 80; i++) {
    elements.push([Math.round(Math.random()*mapPixels-10)+5,Math.round(Math.random()*mapPixels-10)+5,5,5]);
    insertQuad(elements[elements.length-1], quadTree)
  }
  function modifyQuad(){
    checkUpdateQuad(quadTree);
    let index = Math.floor(Math.random()*elements.length);
    elements[index][0]+=100*Math.random()-50;
    elements[index][1]+=100*Math.random()-50;
    //removeQuad(elements.splice(index, 1)[0], quadTree);
    setTimeout(modifyQuad, 1500);
  }
  modifyQuad();
}
