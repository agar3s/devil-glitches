var mapSize = 25,
tileset = 40,
frame=0,
mapPixels = mapSize*tileset,
map = [],
viewPort = [0, 0, 380, 265], // [x, y, leftOffset, topOffset]
// [x, y, speed, size, angle, crossFireAngle, countDown, bulletRatio]
hero = [400, 300, 150, 32, 0, 0, 0, 12],  
heroShape = [[0,16,0,-16],[-16,16,8,16]]
bullets = [],
// enemy description 
// 0x, 1y, 2size, 3angleIncrement, 4angle, 5angleMomentum, 6xpath, 7ypath, 8hit
enemies = [],
// totem description
// totem spawns enemies
// 0x, 1y, 2size, 3angle, 4xpath, 5ypath, 6hitpoints, 7nextInvocation
totems = [],
particles = [[300,300,45,100]]
;

for(var i=0;i<mapSize;i++){
  map.push([]);
  for(var j=0;j<mapSize;j++){
    map[i].push([]);
  }
}
//map[5][5]=1;

