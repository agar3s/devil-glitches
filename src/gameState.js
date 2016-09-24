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
  wave = 1,
  //012=rgb, 3, 4, 5, 6stop, 7 nada,
  GLITCHS=[0,0,0,0,0,0,0,0],
  glitchStoped = false,
  triggers = {
    //1st wave 
    500:[1,sequence4],
    2500:[0,10,5,10],
    //2st wave
    8999:[5,'what are you doing?'],
    10500:[1,sequence3],
    10800:[8,2],
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
    49500:[8,3],
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
    66550:[5,''],
    67000:[0,16,10,11],
    68000:[0,6,10,10],
    72000:[0,10,4,11],
    // some cool effect for the summon in the middle
    80501:[2, 1000,0,0,0,0,0,10],
    83000:[0,10,9,12],
    83500:[1,sequence2],
    95050:[5,'you must stop this'],
    99950:[5,'it\'s inevitable!'],
    99980:[8,4],
   100000:[0,10, 1,12],
   103050:[5,''],
   106000:[0,1, 10,12],
   111000:[0,19, 10,12],
   116000:[0,10, 19,12],
    // some cool effect
   140000:[8,5],
   140001:[5,'can\'t you understand?'],
    //5st wave
   141600:[0,10,12,10],
   141601:[0,12,13,10],
   141602:[0,12,15,10],
   141603:[0,10,16,10],
   141604:[0,8,15,10],
   141605:[0,8,13,10],
   145050:[5,''],
   156800:[6,'stop'],
   156900:[6,'now'],
   157000:[0,10,14,13],//3 
   180000:[6,'you'],
   180100:[6,'are'],
   180200:[6,'the'],
   180300:[6,'glitch'],
   181000:[8,6],
   //6th wave 
   182000:[7,sequence1],
   182050:[7,sequence2],
   182100:[7,sequence3],
   182150:[7,sequence4],
   185100:[2,300,0,300,0,0,0,0],
   // mega special summon
   187000:[0,10,10,14],
   189000:[1,sequence1],
   189001:[1,sequence2],
   189002:[1,sequence3],
   189003:[1,sequence4],
   //god mode 
   300100:[1,sequence4],
   305000:[0,10,5,10],
   308000:[1,sequence3],
   310000:[0,10,6,11],
   311000:[1,sequence4],
   315000:[0,14,6,10],
   317000:[0,14,14,10],
   319000:[0,6,14,10],
   320000:[0,6,6,10],
   335000:[0,11,11,12],
   336000:[0,9,11,12],
   337000:[0,11,9,12],
   338000:[0,9,9,12],
   350000:[0,19,19,11],
   352000:[0,1,19,11],
   354000:[0,1,1,11],
   355000:[0,19,1,11],
   365000:[0,10,8,10],
   366000:[0,11,9,10],
   367000:[0,12,10,10],
   368000:[0,11,11,10],
   369000:[0,10,12,10],
   370000:[0,9,11,10],
   371000:[0,8,10,10],
   372000:[0,9,9,10],
   395000:[0,1,1,12],
   395001:[0,1,19,12],
   395002:[0,19,19,12],
   395003:[0,20,1,12],
   395004:[0,10,10,12],
   425000:[0,0,10,13],
   425001:[0,20,10,13],
   570001:[0,10,10,13]
  },
  bigKiller = undefined;  // reference for enemy followers

  for(var i=0;i<mapSize;i++){
    map.push([]);
    for(var j=0;j<mapSize;j++){
      map[i].push([]);
    }
  }
  for(var i=0;i<mapSize-1;i++){
    if(i==10) continue;
    triggers[450000+i*6000]=[0,i,i,10];
    triggers[453000+i*6000]=[0,mapSize-i-1,i,10];
  }
  times=Object.keys(triggers).map(function(element){return parseInt(element)});
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
  loadGod();
}

function loadGod(){
  if(godMode){
    heroShape=[[0,-0.5,-0.25,-1,-0.5,-0.4,-0.5,-0.25,0,0.25,0.5,0.4,0.5,1,0.25,0.5,],[-0.25,0,-1,0.25,0.75,0.5,0.25,0.2,0.8,0.2,0.25,0.5,0.75,0.25,-1,0]];
    hero[4]=160;
    hero[2]=20;
    hero[7]=22;
  }
  if(startFromGodMode){
    score = 300000;
    wave = 7;
    for (var i = times.length-1; i>=0; i--) {
      if(times[i]<300000){
        times.splice(i,1);
      }
    }
  }
}
