precision highp float;
uniform vec2 dim;
uniform sampler2D tex;
varying vec2 uv;
uniform float time;
uniform vec3 colors;

// cut slide nice glitch!
// play with rand and val1 val2 
void main (){
   float val1 = 5.;
   float val2 = .5;
   vec2 pos = uv * dim;
   vec2 posOffset = pos + vec2(floor(sin(pos.y / val1 * time + time * time)) * val2 * time, 0);
   posOffset = posOffset / dim;
   vec4 col = texture2D(tex, posOffset);
   gl_FragColor.rgba = col.rgba;
}