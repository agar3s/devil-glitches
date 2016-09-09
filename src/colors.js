// colors
var colors = [
'#FFF',//0 white
'rgba(102,82,156,0.8)',//1 normal
'rgba(234,34,37,0.6)',//2 corruption or  'rgba(231,197,11,0.3)';
'rgba(180,0,50,0.3)',//3 red eye for flower of life
'#F952FF',//4 cursor color
'rgba(200,200,200,0.6)',//5 soft white line to glow
'rgb(201,133,187)',//6 hero
'rgba(0,0,0,0.1)',//7f screen cleaner
'rgba(10,4,10,1)',//8f corruption background
'rgb(40,145,160)',//9f bullet color
'#F66', //10 button start again
'#69F', //11 button twitter
'#32F', //12 button facebook
'#6FF',  //13 button fire to start& controls
'#066',  //14 stroke line buttons
'#0FF', //15 hit enemy strokeline
'#66A', //16 enemy stroke release
'#559',  //17 enemy stroke charging,
'#F6F', //18 colors glow ,
'#2F2', //19 score color,
'#90702F',//20 message color1
'#D6AE45',//21 message color1,
'rgba(0,0,0,0.71)',//22 darken
'rgb(5,4,13,1)'//23 splash background
];
//temp color for enemies 
for (var i = 0; i < 14; i++) {
  colors.push('hsla('+i*36+',50%,60%,0.8)');
}

function setContextAtrribute(index,attribute, custom){
  ctx[['strokeStyle','fillStyle','lineWidth'][attribute||0]] = custom||colors[index];
}
/**enemies must have colors?*/
function setRandomColor(r,r2,g,g2,b,b2,a,a2){
  var value =  'rgba('+~~getRandomValue(r,r2)+','+~~getRandomValue(g,g2)+','+~~getRandomValue(b,b2)+','+getRandomValue(a,a2)+')';
  setContextAtrribute(-1,1,value);
}