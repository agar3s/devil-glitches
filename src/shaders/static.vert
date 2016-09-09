attribute vec2 p;
varying vec2 uv;

void main() {
  gl_Position = vec4(p,.0,1.);
  uv = .5 * (p+1.);
}
