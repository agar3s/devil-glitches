precision highp float;

uniform vec2 dim;
uniform sampler2D t;
varying vec2 uv;
uniform float time;
 
void main (void){ 
   vec2 pos = uv * dim;
   vec4 col = texture2D(t, uv);
   vec4 gws = vec4(0.0);
   float rand = 0.02*sin(time)+0.35;
   float weight = 1.0 / (7.0) / (7.0); 
  
   vec4 col_r = texture2D(t, uv + vec2((-15.0 / dim.x) * rand, 0));
   vec4 col_l = texture2D(t, uv + vec2((8.0 / dim.x) * rand, 0));
   vec4 col_g = texture2D(t, uv + vec2((-7.5 / dim.x) * rand, 0));
   col.r = col.r + col_l.r * max(1.0, sin(uv.y * dim.y * 1.2) * 2.5) * rand;
   col.b = col.b + col_r.b * max(1.0, sin(uv.y * dim.y * 1.2) * 2.5) * rand;
   col.g = col.g + col_g.g * max(1.0, sin(uv.y * dim.y * 1.2) * 2.5) * rand;

   for (int i = 0; i < 1024; i++) {
       if (i > 9) {break;}
       float miw = float(mod(float(i), 4.0));
       float idw = float(i / 3);
       vec2 v1 = vec2(pos.x + miw, pos.y + idw);
       vec2 v2 = vec2(pos.x - miw, pos.y + idw);
       vec2 v3 = vec2(pos.x + miw, pos.y - idw);
       vec2 v4 = vec2(pos.x - miw, pos.y - idw);
       gws = gws + texture2D(t, v1 / dim) * weight * 1.8;
       gws = gws + texture2D(t, v2 / dim) * weight * 1.3;
       gws = gws + texture2D(t, v3 / dim) * weight * 1.5;
       gws = gws + texture2D(t, v4 / dim) * weight * 1.3;
   }
   gl_FragColor.rgba = col + gws;
}
