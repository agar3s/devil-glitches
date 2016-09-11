precision highp float;
uniform vec2 dim;
uniform sampler2D tex;
varying vec2 uv;
uniform float time;
uniform vec3 colors;

// effects for enemies, totems and corruption
void main (){
   vec4 col_s = texture2D(tex, uv);
   if(time==.0){
   	gl_FragColor.rgba = col_s.bgra;
   }else{
   	gl_FragColor.rgba = col_s.rgba;
   }
   
}
