precision mediump float;
uniform vec2 dim;
uniform sampler2D t;
varying vec2 uv;
uniform float time;


// twist glitch temp
// 4 values to play...
void main (void){
   float rand = 0.3; //2.3
   float timer = 0.3; // 11.0
   float val2 = 10.00*time;  //2.5
   float val3 = 10.00*time; //167.0
   float trueWidth = dim.x;
   float trueHeight = dim.y;
   vec2 pos = uv * dim;
   vec2 texCoord = vec2(max(3.0, min(float(trueWidth), pos.x + sin(pos.y / (153.25 * rand * rand) * rand + rand * val2 + timer * 3.0) * val3)), max(3.0, min(float(trueHeight), pos.y + cos(pos.x/(251.57 * rand * rand) * rand + rand * val2 + timer * 2.4) * val3)- 3.0));
   vec4 col = texture2D(t, texCoord / dim);
   gl_FragColor.rgba = col.rgba;
}