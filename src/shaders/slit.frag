precision mediump float;
uniform vec2 dim;
uniform sampler2D t;
varying vec2 uv;
uniform float slit_h;

// SlitScanFilter
// play with slit_h
void main (void){
   vec2 pos = uv * dim;
   vec2 texCoord = vec2(3.0+floor(pos.x/slit_h)*slit_h ,pos.y);
   vec4 col = texture2D(t, texCoord / dim);
   gl_FragColor.rgba = col.rgba;
} 
