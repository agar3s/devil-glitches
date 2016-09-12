// colors
var colors = [
'#FFF',//0 white
'rgba(40,77,153,0.6)', //1 normal
'rgba(234,34,37,0.6)',//2 corruption or  'rgba(231,197,11,0.3)';
'rgba(180,0,50,0.3)',//3 red eye for flower of life
'#F952FF',//4 cursor color
'rgba(0,77,153,0.6)',//5 soft  white line to glow 
'rgb(72,255,206)',//6 hero
'rgba(0,0,0,0.1)',//7f screen cleaner
'rgba(7,8,12,0.2)',// 8f corruption background
'rgb(40,145,160)',//9f bullet color
'#F66', //10 button start again
'#69F', //11 button twitter
'#32F', //12 button facebook
'#6FF',  //13 button fire to start& controls
'#066',  //14 stroke line buttons
'#0FF', //15 hit enemy strokeline
'rgba(235,118,71,0.8)', //16 enemy stroke release
'#559',  //17 enemy stroke charging,
'#F6F', //18 colors glow ,
'#2F2', //19 score color,
'#000',//20 message color1 
'#973',//21 message color1,
'rgba(0,0,0,0.71)',//22 darken
'rgb(2,1,2)',//23 splash background
'rgba(255,102,192,0.8)',//24 enemy 1
'rgba(255,102,102,0.8)',//25 enemy 2
//'rgba(235,118,71,0.8)',//25 enemy 2
'rgba(252,233,128,0.8)',//26 enemy 3
'rgba(150,127,254,0.8)',//27 enemy 4
'rgba(179,72,108,0.8)',//28 enemy 5 guardian
'rgba(179,88,52,0.8)',//29 enemy 6 bullet
'rgba(128,108,26,0.8)',//30 enemy 7
'rgba(128,155,15,0.8)',//31 enemy 8
'rgba(128,131,51,0.8)',//32 enemy 9
'hsla(324,50%, 60%, 0.88)',//33 enemy 10
'hsla(360,50%, 60%, 0.88)',//34 enemy 11
'hsla(10,50%, 60%, 0.88)',//35 enemy 12
'hsla(20,50%, 60%, 0.88)',//36 enemy 13
'hsla(30,50%, 60%, 0.88)',//37 enemy 14
'rgba(7,8,12,0.2)'  //38
];

function setContextAtrribute(index,attribute, custom){
  ctx[['strokeStyle','fillStyle','lineWidth'][attribute||0]] = custom||colors[index];
}
/**enemies must have colors?*/
function setRandomColor(r,r2,g,g2,b,b2,a,a2){
  var value =  'rgba('+~~getRandomValue(r,r2)+','+~~getRandomValue(g,g2)+','+~~getRandomValue(b,b2)+','+getRandomValue(a,a2)+')';
  setContextAtrribute(-1,1,value);
}