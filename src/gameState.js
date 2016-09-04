var mapSize = 21,
tileset = 40,
gameOver = false,
frame=0,
mapPixels = mapSize*tileset,
map = [],
slowMotion = 0.3,
viewPort = [-50, -160, 385, 275], // [x, y, leftOffset, topOffset] 
// [0x, 1y, 2size, 3angle, 4speed, 5crossFireAngle, 6countDown, 7bulletRatio, 8dashCountDown, 9dashcolddown]
hero = [460, 460, 16, 0, 150, 0, 0, 12,0,0],
heroShape = [[0,1,0,-1],[-1,1,0.5,1]],
//0x, 1y, 2size, 3angle
bullets = [],
// enemy description 
// 0x, 1y, 2size, 4angleIncrement, 3angle, 5angleMomentum, 6xpath, 7ypath, 8hit
// 0x, 1y, 2size, 3angle, 4index, 5type, 6hits, 7path, 8path, 9customdata
// totem description
// totem spawns enemies
// 0x, 1y, 2size, 3angle, 4xpath, 5ypath, 6hitpoints, 7nextInvocation
enemies = [],
particles = [],
message = '',
particleZ = Math.PI/2,
score = 0,
glitchTime = 0,
//012=rgb, 3, 4, 5, 6, 7stop 
GLITCHS=[0,0,0,0,0,0,0],
glitchStoped = false,
triggers = {
  /*
4000:[0,11.5*tileset,11.5*tileset,9], 
1100000:[0,12.5*tileset,6.5*tileset,6],
*/
  //1st wave
  500:[1,sequence4],
  //2500:[0,11.5*tileset,6.5*tileset,12],
  2500:[0,11.5*tileset,6.5*tileset,10],
  //2st wave
  8999:[5,'what are you doing?'],
  10500:[1,sequence3],
  11000:[0,5.5*tileset,5.5*tileset,10],
  18000:[0,16.5*tileset,16.5*tileset,10],
  18001:[5,''],
  25000:[0,16.5*tileset,5.5*tileset,10],
  31000:[0,5.5*tileset,16.5*tileset,10],
  32000:[5,'you can\'t stop us!'],
  37000:[0,11.5*tileset,10.5*tileset,11],
  37500:[1,sequence1],
  38001:[5,''],
  // some broken in the matrix
  48500:[2, 10,0,0,0,10,10,10],
  49000:[2, 10,10,10,15,10,20,10],
  49001:[4, sequence3, 1],
  49002:[4, sequence1, 1],
  49003:[4, sequence4, 1],
  50004:[2, 60,60,68,55,50,45,60],
  51000:[4, sequence3, 138],
  51001:[4, sequence1, 138],
  51002:[4, sequence4, 138],
  //3st wave
  52000:[0,4.5*tileset,12.5*tileset,11],
  52050:[5,'we are perfect'],
  53000:[0,17.5*tileset,10.5*tileset,10],
  61000:[0,13.5*tileset,10.5*tileset,11],
  62050:[5,'do you think we are an error?'],
  63000:[0,3.5*tileset,19.5*tileset,10],
  70000:[0,6.5*tileset,3.5*tileset,11],
  72000:[0,6.5*tileset,16.5*tileset,10],
  72050:[5,'you are the glitch'],
  78000:[0,18.5*tileset,18.5*tileset,11],
  // some cool effect for the summon in the middle 
  85000:[5,'your limited dimension...'],
  88500:[5,'is just a plane'],
  88501:[2, 1000,0,0,0,0,0,10],
  92000:[0,11.5*tileset,11.5*tileset,12],
  92499:[5,'we are beyond your imagination'],
  92500:[1,sequence2],
  95550:[5,''],
  //4st wave 
  // some cool effect
 111000:[0,11.5*tileset, 1.5*tileset,12],
 116000:[0,1.5*tileset, 11.5*tileset,12],
 121000:[0,20.5*tileset, 11.5*tileset,12],
 126000:[0,11.5*tileset, 20.5*tileset,12],
  // some cool effect
  // summon  
1100000:[0,12.5*tileset,6.5*tileset,10],
  //200000:[15.5*tileset, 6.5*tileset,11]   

},
bigKiller = undefined,  // reference for enemy followers
// triggers = {
//  1000:[11.5*tileset,6.5*tileset,10], 
//  10000:[5.5*tileset,5.5*tileset,6],
//  18000:[16.5*tileset,16.5*tileset,6],
//  25000:[16.5*tileset,5.5*tileset,6],
//  31000:[5.5*tileset,16.5*tileset,6]
// },
times=Object.keys(triggers).map(function(element){return parseInt(element)})
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