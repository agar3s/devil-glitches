var mapSize = 25,
tileset = 40,
mapPixels = mapSize*tileset,
map = new Array(mapSize).fill(new Array(mapSize).fill(0)),
viewPort = [0, 0, 350, 260], // [x, y, leftOffset, ]
hero = [400, 300, 150, 32, 45, 0]  // [x, y, speed, size]
;