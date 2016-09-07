// colors
var colors = [
,//0
'rgba(102,82,156,0.8)',//1 normal
'rgba(234,34,37,0.6)',//2 corruption
,//3
,//4
,//5
,//6
,//7
,//8
,//9
'#F66', //10 button start again
'#69F', //11 button twitter
'#32F', //12 button facebook
'#6FF'  //13 button fire to start& controls
];

function setStrokeStyle(index){
  ctx.strokeStyle = colors[index];
}
/**enemies must have colors?*/
function getRandomColor(r,r2,g,g2,b,b2,a,a2){
  var value =  'rgba('+~~getRandomValue(r,r2)+','+~~getRandomValue(g,g2)+','+~~getRandomValue(b,b2)+','+getRandomValue(a,a2)+')';
  return value;
}