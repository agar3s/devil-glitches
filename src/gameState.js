var mapSize = 25,
tileset = 40,
frame=0,
mapPixels = mapSize*tileset,
map = new Array(mapSize).fill(new Array(mapSize).fill(0)),
viewPort = [0, 0, 380, 285], // [x, y, leftOffset, topOffset]
// [x, y, speed, size, angle, crossFireAngle, countDown, bulletRatio]
hero = [400, 300, 150, 32, 0, 0, 0, 12],  
bullets = [],
heroShape = [[0,16,0,-16],[-16,16,8,16]]
;