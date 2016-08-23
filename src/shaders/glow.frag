precision highp float;

uniform vec2 dim;
uniform sampler2D t;
varying vec2 uv;
uniform float time;

void main (){ 
   vec2 pos = uv * dim;
   vec4 col = texture2D(t, uv);
   vec4 gws = vec4(0.0);
   float rand = 0.02*sin(time)+0.25;
   float weight = 0.035;
   
   //glow
   for (int i = 0; i <9; i++) {
     float miw = float(mod(float(i), 4.0));
     float idw = float(i / 3);
     vec2 v1 = vec2(pos.x + miw, pos.y + idw);
     vec2 v2 = vec2(pos.x - miw, pos.y + idw);
     vec2 v3 = vec2(pos.x + miw, pos.y - idw);
     vec2 v4 = vec2(pos.x - miw, pos.y - idw);
     gws += texture2D(t, v1 / dim) * weight * 1.8;
     gws += texture2D(t, v2 / dim) * weight * 1.3;
     gws += texture2D(t, v3 / dim) * weight * 1.5;
     gws += texture2D(t, v4 / dim) * weight * 1.3;
   }
   col = col + gws;

   // chromatic distorsion
   vec4 col_r = texture2D(t, uv + vec2((-15.0 / dim.x) * rand, 0));
   vec4 col_l = texture2D(t, uv + vec2((8.0 / dim.x) * rand, 0));
   vec4 col_g = texture2D(t, uv + vec2((-7.5 / dim.x) * rand, 0));
   col.r = col.r + col_l.r * max(1.0, sin(uv.y * dim.y * 1.2) * 2.5) * rand;
   col.b = col.b + col_r.b * max(1.0, sin(uv.y * dim.y * 1.2) * 2.5) * rand;
   col.g = col.g + col_g.g * max(1.0, sin(uv.y * dim.y * 1.2) * 2.5) * rand;

   // Noise color using random number.
   vec2 pos2 = uv*sin(time);
   float r = fract(sin(dot(pos2.xy ,vec2(12.9898,78.233))) * 43758.5453);
   vec3 noise = vec3(r);
   col.rgb = mix(col.rgb, noise, 0.08);



   gl_FragColor.rgba = col;
}
