precision mediump float;
uniform vec2 dim;
uniform sampler2D tex;
varying vec2 uv;
uniform float time;
uniform float rand; 

// effects for enemies, totems and corruption
void main (void){
   vec4 col_s = texture2D(tex, uv);
   gl_FragColor.rgba = col_s.rgba;
}
