precision mediump float;
uniform vec2 dim;
uniform sampler2D t;
varying vec2 uv;
uniform float time;

// bad color
// play with rand,
// and colors to display, rgb, rb, rg, gb, r, g, b
// this glitch requires a black cortain like the one in gameover
// void main (void){
//    float rand = 6.1;
//    vec4 col = texture2D(t, uv);
//    vec4 col_r = texture2D(t, uv + vec2((-35.0 / dim.x), 0));
//    vec4 col_l = texture2D(t, uv + vec2((35.0 / dim.x), 0));
//    vec4 col_g = texture2D(t, uv + vec2((-7.5 / dim.x), 0));
//    col.r = col.r + col_l.r * max(1.0, sin(uv.y * dim.y * 1.2) * 2.5) * rand;
//    col.b = col.b + col_r.b * max(1.0, sin(uv.y * dim.y * 1.2) * 2.5) * rand;
//    col.g = col.g + col_g.g * max(1.0, sin(uv.y * dim.y * 1.2) * 2.5) * rand;
//    gl_FragColor.rgba = col.rgba;
// }

// cut slide nice glitch!
// play with rand and val1 val2
// void main (void){
//    float rand = 20.33;
//    float val1 = 8.0;
//    float val2 = 6.0;
//    vec2 pos = uv * dim;
//    vec2 posOffset = pos + vec2(floor(sin(pos.y / val1 * rand + rand * rand)) * val2 * rand, 0);
//    posOffset = posOffset / dim;
//    vec4 col = texture2D(t, posOffset);
//    gl_FragColor.rgba = col.rgba;
// }

// twist glitch temp
// 4 values to play...
// void main (void){
//    float rand = 2.33;
//    float timer = 11.0;
//    float val2 = 2.5;
//    float val3 = 167.0;
//    float trueWidth = dim.x;
//    float trueHeight = dim.y;
//    vec2 pos = uv * dim;
//    vec2 texCoord = vec2(max(3.0, min(float(trueWidth), pos.x + sin(pos.y / (153.25 * rand * rand) * rand + rand * val2 + timer * 3.0) * val3)), max(3.0, min(float(trueHeight), pos.y + cos(pos.x/(251.57 * rand * rand) * rand + rand * val2 + timer * 2.4) * val3)- 3.0));
//    vec4 col = texture2D(t, texCoord / dim);
//    gl_FragColor.rgba = col.rgba;
// }

// swell glitch temp
// void main (void){
//    float timer = 0.0;
//    float rand = 0.52;
//    vec2 pos = uv * dim;
//    vec2 sampleFrom = (pos + vec2(sin(pos.y * 0.03 + timer * 20.0) * (6.0 + 12.0 * rand), 0)) / dim;
//    vec4 col_s = texture2D(t, sampleFrom);
//    gl_FragColor.rgba = col_s.rgba;
// }

// SlitScanFilter
// play with slit_h
// void main (void){
//    float slit_h = 3.2;
//    vec2 pos = uv * dim;
//    vec2 texCoord = vec2(3.0+floor(pos.x/slit_h)*slit_h ,pos.y);
//    vec4 col = texture2D(t, texCoord / dim);
//    gl_FragColor.rgba = col.rgba;
// } 


// test 1
// the glitch


void main (void){ 
   vec2 coord = uv * dim;
   vec4 col = texture2D(t, uv);
   gl_FragColor = col.rgba;
}