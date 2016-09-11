precision highp float;
uniform vec2 dim;
uniform sampler2D tex;
varying vec2 uv;
uniform float time;
uniform vec3 colors;

void main() {
    vec2 coord = uv * dim;
    coord -= dim/2.;
    float dis = length(coord);
    if (dis < 600.) {
        float percent = dis / 600.;
        coord *= mix(1., smoothstep(0.0, 600. / dis, percent), .125);
    }
    coord += dim/2.;
    vec4 color = texture2D(tex, coord / dim);

    float dist = distance(uv, vec2(.5, .5));
    color.rgb *= smoothstep(.8, .2*.8, dist);

    gl_FragColor = color;

}
