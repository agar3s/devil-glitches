precision highp float;

uniform sampler2D t;
uniform vec2 dim;
varying vec2 uv;

void main() {
    vec2 coord = uv * dim;
    coord -= dim/2.0;
    float dis = length(coord);
    if (dis < 600.0) {
        float percent = dis / 600.0;
        coord *= mix(1.0, smoothstep(0.0, 600.0 / dis, percent), 0.125);
    }
    coord += dim/2.0;
    vec4 color = texture2D(t, coord / dim);

    float dist = distance(uv, vec2(0.5, 0.5));
    color.rgb *= smoothstep(0.8, 0.35 * 0.799, dist);

    gl_FragColor = color;

    vec2 clampedCoord = clamp(coord, vec2(0.0), dim);
}
