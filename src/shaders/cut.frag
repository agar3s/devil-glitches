precision mediump float;
uniform vec2 dim;
uniform sampler2D t;
varying vec2 uv;
uniform float time;

// cut slide nice glitch!
// play with rand and val1 val2 
void main (void){
   float val1 = 5.0;
   float val2 = 0.5;
   vec2 pos = uv * dim;
   vec2 posOffset = pos + vec2(floor(sin(pos.y / val1 * time + time * time)) * val2 * time, 0);
   posOffset = posOffset / dim;
   vec4 col = texture2D(t, posOffset);
   gl_FragColor.rgba = col.rgba;
}