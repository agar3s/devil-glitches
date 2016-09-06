// x, y, width, visible, color, message, clicked, hover, action 
var buttons = [[250,340,300, false, '#F66', 'start again',false, false, init]];
function drawButtons(){
  // absolute position 
  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    if(!button[3]) return;
    if(button[7]){
      ctx.strokeStyle = '#066';
    }else{
      ctx.strokeStyle = button[4];
    }
    ctx.lineWidth=2;
    ctx.strokeRect(button[0], button[1],button[2],38);
    drawWordCenter(button[5], button[0]+button[2]/2-1, button[1]+6,12, '#FFF');
    drawWordCenter(button[5], button[0]+button[2]/2, button[1]+6,12, button[5]);
  }
}

function updateButtons(){
  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    if(!button[3]) return button[6] = button[7] = false;
    if(coords[0]<button[0]||coords[0]>button[0]+button[2]||coords[1]<button[1]||coords[1]>button[1]+38) return button[6] = button[7] = false;
    button[7] = true;
    if(coords[2]==1){
      button[6] = true;
    }else if(coords[2]==0&&button[6]){
      button[6] = false;
      button[8]();
    }
  }
}