if(DEBUG){
  var _fps_ = new Stats();
  var _processing_ = new Stats();
  var _memory_ = new Stats();
  _fps_.dom.style.left = '0px';
  _processing_.dom.style.left = '100px';
  _memory_.dom.style.left = '200px';
  _fps_.showPanel(0);
  _processing_.showPanel(1);
  _memory_.showPanel(2);
  document.body.appendChild(_fps_.dom);
  document.body.appendChild(_processing_.dom);
  document.body.appendChild(_memory_.dom);
}

var gl = c.getContext('webgl') || c.getContext('experimental-webgl'),
  ctx = g.getContext('2d'),
  FW = 400,
  FH = 400,
  GAME_MARGIN = 0,
  GAME_Y_MARGIN = GAME_MARGIN,
  GAME_INC_PADDING = 80,
  W = FW - 2 * GAME_MARGIN,
  H = FH - 2 * GAME_Y_MARGIN,
  borderLength = 2*(W+H+2*GAME_INC_PADDING);

// DOM setup
d.style.webkitTransformOrigin = d.style.transformOrigin = "0 0";

g.width = c.width = W;
g.height = c.height = H;
c.style.top = GAME_Y_MARGIN + "px";
c.style.left = GAME_MARGIN + "px";

var uiScale = devicePixelRatio;


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
var copyShader = glCreateShader(STATIC_VERT, COPY_FRAG);
//var laserShader = glCreateShader( STATIC_VERT, LASER_FRAG);
//var persistenceShader = glCreateShader(STATIC_VERT, PERSISTENCE_FRAG);
//var glareShader = glCreateShader(STATIC_VERT, GLARE_FRAG);
//var playerShader = glCreateShader(STATIC_VERT, PLAYER_FRAG);
//gl.uniform1f(glUniformLocation(playerShader, "S"), SEED);
//var gameShader = glCreateShader(STATIC_VERT, GAME_FRAG);

//var persistenceFbo = glCreateFBO();
//var playerFbo = glCreateFBO();
//var glareFbo = glCreateFBO();
//var laserFbo = glCreateFBO();
var fbo1 = glCreateFBO();
var fbo2 = glCreateFBO();

var textureGame = glCreateTexture();
