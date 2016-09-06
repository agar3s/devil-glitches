/**
* custom font 14 segment letter
*/
var mapLetters = '0123456789?abcdefghijklmnopqrstuvwxyz .-\'';
var letters = [8767,518,1115,1039,1126,1133,1149,7,1151,1135,5123,1143,5391,57,4367,121,113,1085,1142,4361,30,2672,56,694,2230,63,1139,2111,3187,1133,4353,62,8752,10294,10880,4736,8713,0,16,1088,256];
function drawLetter14Segments(letter, x, y, size){
  // *****
  // |\|/|
  // -- --
  // |\|/|
  // *****
  if(letter&1){
    ctx.moveTo(x+2, y-1)
    ctx.lineTo(size+x-2, y-1)
  }
  // ---
  // |\/*
  //  --
  // |\/|
  // ---
  if(letter&2){
    ctx.moveTo(size+x+1, y)
    ctx.lineTo(size+x+1, size+y-1)
  }
  // ---
  // |\/|
  //  --
  // |\/*
  // ---
  if(letter&4){
    ctx.moveTo(size+x+1, size+y+1)
    ctx.lineTo(size+x+1, size*2+y)
  }
  // ---
  // |\/|
  //  --
  // |\/|
  // ***
  if(letter&8){
    ctx.moveTo(x+2, size*2+y+1)
    ctx.lineTo(size+x-2, size*2+y+1)
  }
  // ---
  // |\/|
  //  --
  // *\/|
  // ---
  if(letter&16){
    ctx.moveTo(x-1, y+size+1)
    ctx.lineTo(x-1, y+size*2)
  }
  // ---
  // *\/|
  //  --
  // |\/|
  // ---
  if(letter&32){
    ctx.moveTo(x-1, y)
    ctx.lineTo(x-1, size+y-1)
  }
  // ---
  // |\/|
  //  *-
  // |\/|
  // ---
  if(letter&64){
    ctx.moveTo(x+2, size+y)
    ctx.lineTo(x+size/2-2, size+y)
  }
  // ---
  // |*/|
  //  --
  // |/|\|
  // ---
  if(letter&128){
    ctx.moveTo(x+2, y+2)
    ctx.lineTo(x+size/2-2, size+y-2)
  }
  // -----
  // |\*/|
  // -- --
  // |/|\|
  // -----
  if(letter&256){
    ctx.moveTo(size/2+x, y+2)
    ctx.lineTo(size/2+x, size+y-2)
  }
  // -----
  // |\|*|
  // -- --
  // |/|\|
  // -----
  if(letter&512){
    ctx.moveTo(size/2+x+2, size+y-2)
    ctx.lineTo(size+x-2, y+2)
  }
  // -----
  // |\|/|
  // -- **
  // |/|\|
  // -----
  if(letter&1024){
    ctx.moveTo(size/2+x+2, size+y)
    ctx.lineTo(size+x-2, size+y)
  }
  // -----
  // |\|/|
  // -- --
  // |/|*|
  // -----
  if(letter&2048){
    ctx.moveTo(size/2+x+2, size+y+2)
    ctx.lineTo(size+x-2, size*2+y-2)
  }
  // -----
  // |\|/|
  // -- --
  // |/*\|
  // -----
  if(letter&4096){
    ctx.moveTo(size/2+x, size+y+2)
    ctx.lineTo(size/2+x, size*2+y-2)
  }
  // -----
  // |\|/|
  // -- --
  // |*|\|
  // -----
  if(letter&8192){
    ctx.moveTo(x+2, size*2+y-2)
    ctx.lineTo(size/2+x-2, size+y+2)
  }
}
function drawWord(word, x, y, size, color){
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle=color;
  for (var i = 0; i < word.length; i++) {
    drawLetter14Segments(letters[mapLetters.indexOf(word[i])], shakeScreen[0]+x-(size+10)*(word.length-i), shakeScreen[1]+y, size);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}
function drawWordCenter(word, x, y, size, color){
  x += (size+10)*word.length/2
  drawWord(word, x, y, size, color)
}
function drawWordLeft(word, x, y, size, color){
  x += (size+10)*word.length;
  drawWord(word, x, y, size, color)
}

