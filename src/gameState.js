var spatialhashing,mapSize,tileset,gameOver,mapPixels,map,slowMotion,viewPort,enemies,hero,heroShape,bullets,particles,message,particleZ,score,glitchStoped,triggers,bigKiller,times,newRecord;
function init(){
  spatialhashing = {},
  mapSize = 21,
  tileset = 40,
  gameOver = false,
  frame=0,
  mapPixels = mapSize*tileset,
  map = [],
  slowMotion = 0.3,
  viewPort = [(FW-mapPixels)/2, (FH-mapPixels)/2 , FW/2-30, FH/2-30], // [x, y, leftOffset, topOffset]
  // [0x, 1y, 2size, 3angle, 4speed, 5crossFireAngle, 6countDown, 7bulletRatio, 8dashCountDown, 9dashcolddown]
  enemies = [],
  hero = [tileset*10.5, tileset*10.5, 16, 0, 150, 0, 0, 12,0,0],
  heroShape = [[0,1,0,-1],[-1,1,0.5,1]],
  //0x, 1y, 2size, 3angle
  bullets = [],
  // enemy description 
  // 0x, 1y, 2size, 4angleIncrement, 3angle, 5angleMomentum, 6xpath, 7ypath, 8hit
  // 0x, 1y, 2size, 3angle, 4index, 5type, 6hits, 7path, 8path, 9customdata
  // totem description
  // totem spawns enemies
  // 0x, 1y, 2size, 3angle, 4xpath, 5ypath, 6hitpoints, 7nextInvocation
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
  4000:[0,11,11,9], 
  1100000:[0,12,6,6],
  */
    //1st wave 
    500:[1,sequence4],
    2500:[0,10,5,10],
    //2st wave
    8999:[5,'what are you doing?'],
    10500:[1,sequence3],
    11000:[0,5,5,10],
    18000:[0,15,15,10],
    18001:[5,''],
    25000:[0,15,5,10],
    31000:[0,5,15,10],
    37000:[0,10,11,11],
    37500:[1,sequence1],
    46000:[5,'are you trying to stop us?'],
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
    51003:[5,'we are perfection'],
    //3st wave
    52000:[0,4,10,11],
    53000:[0,14,10,10],
    55550:[5,''],
    61000:[0,10,16,11],
    61003:[5,'we are creation'],
    63000:[0,10,6,10],
    66550:[5,''],
    70000:[0,16,10,11],
    72000:[0,6,10,10],
    78000:[0,10,4,11],
    // some cool effect for the summon in the middle 
    88501:[2, 1000,0,0,0,0,0,10],
    92000:[0,10,9,12],
    92500:[1,sequence2],
   105050:[5,'we are the sacred geometry'],
    // some cool effect
    //4st wave 
   109950:[5,'you must stop this'],
   114950:[5,'is inevitable!'],
   115000:[0,10, 1,12],
   118050:[5,''],
   121000:[0,1, 10,12],
   126000:[0,19, 10,12],
   131000:[0,10, 19,12],
    // some cool effect 
   163000:[5,'can\'t you understand?'],
    //5st wave
   164600:[0,10,15,10],
   164601:[0,12,16,10],
   164602:[0,12,18,10],
   164603:[0,10,19,10],
   164604:[0,8,18,10],
   164605:[0,8,16,10],
   179000:[6,'stop'],
   179100:[6,'now'],
   180000:[0,10,17,13],//3
   203000:[6,'you'],
   203100:[6,'are'],
   203200:[6,'the'],
   203300:[6,'glitch'],
   //6th wave
   210000:[0,10,10,14],
    // summon
  1100000:[0,12,6,10],
    //200000:[15, 6,11]   
  /**/
  },
  bigKiller = undefined,  // reference for enemy followers
  // triggers = {
  //  1000:[11,6,10], 
  //  10000:[5,5,6],
  //  18000:[16,16,6],
  //  25000:[16,5,6],
  //  31000:[5,16,6]
  // },
  times=Object.keys(triggers).map(function(element){return parseInt(element)});

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
  sequence1.stop();
  sequence2.stop();
  sequence3.stop();
  sequence4.stop();
  record = parseFloat(storage.getItem('agar3sjs13k-record')||0);
  for (var i = 0; buttons&&i < buttons.length; i++) {
    buttons[i][3] = false;
  }
  newRecord = false;
  randomGlitch();
}
