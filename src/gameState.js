var mapSize = 21,
tileset = 40,
frame=0,
mapPixels = mapSize*tileset,
map = [],
viewPort = [0, 0, 380, 265], // [x, y, leftOffset, topOffset] 
// [0x, 1y, 2speed, 3size, 4angle, 5crossFireAngle, 6countDown, 7bulletRatio]
// [0x, 1y, 2size, 3angle, 4speed, 5crossFireAngle, 6countDown, 7bulletRatio]
hero = [400, 300, 16, 0, 150, 0, 0, 12],
heroShape = [[0,16,0,-16],[-16,16,8,16]],
//0x, 1y, 2size, 3angle
bullets = [],
// enemy description 
// 0x, 1y, 2size, 4angleIncrement, 3angle, 5angleMomentum, 6xpath, 7ypath, 8hit
// 0x, 1y, 2size, 3angle, 4index, 5type, 6hits, 7path, 8path, 9customdata
// totem description
// totem spawns enemies
// 0x, 1y, 2size, 3angle, 4xpath, 5ypath, 6hitpoints, 7nextInvocation
enemies = [],
particles = [[300,300,45,100]],
messages = [
 'here we are',
 'we are the sacred geometry',
 'we are perfect',
 'after us. nothing',
 'you cant understand our power',
 'you are in a limited space'
],
message = 'behold our majesty',
particleZ = Math.PI/2,
score = 0
;

for(var i=0;i<mapSize;i++){
  map.push([]);
  for(var j=0;j<mapSize;j++){
    map[i].push([]);
  }
}
//map[5][5]=1;

// enemy type movement, 
/*types
0-5 enemies that moves
enemy[9][angleIncrement, angleMomentun]
>5 totems
*/