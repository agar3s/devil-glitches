precision highp float;
uniform vec2 dim;
uniform sampler2D tex;
varying vec2 uv;
uniform float time;
uniform vec3 colors;

// twist glitch temp
// 4 values to play...
void main (){
   float rand = .3; //2.3
   float timer = .3; // 11.0
   float val2 = 10.*time;  //2.5
   float val3 = 10.*time; //167.0
   float trueWidth = dim.x;
   float trueHeight = dim.y;
   vec2 pos = uv * dim;
   vec2 texCoord = vec2(max(3., min(float(trueWidth), pos.x + sin(pos.y / (153.25 * rand * rand) * rand + rand * val2 + timer * 3.) * val3)), max(3., min(float(trueHeight), pos.y + cos(pos.x/(251.57 * rand * rand) * rand + rand * val2 + timer * 2.4) * val3)- 3.));
   vec4 col = texture2D(tex, texCoord / dim);
   gl_FragColor.rgba = col.rgba;
}