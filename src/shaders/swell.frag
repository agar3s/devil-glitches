precision mediump float;
uniform vec2 dim;
uniform sampler2D t;
varying vec2 uv;
uniform float time;
uniform float rand; 

// swell glitch temp
void main (void){
   float timer = 0.0;
   vec2 pos = uv * dim;
   vec2 sampleFrom = (pos + vec2(sin(pos.y * 0.03 + timer * 20.0) * (6.0 + 12.0 * rand), 0)) / dim;
   vec4 col_s = texture2D(t, sampleFrom);
   gl_FragColor.rgba = col_s.rgba;
}
