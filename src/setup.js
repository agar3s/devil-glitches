/*
* original setup script from @gre 
* https://github.com/gre/behind-asteroids/blob/master/src/setup.js
*/
if(DEBUG){
  var _fps_ = new Stats();
  var _processing_ = new Stats();
  var _memory_ = new Stats();
  var _enemies_ = new Stats();
  var enemiesPanel = _enemies_.addPanel( new Stats.Panel( 'enemies', '#ff8', '#221' ) );
  _fps_.dom.style.left = '0px';
  _processing_.dom.style.left = '100px';
  _memory_.dom.style.left = '200px';
  _enemies_.dom.style.left = '300px';
  _fps_.showPanel(0);
  _processing_.showPanel(1);
  _memory_.showPanel(2);
  _enemies_.showPanel(3);
  document.body.appendChild(_fps_.dom);
  document.body.appendChild(_processing_.dom);
  document.body.appendChild(_memory_.dom);
  document.body.appendChild(_enemies_.dom);
  console.log('new loaded', new Date())
}
var glprops = {preserveDrawingBuffer: true};
var gl = c.getContext('webgl',glprops) || c.getContext('experimental-webgl', glprops),
  ctx = g.getContext('2d'),
  FW = 800,
  FH = 600,
  GAME_MARGIN = 0,
  GAME_Y_MARGIN = GAME_MARGIN,
  GAME_INC_PADDING = 80,
  W = FW - 2 * GAME_MARGIN,
  H = FH - 2 * GAME_Y_MARGIN,
  borderLength = 2*(W+H+2*GAME_INC_PADDING),
  storage = localStorage,
  shakeScreen=[0,0],
  glitchTime = 0,
  frame=0,
  GLITCHS=[0,0,0,0,0,0,0],
  godMode = false,
  godModeAvailable = !!storage.getItem('agar3sjs13k-gm'),
  startFromGodMode = false;
// DOM setup 
d.style.webkitTransformOrigin = d.style.transformOrigin = "0 0";

g.width = c.width = W;
g.height = c.height = H;
c.style.top = GAME_Y_MARGIN + "px";
c.style.left = GAME_MARGIN + "px";
document.oncontextmenu = function (e) {
  e.preventDefault();
};


// WebGL setup
gl.viewport(0, 0, W, H);
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

var buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  -1.0, -1.0,
  1.0, -1.0,
  -1.0,  1.0,
  -1.0,  1.0,
  1.0, -1.0,
  1.0,  1.0
]), gl.STATIC_DRAW);

var glowShader = glCreateShader(STATIC_VERT, GLOW_FRAG);
gl.uniform2f(glUniformLocation(glowShader, 'dim'), W, H);
var crtShader = glCreateShader(STATIC_VERT, CRT_FRAG);
gl.uniform2f(glUniformLocation(crtShader, 'dim'), W, H);
var badColorShader = glCreateShader(STATIC_VERT, BADCOLOR_FRAG);
gl.uniform2f(glUniformLocation(badColorShader, 'dim'), W, H);
var cutShader = glCreateShader(STATIC_VERT, CUT_FRAG);
gl.uniform2f(glUniformLocation(cutShader, 'dim'), W, H);
var twistShader = glCreateShader(STATIC_VERT, TWIST_FRAG);
gl.uniform2f(glUniformLocation(twistShader, 'dim'), W, H);
var swellShader = glCreateShader(STATIC_VERT, SWELL_FRAG);
gl.uniform2f(glUniformLocation(swellShader, 'dim'), W, H);
var slitShader = glCreateShader(STATIC_VERT, SLIT_FRAG);
gl.uniform2f(glUniformLocation(slitShader, 'dim'), W, H);


var fbo1 = glCreateFBO();
var fbo2 = glCreateFBO();

var textureGame = glCreateTexture();
