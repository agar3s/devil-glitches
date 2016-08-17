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
// x, y, angleIncrement, angle, angleMomentum, xpath, ypath, hit
enemies = [[250,250, 0, 0, 3, [-10,10,10,-10], [-10,-10,10,10],3]]
totems = [],
particles = [[300,300,45,100]]
;