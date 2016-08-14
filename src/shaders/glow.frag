precision mediump float;

uniform vec2 dim;
uniform sampler2D t;
varying vec2 uv;

void main (void){
   vec2 pos = uv * dim;
   vec4 col = texture2D(t, uv);
   vec4 gws = vec4(0.0);
   float weight = 1.0 / (7.0) / (7.0);
   for (int i = 0; i < 1024; i++) {
       if (i > 9) {break;}
       float miw = float(mod(float(i), 3.0));
       float idw = float(i / 3);
       vec2 v1 = vec2(pos.x + miw, pos.y + idw);
       vec2 v2 = vec2(pos.x - miw, pos.y + idw);
       vec2 v3 = vec2(pos.x + miw, pos.y - idw);
       vec2 v4 = vec2(pos.x - miw, pos.y - idw);
       gws = gws + texture2D(t, v1 / dim) * weight * 1.3;
       gws = gws + texture2D(t, v2 / dim) * weight * 1.3;
       gws = gws + texture2D(t, v3 / dim) * weight * 1.3;
       gws = gws + texture2D(t, v4 / dim) * weight * 1.3;
   }
   gl_FragColor.rgba = col + gws;
}
