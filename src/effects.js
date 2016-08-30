/*
* original script from @gre
* https://github.com/gre/behind-asteroids/blob/master/src/effects.sh
*/
function drawPostProcessing (time) {
  glSetTexture(textureGame, g);
  glitchTime--;

  glBindFBO(fbo1);
  glBindShader(badColorShader);
  gl.uniform1i(glUniformLocation(badColorShader, 't'), glBindTexture(textureGame, 0));
  gl.uniform1f(glUniformLocation(badColorShader, 'time'), (frame/60)%180);
  gl.uniform3fv(glUniformLocation(badColorShader, 'colors'), [glitchTime+1>0?1:0,glitchTime+2>0?1:0,glitchTime>0?1:0]);
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  glBindFBO(fbo2);
  glBindShader(cutShader); 
  gl.uniform1i(glUniformLocation(cutShader, 't'), glBindTexture(glGetFBOTexture(fbo1), 0));
  gl.uniform1f(glUniformLocation(cutShader, 'time'), glitchTime>0?15:0); // instantes cortos 
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  glBindFBO(fbo1);
  glBindShader(twistShader);
  gl.uniform1i(glUniformLocation(twistShader, 't'), glBindTexture(glGetFBOTexture(fbo2), 0));
  gl.uniform1f(glUniformLocation(twistShader, 'time'), glitchTime+1>0?1:0); // instantes cortos 
  gl.drawArrays(gl.TRIANGLES, 0, 6);

// swell for effects
  glBindFBO(fbo2);
  glBindShader(swellShader);
  gl.uniform1i(glUniformLocation(swellShader, 't'), glBindTexture(glGetFBOTexture(fbo1), 0));
  gl.uniform1f(glUniformLocation(swellShader, 'rand'), -0.5); // instantes cortos
  gl.drawArrays(gl.TRIANGLES, 0, 6);
//
  glBindFBO(fbo1);
  glBindShader(slitShader);
  gl.uniform1i(glUniformLocation(slitShader, 't'), glBindTexture(glGetFBOTexture(fbo2), 0));
  gl.uniform1f(glUniformLocation(slitShader, 'slit_h'), glitchTime>0?9:1); //instantes cortos
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  // glow 
  glBindFBO(fbo2);
  glBindShader(glowShader);
  gl.uniform1i(glUniformLocation(glowShader, 't'), glBindTexture(glGetFBOTexture(fbo1), 0));
  gl.uniform1f(glUniformLocation(glowShader, 'time'), (frame));
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  glBindFBO(fbo1);
  glBindShader(crtShader);
  gl.uniform1i(glUniformLocation(crtShader, 't'), glBindTexture(glGetFBOTexture(fbo2), 0));
  gl.drawArrays(gl.TRIANGLES, 0, 6);

 
  // Final draw
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  gl.flush();
}
