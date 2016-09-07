/* global jsfxr */

var audioCtx, audioDest, audio, play; // eslint-disable-line

var AudioContext = window.AudioContext || window.webkitAudioContext;

if (AudioContext) {
  audioCtx = new AudioContext();
  audioDest = audioCtx.createDynamicsCompressor();
  var gain = audioCtx.createGain();
  gain.gain.value = !!window.chrome?0.2:0.4;
  audioDest.connect(gain);
  gain.connect(audioCtx.destination);

  audio = function (conf) { // eslint-disable-line no-unused-vars
    var o = [];
    jsfxr(conf, audioCtx, function (buf) {
      o.push(buf);
    });
    return o;
  };
  play = function (o) { // eslint-disable-line no-unused-vars
    if (!o[0]) return;
    var source = audioCtx.createBufferSource();
    //o[0].sampleRate+=Math.round(Math.random()*500)
    source.context.sampleRate+=~~getRandomValue(500);
    source.buffer = o[0];
    source.start(0);
    source.connect(audioDest);
    setTimeout(function () {
      source.disconnect(audioDest);
    }, o[0].duration * 1000 + 300);
  };
}
else {
  audio = play = function(){};
}
