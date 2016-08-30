var mapSize = 21,
tileset = 40,
gameOver = false,
frame=0,
mapPixels = mapSize*tileset,
map = [],
slowMotion = 0.3,
viewPort = [-60, -160, 390, 275], // [x, y, leftOffset, topOffset] 
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
messages = [
 'devil glitches',
 'here we are',
 'we are the sacred geometry',
 'we are perfect',
 'after us. nothing',
 'you cant understand our power',
 'you are in a limited space'
],
message = 'behold our majesty',
particleZ = Math.PI/2,
score = 0,
glitchTime = 0,
summons = {
  //1st wave 
  1000:[11.5*tileset,6.5*tileset,6], 
  //2st wave
  10000:[5.5*tileset,5.5*tileset,6],
  18000:[16.5*tileset,16.5*tileset,6],
  25000:[16.5*tileset,5.5*tileset,6],
  31000:[5.5*tileset,16.5*tileset,6],
  37000:[11.5*tileset,10.5*tileset,7],
  // some cool effect
  //3st wave
  51000:[4.5*tileset,12.5*tileset,7],
  53000:[17.5*tileset,10.5*tileset,6],
  61000:[13.5*tileset,10.5*tileset,7],
  63000:[3.5*tileset,19.5*tileset,6],
  70000:[6.5*tileset,3.5*tileset,7],
  72000:[6.5*tileset,16.5*tileset,6],
  78000:[18.5*tileset,18.5*tileset,7],
  // some cool effect for the summon in the middle 
  92000:[11.5*tileset,11.5*tileset,8],
  //4st wave 
  // some cool effect
 111000:[11.5*tileset, 1.5*tileset,8],
 116000:[1.5*tileset, 11.5*tileset,8],
 121000:[20.5*tileset, 11.5*tileset,8],
 126000:[11.5*tileset, 20.5*tileset,8],
  // some cool effect
  // summon  
1100000:[12.5*tileset,6.5*tileset,6],
  //200000:[15.5*tileset, 6.5*tileset,7]   
},
bigKiller = undefined,  // reference for enemy followers
// summons = {
//  1000:[11.5*tileset,6.5*tileset,6], 
//  10000:[5.5*tileset,5.5*tileset,6],
//  18000:[16.5*tileset,16.5*tileset,6],
//  25000:[16.5*tileset,5.5*tileset,6],
//  31000:[5.5*tileset,16.5*tileset,6]
// },
times=Object.keys(summons).map(function(element){return parseInt(element)})
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