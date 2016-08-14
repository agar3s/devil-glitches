
function drawPostProcessing () {
  glSetTexture(textureGame, g);

  // glow
  glBindFBO(fbo1);
  glBindShader(glowShader);
  gl.uniform1i(glUniformLocation(glowShader, 't'), glBindTexture(textureGame, 0));
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  glBindFBO(fbo2);
  glBindShader(crtShader);
  gl.uniform1i(glUniformLocation(crtShader, 't'), glBindTexture(glGetFBOTexture(fbo1), 0));
  gl.drawArrays(gl.TRIANGLES, 0, 6);


  // Final draw
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  //glBindShader(gameShader);
  //gl.uniform1i(glUniformLocation(gameShader, "G"), glBindTexture(glGetFBOTexture(laserFbo), 0));
  //gl.uniform1i(glUniformLocation(gameShader, "R"), glBindTexture(glGetFBOTexture(persistenceFbo), 1));
  //gl.uniform1i(glUniformLocation(gameShader, "B"), glBindTexture(glGetFBOTexture(fbo2), 2));
  //gl.uniform1i(glUniformLocation(gameShader, "L"), glBindTexture(glGetFBOTexture(glareFbo), 3));
  //gl.uniform1i(glUniformLocation(gameShader, "E"), glBindTexture(glGetFBOTexture(playerFbo), 4));
  //gl.uniform1f(glUniformLocation(gameShader, "s"),
  //  !player ? smoothstep(-4000, -3000, playingSince) : 1);
  //gl.uniform1f(glUniformLocation(gameShader, "F"),
  //  smoothstep(300, 0, t-lastLoseShot) +
  //  !gameOver && lifes>4 ? 0.5 * smoothstep(-1, 1, Math.cos(0.01*t)) : 0);
  //gl.uniform2f(glUniformLocation(gameShader, "k"), shaking[0], shaking[1]);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}
