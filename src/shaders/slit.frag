precision highp float;
uniform vec2 dim;
uniform sampler2D tex;
varying vec2 uv;
uniform float time;
uniform vec3 colors;

// SlitScanFilter
// play with time
void main (){
   vec2 pos = uv * dim;
   vec2 texCoord = vec2(3.+floor(pos.x/time)*time ,pos.y);
   vec4 col = texture2D(tex, texCoord / dim);
   gl_FragColor.rgba = col.rgba;
} 
