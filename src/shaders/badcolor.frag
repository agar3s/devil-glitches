precision highp float;
uniform vec2 dim;
uniform sampler2D tex;
varying vec2 uv;
uniform float time;
uniform vec3 colors;

// bad color
// play with rand,
// and colors to display, rgb, rb, rg, gb, r, g, b
// this glitch requires a black cortain like the one in gameover
void main (){
  float rand = sin(time);
  vec4 col = texture2D(tex, uv);
  vec4 col_r = texture2D(tex, uv + vec2((-15. / dim.x), 0));
  vec4 col_l = texture2D(tex, uv + vec2((15. / dim.x), 0));
  vec4 col_g = texture2D(tex, uv + vec2((-7.5 / dim.x), 0));
  if(colors.r==1.){
    col.r = col.r + col_l.r * max(1., sin(uv.y * dim.y * 1.2)) * rand;
  }
  if(colors.g==1.){
   col.b = col.b + col_r.b * max(1., sin(uv.y * dim.y * 1.2)) * rand;
  }
  if(colors.b==1.){
   col.g = col.g + col_g.g * max(1., sin(uv.y * dim.y * 1.2)) * rand;
  }
   gl_FragColor.rgba = col.rgba;
}