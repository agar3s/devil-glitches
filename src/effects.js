/*
* original script from @gre
* https://github.com/gre/behind-asteroids/blob/master/src/effects.sh
*/

function setFrameBuffer(param1, param2, shader,time,colors){
  glBindFBO(param1);
  glBindShader(shader);
  gl.uniform1i(glUniformLocation(shader, 'tex'), glBindTexture(param2, 0));
  if(time!=undefined){
    gl.uniform1f(glUniformLocation(shader, 'time'), time);
  }
  if(colors){
    gl.uniform3fv(glUniformLocation(shader, 'colors'),colors);
  }
  gl.drawArrays(gl.TRIANGLES, 0, 6);  
}
function drawPostProcessing (time) {
  glSetTexture(textureGame, g);
  glitchTime--;
  for (var i = 0; i < GLITCHS.length; i++){GLITCHS[i]--;}

  setFrameBuffer(fbo1,textureGame, badColorShader, (frame/60)%180, [(glitchTime+1>0||GLITCHS[0]>0)?1:0,(glitchTime+2>0||GLITCHS[1]>0)?1:0,(glitchTime>0||GLITCHS[2]>0)?1:0]);
  setFrameBuffer(fbo2,glGetFBOTexture(fbo1), cutShader, (glitchTime>0||GLITCHS[3]>0)?15:0);

  setFrameBuffer(fbo1, glGetFBOTexture(fbo2), twistShader, (glitchTime+1>0||GLITCHS[4]>0)?1:0);
  // swell free for effects 
  setFrameBuffer(fbo2, glGetFBOTexture(fbo1), swellShader, (GLITCHS[7]>0&&frame%3==0)?0:1);
  setFrameBuffer(fbo1, glGetFBOTexture(fbo2),slitShader, (glitchTime>0||GLITCHS[5]>0)?9:1);
  // glow
  setFrameBuffer(fbo2, glGetFBOTexture(fbo1), glowShader, frame);
  setFrameBuffer(fbo1,glGetFBOTexture(fbo2), crtShader);

 
  // Final draw
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  gl.flush();
}
