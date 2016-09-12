/**
* custom font 14 segment letter
*/
var mapLetters = '0123456789?abcdefghijklmnopqrstuvwxyz .-\'/';
var letters = [8767,518,1115,1039,1126,1133,1149,7,1151,1135,5123,1143,5391,57,4367,121,113,1085,1142,4361,30,2672,56,694,2230,63,1139,2111,3187,1133,4353,62,8752,10294,10880,4736,8713,0,16,1088,256,8704];

function drawSegment(xi,yi,offsetX,offsetY){
  ctx.moveTo(xi,yi);
  ctx.lineTo(xi+offsetX,yi+offsetY);
}

function drawLetter14Segments(letter, x, y, size){
  var size4 = size-4;
  var size24 = size/2-4;
  // *****
  // |\|/|
  // -- --
  // |\|/|
  // *****
  if(letter&1){
    drawSegment(x+2, y-1,size4, 0);
  }
  // ---
  // |\/*
  //  --
  // |\/|
  // ---
  if(letter&2){
    drawSegment(size+x+1, y,0, size-1);
  }
  // ---
  // |\/|
  //  --
  // |\/*
  // ---
  if(letter&4){
    drawSegment(size+x+1, size+y+1,0, size-1);
  }
  // ---
  // |\/|
  //  --
  // |\/|
  // ***
  if(letter&8){
    drawSegment(x+2, size*2+y+1,size4, 0);
  }
  // ---
  // |\/|
  //  --
  // *\/|
  // ---
  if(letter&16){
    drawSegment(x-1, y+size+1,0, size-1);
  }
  // ---
  // *\/|
  //  --
  // |\/|
  // ---
  if(letter&32){
    drawSegment(x-1, y,0, size-1);
  }
  // ---
  // |\/|
  //  *-
  // |\/|
  // ---
  if(letter&64){
    drawSegment(x+2, size+y,size24, 0);
  }
  // ---
  // |*/|
  //  --
  // |/|\|
  // ---
  if(letter&128){
    drawSegment(x+2, y+2,size24, size4);
  }
  // -----
  // |\*/|
  // -- --
  // |/|\|
  // -----
  if(letter&256){
    drawSegment(size/2+x, y+2,0, size4);
  }
  // -----
  // |\|*|
  // -- --
  // |/|\|
  // -----
  if(letter&512){
    drawSegment(size+x-2, y+2,-size24, size4);
    //drawSegment(size/2+x+2, size+y-2,size24, size+4);
  }
  // -----
  // |\|/|
  // -- **
  // |/|\|
  // -----
  if(letter&1024){
    drawSegment(size/2+x+2, size+y,size24, 0);
  }
  // -----
  // |\|/|
  // -- --
  // |/|*|
  // -----
  if(letter&2048){
    drawSegment(size/2+x+2, size+y+2,size24, size4);
  }
  // -----
  // |\|/|
  // -- --
  // |/*\|
  // -----
  if(letter&4096){
    drawSegment(size/2+x, size+y+2,0, size4);
  }
  // -----
  // |\|/|
  // -- --
  // |*|\|
  // -----
  if(letter&8192){
    drawSegment(x+2, size*2+y-2,size24, -size+4);
  }
}
function drawWord(word, x, y, size, colorIndex, spacing){
  ctx.save();
  ctx.beginPath();
  setContextAtrribute(colorIndex);
  for (var i = 0; i < word.length; i++) {
    drawLetter14Segments(letters[mapLetters.indexOf(word[i])], shakeScreen[0]+x-(size+spacing)*(word.length-i), shakeScreen[1]+y, size);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}
function drawWordCenter(word, x, y, size, colorIndex,spacing){
  x += (size+spacing)*word.length/2
  drawWord(word, x, y, size, colorIndex, spacing)
}
function drawWordLeft(word, x, y, size, colorIndex, spacing){
  x += (size+spacing)*word.length;
  drawWord(word, x, y, size, colorIndex, spacing)
}
var wordAligns=[drawWordCenter,drawWord];

function displayWord(word, x, y, size, colorIndexes, side, width){
  width = width||colorIndexes.length;
  side = side||0;
  var spacing = size<25?10:size*0.5;
  for (var i = 0; i < width; i++) {
    wordAligns[side](word, x+i, y+i, size, colorIndexes[i]||colorIndexes[0], spacing);
  }
}
