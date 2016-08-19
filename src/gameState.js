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
// 0x, 1y, 2size, 3angleIncrement, 4angle, 5angleMomentum, 6xpath, 7ypath, 8hit
enemies = [[250,250,10, 0, 0, 3, [-10,10,10,-10], [-10,-10,10,10],3]],
// totem description
// totem spawns enemies
// x, y, size, angle, xpath, ypath, hitpoints 
totems = [[tileset*5.5,tileset*5.5, tileset/2, 0, [[-1,0,0],[0,0,1],[-1,1,0]], [[-1.5,-0.5,0.5],[-0.5,0.5,-1.5],[-1.5,-1.5,-0.5]], 50]],
particles = [[300,300,45,100]]
;
