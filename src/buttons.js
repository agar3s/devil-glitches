// x, y, width, visible, color, message, clicked, hover, action 
var buttons = [[250,320,300, false, '#F66', 'start again',false, false, startGame],
               [120,460,250, false, '#69F', 'twitter',false, false, shareTwitter],
               [430,460,250, false, '#32F', 'facebook',false, false, shareFacebook],
               [240,380,320, true, '#6FF', 'fire to start', false, false, startGame],
               [280,440,240, true, '#6FF', 'controls', false, false, toggleControls]];

function drawButtons(){
  // absolute position
  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    if(!button[3]) continue;
    if(button[7]){
      ctx.strokeStyle = '#066';
    }else{
      ctx.strokeStyle = button[4];
    }
    ctx.lineWidth=2;
    ctx.strokeRect(button[0], button[1],button[2],42);
    displayWord(button[5], button[0]+button[2]/2, button[1]+9,12, ['#FFF',button[5]]);
  }
}

function updateButtons(){
  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    if(!button[3]||coords[0]<button[0]||coords[0]>button[0]+button[2]||coords[1]<button[1]||coords[1]>button[1]+42){
      button[6] = button[7] = false; 
      continue;
    }
    button[7] = true;
    if(coords[2]==1){
      button[6] = true;
    }else if(coords[2]==0&&button[6]){
      button[6] = false;
      button[8]();
    }
  }
}