(function(){
const DEBUG = true; // eslint-disable-line no-unused-vars testing
// stats.js - http://github.com/mrdoob/stats.js
var Stats=function(){function h(a){c.appendChild(a.dom);return a}function k(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();k(++l%c.children.length)},!1);var g=(performance||Date).now(),e=g,a=0,r=h(new Stats.Panel("FPS","#0ff","#002")),f=h(new Stats.Panel("MS","#0f0","#020"));
if(self.performance&&self.performance.memory)var t=h(new Stats.Panel("MB","#f08","#201"));k(0);return{REVISION:16,dom:c,addPanel:h,showPanel:k,begin:function(){g=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();f.update(c-g,200);if(c>e+1E3&&(r.update(1E3*a/(c-e),100),e=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){g=this.end()},domElement:c,setMode:k}};
Stats.Panel=function(h,k,l){var c=Infinity,g=0,e=Math.round,a=e(window.devicePixelRatio||1),r=80*a,f=48*a,t=3*a,u=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=f;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,f);b.fillStyle=k;b.fillText(h,t,u);b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(f,
v){c=Math.min(c,f);g=Math.max(g,f);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=k;b.fillText(e(f)+" "+h+" ("+e(c)+"-"+e(g)+")",t,u);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,e((1-f/v)*p))}}};"object"===typeof module&&(module.exports=Stats);

function getAngle(p1, p2){
  return Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
}

function getHypo(p1, p2){
  return Math.sqrt(p1*p1+p2*p2)
}/*
* original script from @gre 
* https://github.com/gre/behind-asteroids/blob/master/src/lib/webgl.sh
*/
function glCreateShader (vert, frag) {
  var handle, type = gl.VERTEX_SHADER, src = vert;
  handle = gl.createShader(type);
  gl.shaderSource(handle, src);
  gl.compileShader(handle);
  var vertex = handle;

  if (DEBUG) {
    if (!gl.getShaderParameter(handle, gl.COMPILE_STATUS))
      throw gl.getShaderInfoLog(handle);
  }

  type = gl.FRAGMENT_SHADER;
  src = frag;
  handle = gl.createShader(type);
  gl.shaderSource(handle, src);
  gl.compileShader(handle);
  var fragment = handle;

  if (DEBUG) {
    if (!gl.getShaderParameter(handle, gl.COMPILE_STATUS))
      throw gl.getShaderInfoLog(handle);
  }

  var program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);

  if (DEBUG) {
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
      throw gl.getProgramInfoLog(program);
  }

  gl.useProgram(program);
  var p = gl.getAttribLocation(program, "p");
  gl.enableVertexAttribArray(p);
  gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0);
  return [program];
}
function glBindShader (shader) {
  gl.useProgram(shader[0]);
}
function glUniformLocation(shader, name) {
  return shader[name] || (shader[name] = gl.getUniformLocation(shader[0], name));
}
function glCreateTexture () {
  var tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return tex;
}
function glSetTexture (t, value) {
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, value);
}
function glBindTexture (t, unit) {
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, t);
  return unit;
}
function glCreateFBO () {
  var handle = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, handle);
  var color = glCreateTexture();
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, W, H, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, color, 0);
  return [handle, color];
}
function glBindFBO (fbo) {
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo[0]);
}
function glGetFBOTexture (fbo) {
  return fbo[1];
}
/**
 * SfxrParams
 *
 * Copyright 2010 Thomas Vian
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author Thomas Vian
 */

 /* eslint-disable */

/** @constructor */
function SfxrParams() {
  //--------------------------------------------------------------------------
  //
  //  Settings String Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Parses a settings array into the parameters
   * @param array Array of the settings values, where elements 0 - 23 are
   *                a: waveType
   *                b: attackTime
   *                c: sustainTime
   *                d: sustainPunch
   *                e: decayTime
   *                f: startFrequency
   *                g: minFrequency
   *                h: slide
   *                i: deltaSlide
   *                j: vibratoDepth
   *                k: vibratoSpeed
   *                l: changeAmount
   *                m: changeSpeed
   *                n: squareDuty
   *                o: dutySweep
   *                p: repeatSpeed
   *                q: phaserOffset
   *                r: phaserSweep
   *                s: lpFilterCutoff
   *                t: lpFilterCutoffSweep
   *                u: lpFilterResonance
   *                v: hpFilterCutoff
   *                w: hpFilterCutoffSweep
   *                x: masterVolume
   * @return If the string successfully parsed
   */
  this.ss = function(values)
  {
    for ( var i = 0; i < 24; i++ )
    {
      this[String.fromCharCode( 97 + i )] = values[i] || 0;
    }

    // I moved this here from the r(true) function
    if (this['c'] < .01) {
      this['c'] = .01;
    }

    var totalTime = this['b'] + this['c'] + this['e'];
    if (totalTime < .18) {
      var multiplier = .18 / totalTime;
      this['b']  *= multiplier;
      this['c'] *= multiplier;
      this['e']   *= multiplier;
    }
  }
}

/**
 * SfxrSynth
 *
 * Copyright 2010 Thomas Vian
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author Thomas Vian
 */
/** @constructor */
function SfxrSynth() {
  // All variables are kept alive through function closures

  //--------------------------------------------------------------------------
  //
  //  Sound Parameters
  //
  //--------------------------------------------------------------------------

  this._p = new SfxrParams();  // Params instance

  //--------------------------------------------------------------------------
  //
  //  Synth Variables
  //
  //--------------------------------------------------------------------------

  var _envelopeLength0, // Length of the attack stage
      _envelopeLength1, // Length of the sustain stage
      _envelopeLength2, // Length of the decay stage

      _period,          // Period of the wave
      _maxPeriod,       // Maximum period before sound stops (from minFrequency)

      _slide,           // Note slide
      _deltaSlide,      // Change in slide

      _changeAmount,    // Amount to change the note by
      _changeTime,      // Counter for the note change
      _changeLimit,     // Once the time reaches this limit, the note changes

      _squareDuty,      // Offset of center switching point in the square wave
      _dutySweep;       // Amount to change the duty by

  //--------------------------------------------------------------------------
  //
  //  Synth Methods
  //
  //--------------------------------------------------------------------------

  /**
   * rs the runing variables from the params
   * Used once at the start (total r) and for the repeat effect (partial r)
   */
  this.r = function() {
    // Shorter reference
    var p = this._p;

    _period       = 100 / (p['f'] * p['f'] + .001);
    _maxPeriod    = 100 / (p['g']   * p['g']   + .001);

    _slide        = 1 - p['h'] * p['h'] * p['h'] * .01;
    _deltaSlide   = -p['i'] * p['i'] * p['i'] * .000001;

    if (!p['a']) {
      _squareDuty = .5 - p['n'] / 2;
      _dutySweep  = -p['o'] * .00005;
    }

    _changeAmount =  1 + p['l'] * p['l'] * (p['l'] > 0 ? -.9 : 10);
    _changeTime   = 0;
    _changeLimit  = p['m'] == 1 ? 0 : (1 - p['m']) * (1 - p['m']) * 20000 + 32;
  }

  // I split the r() function into two functions for better readability
  this.tr = function() {
    this.r();

    // Shorter reference
    var p = this._p;

    // Calculating the length is all that remained here, everything else moved somewhere
    _envelopeLength0 = p['b']  * p['b']  * 100000;
    _envelopeLength1 = p['c'] * p['c'] * 100000;
    _envelopeLength2 = p['e']   * p['e']   * 100000 + 12;
    // Full length of the volume envelop (and therefore sound)
    // Make sure the length can be divided by 3 so we will not need the padding "==" after base64 encode
    return ((_envelopeLength0 + _envelopeLength1 + _envelopeLength2) / 3 | 0) * 3;
  }

  /**
   * Writes the wave to the supplied buffer ByteArray
   * @param buffer A ByteArray to write the wave to
   * @return If the wave is finished
   */
  this.sw = function(buffer, length) {
    // Shorter reference
    var p = this._p;

    // If the filters are active
    var _filters = p['s'] != 1 || p['v'],
        // Cutoff multiplier which adjusts the amount the wave position can move
        _hpFilterCutoff = p['v'] * p['v'] * .1,
        // Speed of the high-pass cutoff multiplier
        _hpFilterDeltaCutoff = 1 + p['w'] * .0003,
        // Cutoff multiplier which adjusts the amount the wave position can move
        _lpFilterCutoff = p['s'] * p['s'] * p['s'] * .1,
        // Speed of the low-pass cutoff multiplier
        _lpFilterDeltaCutoff = 1 + p['t'] * .0001,
        // If the low pass filter is active
        _lpFilterOn = p['s'] != 1,
        // masterVolume * masterVolume (for quick calculations)
        _masterVolume = p['x'] * p['x'],
        // Minimum frequency before stopping
        _minFreqency = p['g'],
        // If the phaser is active
        _phaser = p['q'] || p['r'],
        // Change in phase offset
        _phaserDeltaOffset = p['r'] * p['r'] * p['r'] * .2,
        // Phase offset for phaser effect
        _phaserOffset = p['q'] * p['q'] * (p['q'] < 0 ? -1020 : 1020),
        // Once the time reaches this limit, some of the    iables are r
        _repeatLimit = p['p'] ? ((1 - p['p']) * (1 - p['p']) * 20000 | 0) + 32 : 0,
        // The punch factor (louder at begining of sustain)
        _sustainPunch = p['d'],
        // Amount to change the period of the wave by at the peak of the vibrato wave
        _vibratoAmplitude = p['j'] / 2,
        // Speed at which the vibrato phase moves
        _vibratoSpeed = p['k'] * p['k'] * .01,
        // The type of wave to generate
        _waveType = p['a'];

    var _envelopeLength      = _envelopeLength0,     // Length of the current envelope stage
        _envelopeOverLength0 = 1 / _envelopeLength0, // (for quick calculations)
        _envelopeOverLength1 = 1 / _envelopeLength1, // (for quick calculations)
        _envelopeOverLength2 = 1 / _envelopeLength2; // (for quick calculations)

    // Damping muliplier which restricts how fast the wave position can move
    var _lpFilterDamping = 5 / (1 + p['u'] * p['u'] * 20) * (.01 + _lpFilterCutoff);
    if (_lpFilterDamping > .8) {
      _lpFilterDamping = .8;
    }
    _lpFilterDamping = 1 - _lpFilterDamping;

    var _finished = false,     // If the sound has finished
        _envelopeStage    = 0, // Current stage of the envelope (attack, sustain, decay, end)
        _envelopeTime     = 0, // Current time through current enelope stage
        _envelopeVolume   = 0, // Current volume of the envelope
        _hpFilterPos      = 0, // Adjusted wave position after high-pass filter
        _lpFilterDeltaPos = 0, // Change in low-pass wave position, as allowed by the cutoff and damping
        _lpFilterOldPos,       // Previous low-pass wave position
        _lpFilterPos      = 0, // Adjusted wave position after low-pass filter
        _periodTemp,           // Period modified by vibrato
        _phase            = 0, // Phase through the wave
        _phaserInt,            // Integer phaser offset, for bit maths
        _phaserPos        = 0, // Position through the phaser buffer
        _pos,                  // Phase expresed as a Number from 0-1, used for fast sin approx
        _repeatTime       = 0, // Counter for the repeats
        _sample,               // Sub-sample calculated 8 times per actual sample, averaged out to get the super sample
        _superSample,          // Actual sample writen to the wave
        _vibratoPhase     = 0; // Phase through the vibrato sine wave

    // Buffer of wave values used to create the out of phase second wave
    var _phaserBuffer = new Array(1024),
        // Buffer of random values used to generate noise
        _noiseBuffer  = new Array(32);
    for (var i = _phaserBuffer.length; i--; ) {
      _phaserBuffer[i] = 0;
    }
    for (var i = _noiseBuffer.length; i--; ) {
      _noiseBuffer[i] = Math.random() * 2 - 1;
    }

    for (var i = 0; i < length; i++) {
      if (_finished) {
        return i;
      }

      // Repeats every _repeatLimit times, partially rting the sound parameters
      if (_repeatLimit) {
        if (++_repeatTime >= _repeatLimit) {
          _repeatTime = 0;
          this.r();
        }
      }

      // If _changeLimit is reached, shifts the pitch
      if (_changeLimit) {
        if (++_changeTime >= _changeLimit) {
          _changeLimit = 0;
          _period *= _changeAmount;
        }
      }

      // Acccelerate and apply slide
      _slide += _deltaSlide;
      _period *= _slide;

      // Checks for frequency getting too low, and stops the sound if a minFrequency was set
      if (_period > _maxPeriod) {
        _period = _maxPeriod;
        if (_minFreqency > 0) {
          _finished = true;
        }
      }

      _periodTemp = _period;

      // Applies the vibrato effect
      if (_vibratoAmplitude > 0) {
        _vibratoPhase += _vibratoSpeed;
        _periodTemp *= 1 + Math.sin(_vibratoPhase) * _vibratoAmplitude;
      }

      _periodTemp |= 0;
      if (_periodTemp < 8) {
        _periodTemp = 8;
      }

      // Sweeps the square duty
      if (!_waveType) {
        _squareDuty += _dutySweep;
        if (_squareDuty < 0) {
          _squareDuty = 0;
        } else if (_squareDuty > .5) {
          _squareDuty = .5;
        }
      }

      // Moves through the different stages of the volume envelope
      if (++_envelopeTime > _envelopeLength) {
        _envelopeTime = 0;

        switch (++_envelopeStage)  {
          case 1:
            _envelopeLength = _envelopeLength1;
            break;
          case 2:
            _envelopeLength = _envelopeLength2;
        }
      }

      // Sets the volume based on the position in the envelope
      switch (_envelopeStage) {
        case 0:
          _envelopeVolume = _envelopeTime * _envelopeOverLength0;
          break;
        case 1:
          _envelopeVolume = 1 + (1 - _envelopeTime * _envelopeOverLength1) * 2 * _sustainPunch;
          break;
        case 2:
          _envelopeVolume = 1 - _envelopeTime * _envelopeOverLength2;
          break;
        case 3:
          _envelopeVolume = 0;
          _finished = true;
      }

      // Moves the phaser offset
      if (_phaser) {
        _phaserOffset += _phaserDeltaOffset;
        _phaserInt = _phaserOffset | 0;
        if (_phaserInt < 0) {
          _phaserInt = -_phaserInt;
        } else if (_phaserInt > 1023) {
          _phaserInt = 1023;
        }
      }

      // Moves the high-pass filter cutoff
      if (_filters && _hpFilterDeltaCutoff) {
        _hpFilterCutoff *= _hpFilterDeltaCutoff;
        if (_hpFilterCutoff < .00001) {
          _hpFilterCutoff = .00001;
        } else if (_hpFilterCutoff > .1) {
          _hpFilterCutoff = .1;
        }
      }

      _superSample = 0;
      for (var j = 8; j--; ) {
        // Cycles through the period
        _phase++;
        if (_phase >= _periodTemp) {
          _phase %= _periodTemp;

          // Generates new random noise for this period
          if (_waveType == 3) {
            for (var n = _noiseBuffer.length; n--; ) {
              _noiseBuffer[n] = Math.random() * 2 - 1;
            }
          }
        }

        // Gets the sample from the oscillator
        switch (_waveType) {
          case 0: // Square wave
            _sample = ((_phase / _periodTemp) < _squareDuty) ? .5 : -.5;
            break;
          case 1: // Saw wave
            _sample = 1 - _phase / _periodTemp * 2;
            break;
          case 2: // Sine wave (fast and accurate approx)
            _pos = _phase / _periodTemp;
            _pos = (_pos > .5 ? _pos - 1 : _pos) * 6.28318531;
            _sample = 1.27323954 * _pos + .405284735 * _pos * _pos * (_pos < 0 ? 1 : -1);
            _sample = .225 * ((_sample < 0 ? -1 : 1) * _sample * _sample  - _sample) + _sample;
            break;
          case 3: // Noise
            _sample = _noiseBuffer[Math.abs(_phase * 32 / _periodTemp | 0)];
        }

        // Applies the low and high pass filters
        if (_filters) {
          _lpFilterOldPos = _lpFilterPos;
          _lpFilterCutoff *= _lpFilterDeltaCutoff;
          if (_lpFilterCutoff < 0) {
            _lpFilterCutoff = 0;
          } else if (_lpFilterCutoff > .1) {
            _lpFilterCutoff = .1;
          }

          if (_lpFilterOn) {
            _lpFilterDeltaPos += (_sample - _lpFilterPos) * _lpFilterCutoff;
            _lpFilterDeltaPos *= _lpFilterDamping;
          } else {
            _lpFilterPos = _sample;
            _lpFilterDeltaPos = 0;
          }

          _lpFilterPos += _lpFilterDeltaPos;

          _hpFilterPos += _lpFilterPos - _lpFilterOldPos;
          _hpFilterPos *= 1 - _hpFilterCutoff;
          _sample = _hpFilterPos;
        }

        // Applies the phaser effect
        if (_phaser) {
          _phaserBuffer[_phaserPos % 1024] = _sample;
          _sample += _phaserBuffer[(_phaserPos - _phaserInt + 1024) % 1024];
          _phaserPos++;
        }

        _superSample += _sample;
      }

      // Averages out the super samples and applies volumes
      _superSample *= .125 * _envelopeVolume * _masterVolume;

      // Clipping if too loud
      buffer[i] = _superSample >= 1 ? 32767 : _superSample <= -1 ? -32768 : _superSample * 32767 | 0;
    }

    return length;
  }
}

// Adapted from http://codebase.es/riffwave/
var synth = new SfxrSynth();
// Export for the Closure Compiler
function jsfxr (settings, audioCtx, cb) {
  // Initialize SfxrParams
  synth._p.ss(settings);
  // Synthesize Wave
  var envelopeFullLength = synth.tr();
  var data = new Uint8Array(((envelopeFullLength + 1) / 2 | 0) * 4 + 44);

  var used = synth.sw(new Uint16Array(data.buffer, 44), envelopeFullLength) * 2;

  var dv = new Uint32Array(data.buffer, 0, 44);
  // Initialize header
  dv[0] = 0x46464952; // "RIFF" 
  dv[1] = used + 36;  // put total size here
  dv[2] = 0x45564157; // "WAVE"
  dv[3] = 0x20746D66; // "fmt "
  dv[4] = 0x00000010; // size of the following 
  dv[5] = 0x00010001; // Mono: 1 channel, PCM format
  dv[6] = 0x0000AC44; // 44,100 samples per second
  dv[7] = 0x00015888; // byte rate: two bytes per sample
  dv[8] = !!window.chrome?0x00100002:0x00100002; // 16 bits per sample, aligned on every two bytes
  dv[9] = 0x61746164; // "data"
  dv[10] = used;      // put number of samples here

  // Base64 encoding written by me, @maettig
  used += 44;
  var i = 0,
      base64Characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
      output = 'data:audio/wav;base64,';
  for (; i < used; i += 3)
  {
    var a = data[i] << 16 | data[i + 1] << 8 | data[i + 2];
    output += base64Characters[a >> 18] + base64Characters[a >> 12 & 63] + base64Characters[a >> 6 & 63] + base64Characters[a & 63];
  }

  audioCtx && audioCtx.decodeAudioData(data.buffer, cb);

  return output;
}
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
    source.context.sampleRate+=~~(Math.random()*500)
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
/*
 * Private stuffz
 */

var enharmonics = 'B#-C|C#-Db|D|D#-Eb|E-Fb|E#-F|F#-Gb|G|G#-Ab|A|A#-Bb|B-Cb',
  middleC = 440 * Math.pow( Math.pow( 2, 1 / 12 ), -9 ),
  numeric = /^[0-9.]+$/,
  octaveOffset = 4,
  space = /\s+/,
  num = /(\d+)/,
  offsets = {};

// populate the offset lookup (note distance from C, in semitones)
enharmonics.split('|').forEach(function( val, i ) {
  val.split('-').forEach(function( note ) {
    offsets[ note ] = i;
  });
});

/*
 * Note class
 *
 * new Note ('A4 q') === 440Hz, quarter note
 * new Note ('- e') === 0Hz (basically a rest), eigth note
 * new Note ('A4 es') === 440Hz, dotted eighth note (eighth + sixteenth)
 * new Note ('A4 0.0125') === 440Hz, 32nd note (or any arbitrary
 * divisor/multiple of 1 beat)
 *
 */

// create a new Note instance from a string
function Note( str ) {
  var couple = str.split( space );
  // frequency, in Hz
  this.frequency = Note.getFrequency( couple[ 0 ] ) || 0;
  // duration, as a ratio of 1 beat (quarter note = 1, half note = 0.5, etc.)
  this.duration = Note.getDuration( couple[ 1 ] ) || 0;
}

// convert a note name (e.g. 'A4') to a frequency (e.g. 440.00)
Note.getFrequency = function( name ) {
  var couple = name.split( num ),
    distance = offsets[ couple[ 0 ] ],
    octaveDiff = ( couple[ 1 ] || octaveOffset ) - octaveOffset,
    freq = middleC * Math.pow( Math.pow( 2, 1 / 12 ), distance );
  return freq * Math.pow( 2, octaveDiff );
};

// convert a duration string (e.g. 'q') to a number (e.g. 1)
// also accepts numeric strings (e.g '0.125')
// and compund durations (e.g. 'es' for dotted-eight or eighth plus sixteenth)
Note.getDuration = function( symbol ) {
  return numeric.test( symbol ) ? parseFloat( symbol ) :
    symbol.toLowerCase().split('').reduce(function( prev, curr ) {
      return prev + ( curr === 'w' ? 4 : curr === 'h' ? 2 :
        curr === 'q' ? 1 : curr === 'e' ? 0.5 :
        curr === 's' ? 0.25 : 0 );
    }, 0 );
};

/*
 * Sequence class
 */

// create a new Sequence
function Sequence( ac, tempo, arr ) {
  this.ac = ac || new AudioContext();
  this.createFxNodes();
  this.tempo = tempo || 120;
  this.loop = true;
  this.smoothing = 0;
  this.staccato = 0;
  this.notes = [];
  this.push.apply( this, arr || [] );
}

// create gain and EQ nodes, then connect 'em
Sequence.prototype.createFxNodes = function() {
  var eq = [ [ 'bass', 100 ], [ 'mid', 1000 ], [ 'treble', 2500 ] ],
    prev = this.gain = this.ac.createGain();
  eq.forEach(function( config, filter ) {
    filter = this[ config[ 0 ] ] = this.ac.createBiquadFilter();
    filter.type = 'peaking';
    filter.frequency.value = config[ 1 ];
    prev.connect( prev = filter );
  }.bind( this ));
  prev.connect( this.ac.destination );
  return this;
};

// accepts Note instances or strings (e.g. 'A4 e')
Sequence.prototype.push = function() {
  Array.prototype.forEach.call( arguments, function( note ) {
    this.notes.push( note instanceof Note ? note : new Note( note ) );
  }.bind( this ));
  return this;
};

// create a custom waveform as opposed to "sawtooth", "triangle", etc
Sequence.prototype.createCustomWave = function( real, imag ) {
  // Allow user to specify only one array and dupe it for imag.
  if ( !imag ) {
    imag = real;
  }

  // Wave type must be custom to apply period wave.
  this.waveType = 'custom';

  // Reset customWave
  this.customWave = [ new Float32Array( real ), new Float32Array( imag ) ];
};

// recreate the oscillator node (happens on every play)
Sequence.prototype.createOscillator = function() {
  this.stop();
  this.osc = this.ac.createOscillator();

  // customWave should be an array of Float32Arrays. The more elements in
  // each Float32Array, the dirtier (saw-like) the wave is
  if ( this.customWave ) {
    this.osc.setPeriodicWave(
      this.ac.createPeriodicWave.apply( this.ac, this.customWave )
    );
  } else {
    this.osc.type = this.waveType || 'square';
  }

  this.osc.connect( this.gain );
  return this;
};

// schedules this.notes[ index ] to play at the given time
// returns an AudioContext timestamp of when the note will *end*
Sequence.prototype.scheduleNote = function( index, when ) {
  var duration = 60 / this.tempo * this.notes[ index ].duration,
    cutoff = duration * ( 1 - ( this.staccato || 0 ) );

  this.setFrequency( this.notes[ index ].frequency, when );

  if ( this.smoothing && this.notes[ index ].frequency ) {
    this.slide( index, when, cutoff );
  }

  this.setFrequency( 0, when + cutoff );
  return when + duration;
};

// get the next note
Sequence.prototype.getNextNote = function( index ) {
  return this.notes[ index < this.notes.length - 1 ? index + 1 : 0 ];
};

// how long do we wait before beginning the slide? (in seconds)
Sequence.prototype.getSlideStartDelay = function( duration ) {
  return duration - Math.min( duration, 60 / this.tempo * this.smoothing );
};

// slide the note at <index> into the next note at the given time,
// and apply staccato effect if needed
Sequence.prototype.slide = function( index, when, cutoff ) {
  var next = this.getNextNote( index ),
    start = this.getSlideStartDelay( cutoff );
  this.setFrequency( this.notes[ index ].frequency, when + start );
  this.rampFrequency( next.frequency, when + cutoff );
  return this;
};

// set frequency at time
Sequence.prototype.setFrequency = function( freq, when ) {
  this.osc.frequency.setValueAtTime( freq, when );
  return this;
};

// ramp to frequency at time
Sequence.prototype.rampFrequency = function( freq, when ) {
  this.osc.frequency.linearRampToValueAtTime( freq, when );
  return this;
};

// run through all notes in the sequence and schedule them
Sequence.prototype.play = function( when ) {
  when = typeof when === 'number' ? when : this.ac.currentTime;
  this.createOscillator();
  this.osc.start( when );

  this.notes.forEach(function( note, i ) {
    when = this.scheduleNote( i, when );
  }.bind( this ));

  this.osc.stop( when );
  this.osc.onended = this.loop ? this.play.bind( this, when ) : null;

  return this;
};

// stop playback, null out the oscillator, cancel parameter automation
Sequence.prototype.stop = function() {
  if ( this.osc ) {
    this.osc.onended = null;
    this.osc.disconnect();
    this.osc = null;
  }
  return this;
};
/**
* custom font 14 segment letter
*/
var mapLetters = '0123456789?abcdefghijklmnopqrstuvwxyz .-\'';
var letters = [8767,518,1115,1039,1126,1133,1149,7,1151,1135,5123,1143,5391,57,4367,121,113,1085,1142,4361,30,2672,56,694,2230,63,1139,2111,3187,1133,4353,62,8752,10294,10880,4736,8713,0,16,1088,256];
function drawLetter14Segments(letter, x, y, size){
  // *****
  // |\|/|
  // -- --
  // |\|/|
  // *****
  if(letter&1){
    ctx.moveTo(x+2, y-1)
    ctx.lineTo(size+x-2, y-1)
  }
  // ---
  // |\/*
  //  --
  // |\/|
  // ---
  if(letter&2){
    ctx.moveTo(size+x+1, y)
    ctx.lineTo(size+x+1, size+y-1)
  }
  // ---
  // |\/|
  //  --
  // |\/*
  // ---
  if(letter&4){
    ctx.moveTo(size+x+1, size+y+1)
    ctx.lineTo(size+x+1, size*2+y)
  }
  // ---
  // |\/|
  //  --
  // |\/|
  // ***
  if(letter&8){
    ctx.moveTo(x+2, size*2+y+1)
    ctx.lineTo(size+x-2, size*2+y+1)
  }
  // ---
  // |\/|
  //  --
  // *\/|
  // ---
  if(letter&16){
    ctx.moveTo(x-1, y+size+1)
    ctx.lineTo(x-1, y+size*2)
  }
  // ---
  // *\/|
  //  --
  // |\/|
  // ---
  if(letter&32){
    ctx.moveTo(x-1, y)
    ctx.lineTo(x-1, size+y-1)
  }
  // ---
  // |\/|
  //  *-
  // |\/|
  // ---
  if(letter&64){
    ctx.moveTo(x+2, size+y)
    ctx.lineTo(x+size/2-2, size+y)
  }
  // ---
  // |*/|
  //  --
  // |/|\|
  // ---
  if(letter&128){
    ctx.moveTo(x+2, y+2)
    ctx.lineTo(x+size/2-2, size+y-2)
  }
  // -----
  // |\*/|
  // -- --
  // |/|\|
  // -----
  if(letter&256){
    ctx.moveTo(size/2+x, y+2)
    ctx.lineTo(size/2+x, size+y-2)
  }
  // -----
  // |\|*|
  // -- --
  // |/|\|
  // -----
  if(letter&512){
    ctx.moveTo(size/2+x+2, size+y-2)
    ctx.lineTo(size+x-2, y+2)
  }
  // -----
  // |\|/|
  // -- **
  // |/|\|
  // -----
  if(letter&1024){
    ctx.moveTo(size/2+x+2, size+y)
    ctx.lineTo(size+x-2, size+y)
  }
  // -----
  // |\|/|
  // -- --
  // |/|*|
  // -----
  if(letter&2048){
    ctx.moveTo(size/2+x+2, size+y+2)
    ctx.lineTo(size+x-2, size*2+y-2)
  }
  // -----
  // |\|/|
  // -- --
  // |/*\|
  // -----
  if(letter&4096){
    ctx.moveTo(size/2+x, size+y+2)
    ctx.lineTo(size/2+x, size*2+y-2)
  }
  // -----
  // |\|/|
  // -- --
  // |*|\|
  // -----
  if(letter&8192){
    ctx.moveTo(x+2, size*2+y-2)
    ctx.lineTo(size/2+x-2, size+y+2)
  }
}
function drawWord(word, x, y, size, color){
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle=color;
  for (var i = 0; i < word.length; i++) {
    drawLetter14Segments(letters[mapLetters.indexOf(word[i])], shakeScreen[0]+x-(size+10)*(word.length-i), shakeScreen[1]+y, size);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}
function drawWordCenter(word, x, y, size, color){
  x += (size+10)*word.length/2
  drawWord(word, x, y, size, color)
}
function drawWordLeft(word, x, y, size, color){
  x += (size+10)*word.length;
  drawWord(word, x, y, size, color)
}

//ease functions from http://gizma.com/easing
var linearTween = function (t, b, c, d) {
  return c*t/d + b;
};
var easeInQuad = function (t, b, c, d) {
  t /= d;
  return c*t*t + b;
};
var easeOutQuad = function (t, b, c, d) {
  t /= d;
  return -c * t*(t-2) + b;
};

var easeOutCirc = function (t, b, c, d) {
  t /= d;
  t--;
  return c * Math.sqrt(1 - t*t) + b;
};// custom spatialhashing implementation

var spatialhashing = {};
var ceilHeight = 84;
function getHashItem(item){
  return Math.round(item[0]/ceilHeight)+'-'+Math.round(item[1]/ceilHeight);
}
/* add element to spatialhash*/
function addItem(item){
  var hash = getHashItem(item);
  spatialhashing[hash]=spatialhashing[hash]||[];
  spatialhashing[hash].push(item);
}

function getHash(x,y){
  return getHashItem([x, y]);
}
/* return elements that collides with element*/
/* only the first element that collides*/
function collideElements(item){
  var list = {};
  var elements = [];
  for (var i = 0; i < 9; i++) {
    var hash = getHash(item[0]+(i%3-1)*ceilHeight, item[1]+(~~(i/3)-1)*ceilHeight);
    if(!list[hash]){
      list[hash]=1;
      var elements = spatialhashing[hash];
      for (var i = 0; elements&&i < elements.length; i++) {
        if(getHypo(item[1]-elements[i][1], item[0]-elements[i][0])<elements[i][2]+item[2]){
          return elements[i]
        }
      }
    }
  }

}var BADCOLOR_FRAG ='precision mediump float;uniform vec2 dim;uniform sampler2D t;varying vec2 uv;uniform float time;uniform vec3 colors;void main(void){float a=sin(time);vec4 b=texture2D(t,uv);vec4 c=texture2D(t,uv+vec2((-15.0/dim.x),0));vec4 d=texture2D(t,uv+vec2((15.0/dim.x),0));vec4 e=texture2D(t,uv+vec2((-7.5/dim.x),0));if(colors.r==1.0){b.r=b.r+d.r*max(1.0,sin(uv.y*dim.y*1.2))*a;}if(colors.g==1.0){b.b=b.b+c.b*max(1.0,sin(uv.y*dim.y*1.2))*a;}if(colors.b==1.0){b.g=b.g+e.g*max(1.0,sin(uv.y*dim.y*1.2))*a;}gl_FragColor.rgba=b.rgba;}';
var CRT_FRAG ='precision highp float;uniform sampler2D t;uniform vec2 dim;varying vec2 uv;void main(){vec2 a=uv*dim;a-=dim/2.0;float b=length(a);if(b<600.0){float c=b/600.0;a*=mix(1.0,smoothstep(0.0,600.0/b,c),0.125);}a+=dim/2.0;vec4 d=texture2D(t,a/dim);float e=distance(uv,vec2(0.5,0.5));d.rgb*=smoothstep(0.8,0.35*0.799,e);gl_FragColor=d;}';
var CUT_FRAG ='precision mediump float;uniform vec2 dim;uniform sampler2D t;varying vec2 uv;uniform float time;void main(void){float a=5.0;float b=0.5;vec2 c=uv*dim;vec2 d=c+vec2(floor(sin(c.y/a*time+time*time))*b*time,0);d=d/dim;vec4 e=texture2D(t,d);gl_FragColor.rgba=e.rgba;}';
var GLOW_FRAG ='precision highp float;uniform vec2 dim;uniform sampler2D t;varying vec2 uv;uniform float time;void main(){vec2 a=uv*dim;vec4 b=texture2D(t,uv);vec4 c=vec4(0.0);float d=0.02*sin(time)+0.29;float e=0.03;vec4 f=texture2D(t,uv+vec2((-15.0/dim.x)*d,0));for(int g=0;g<9;g++){float h=float(mod(float(g),4.0));float i=float(g/3);vec2 j=vec2(a.x+h,a.y+i);vec2 k=vec2(a.x-h,a.y+i);vec2 l=vec2(a.x+h,a.y-i);vec2 m=vec2(a.x-h,a.y-i);c+=texture2D(t,j/dim)*e;c+=texture2D(t,k/dim)*e;c+=texture2D(t,l/dim)*e;c+=texture2D(t,m/dim)*e;}b+=c;vec4 n=texture2D(t,uv+vec2((8.0/dim.x)*d,0));vec4 o=texture2D(t,uv+vec2((-7.5/dim.x)*d,0));b.r=b.r+n.r*max(1.0,sin(uv.y*dim.y*1.2)*2.5)*d;b.b=b.b+f.b*max(1.0,sin(uv.y*dim.y*1.2)*2.5)*d;b.g=b.g+o.g*max(1.0,sin(uv.y*dim.y*1.2)*2.5)*d;vec2 p=uv*sin(time);float q=fract(sin(dot(p.xy,vec2(12.9898,78.233)))*43758.5453);vec3 r=vec3(q);b.rgb=mix(b.rgb,r,0.08);gl_FragColor.rgba=b;}';
var SLIT_FRAG ='precision mediump float;uniform vec2 dim;uniform sampler2D t;varying vec2 uv;uniform float slit_h;void main(void){vec2 a=uv*dim;vec2 b=vec2(3.0+floor(a.x/slit_h)*slit_h,a.y);vec4 c=texture2D(t,b/dim);gl_FragColor.rgba=c.rgba;}';
var SWELL_FRAG ='precision mediump float;uniform vec2 dim;uniform sampler2D tex;varying vec2 uv;uniform float time;uniform float rand;void main(void){vec4 a=texture2D(tex,uv);gl_FragColor.rgba=a.rgba;}';
var TWIST_FRAG ='precision mediump float;uniform vec2 dim;uniform sampler2D t;varying vec2 uv;uniform float time;void main(void){float a=0.3;float b=0.3;float c=10.00*time;float d=10.00*time;float e=dim.x;float f=dim.y;vec2 g=uv*dim;vec2 h=vec2(max(3.0,min(float(e),g.x+sin(g.y/(153.25*a*a)*a+a*c+b*3.0)*d)),max(3.0,min(float(f),g.y+cos(g.x/(251.57*a*a)*a+a*c+b*2.4)*d)-3.0));vec4 i=texture2D(t,h/dim);gl_FragColor.rgba=i.rgba;}';
var STATIC_VERT ='attribute vec2 p;varying vec2 uv;void main(){gl_Position=vec4(p,0.0,1.0);uv=0.5*(p+1.0);}';
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

var gl = c.getContext('webgl') || c.getContext('experimental-webgl'),
  ctx = g.getContext('2d'),
  FW = 800,
  FH = 600,
  GAME_MARGIN = 0,
  GAME_Y_MARGIN = GAME_MARGIN,
  GAME_INC_PADDING = 80,
  W = FW - 2 * GAME_MARGIN,
  H = FH - 2 * GAME_Y_MARGIN,
  borderLength = 2*(W+H+2*GAME_INC_PADDING),
  storage = localStorage;


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
/*
* original script from @gre
* https://github.com/gre/behind-asteroids/blob/master/src/effects.sh
*/
function drawPostProcessing (time) {
  glSetTexture(textureGame, g);
  glitchTime--;
  for (var i = 0; i < GLITCHS.length; i++){GLITCHS[i]--;}

  glBindFBO(fbo1);
  glBindShader(badColorShader);
  gl.uniform1i(glUniformLocation(badColorShader, 't'), glBindTexture(textureGame, 0));
  gl.uniform1f(glUniformLocation(badColorShader, 'time'), (frame/60)%180);
  gl.uniform3fv(glUniformLocation(badColorShader, 'colors'), [(glitchTime+1>0||GLITCHS[0]>0)?1:0,(glitchTime+2>0||GLITCHS[1]>0)?1:0,(glitchTime>0||GLITCHS[2]>0)?1:0]);
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  glBindFBO(fbo2);
  glBindShader(cutShader); 
  gl.uniform1i(glUniformLocation(cutShader, 't'), glBindTexture(glGetFBOTexture(fbo1), 0));
  gl.uniform1f(glUniformLocation(cutShader, 'time'), (glitchTime>0||GLITCHS[3]>0)?15:0); // instantes cortos 
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  glBindFBO(fbo1);
  glBindShader(twistShader);
  gl.uniform1i(glUniformLocation(twistShader, 't'), glBindTexture(glGetFBOTexture(fbo2), 0));
  gl.uniform1f(glUniformLocation(twistShader, 'time'), (glitchTime+1>0||GLITCHS[4]>0)?1:0); // instantes cortos 
  gl.drawArrays(gl.TRIANGLES, 0, 6);

// swell for effects
  glBindFBO(fbo2);
  glBindShader(swellShader);
  gl.uniform1i(glUniformLocation(swellShader, 'tex'), glBindTexture(glGetFBOTexture(fbo1), 0));
  gl.uniform1f(glUniformLocation(swellShader, 'rand'), -0.5); // instantes cortos
  gl.drawArrays(gl.TRIANGLES, 0, 6);
//
  glBindFBO(fbo1);
  glBindShader(slitShader);
  gl.uniform1i(glUniformLocation(slitShader, 't'), glBindTexture(glGetFBOTexture(fbo2), 0));
  gl.uniform1f(glUniformLocation(slitShader, 'slit_h'), (glitchTime>0||GLITCHS[5]>0)?9:1); //instantes cortos
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
// mouse states 
// x, y, down
var coords = [0, 0, 0];

c.onmousedown = function(e){
  coords[2] = e.which==3?0:1;
  coords[3] = e.which==3?1:0;
  e.preventDefault();
}

c.onmouseup = function(e){
  coords[2] = 0;
  coords[3] = 0;
  e.preventDefault();
}

c.onmousemove = function(e){
  if(GLITCHS[6]>0) return;
  coords[0] = e.offsetX;
  coords[1] = e.offsetY;
}
var keyMap = 0;
var keys = {
  '65':1,         // left
  '87':2,         // up
  '68':4,         // right
  '83':8          // down
}

document.onkeydown = function(e){
  var key = e.keyCode|| e.which;
  if(keys[key]){
    keyMap|=keys[key];
    e.preventDefault();
  }
}

document.onkeyup = function(e){
  var key = e.keyCode ? e.keyCode : e.which;
  if(keyMap&keys[key]){
    keyMap^=keys[key];
    e.preventDefault();
  }
}
// create the audio context
var ac = new AudioContext(),
  // get the current Web Audio timestamp (this is when playback should begin)
  when = ac.currentTime,
  // set the tempo
  tempo = 138,
  // initialize some vars
  sequence1,
  sequence2,
  sequence3,
  sequence4,
  // create an array of "note strings" that can be passed to a sequence 
  bb1='Bb1 s',
  d2 = 'D2 s',
  ab1 ='Ab1 s',
  g2be = 'G2b e'
  g2e = 'G2 e',
  c2e = 'C2 e',

  lead = [
    bb1,
    d2,
    bb1,
    d2,
    bb1,
    d2,
    bb1,
    d2,
    bb1,
    d2,
    bb1,
    d2,
    bb1,
    d2,
    bb1,
    d2,
    ab1,
    d2,
    ab1,
    d2,
    ab1,
    d2,
    ab1,
    d2,
    ab1,
    d2,
    ab1,
    d2,
    ab1,
    d2,
    ab1,
    d2,
  ],
  harmony = [
    g2e,
    g2be,
    g2e,
    g2be,
    g2e,
    g2be,
    g2e,
    g2be,
    c2e,
    g2be,
    c2e,
    g2be,
    c2e,
    g2be,
    c2e,
    g2be
  ],
  bass2 = [
    '- w',
    'D1 s',
    '- s',
    'D1 e',
    '- q',
    '- m',
    '- w'
  ],
  basebass = [
    'C1 e',
    '- e',
    'A1 e',
    '- e'
  ],
  bass = basebass;

// create 3 new sequences (one for lead, one for harmony, one for bass)
sequence1 = new Sequence( ac, tempo, lead );
sequence2 = new Sequence( ac, tempo, harmony );
sequence3 = new Sequence( ac, tempo, bass );
sequence4 = new Sequence( ac, tempo, bass2 );

// set staccato and smoothing values for maximum coolness 
sequence1.staccato = 0.81;
sequence2.staccato = 0.55;
sequence3.staccato = 0.05;
sequence3.smoothing = 0.35;
sequence4.staccato = 0.05;

// adjust the levels so the bass and harmony aren't too loud 
sequence1.gain.gain.value = 0.12;
sequence2.gain.gain.value = 0.09;
sequence3.gain.gain.value = 0.11;
sequence4.gain.gain.value = 0.1; 


//sequence1.play(when + 40);
//sequence3.play(when + 10);
//sequence4.play(when + 1);
//sequence2.play(when + 100);
window.test1 = sequence1;
window.test3 = sequence3;
// the frequency is the sixth value index 5

function mutates(sound,mutations){
  var sounds = [];
  for (var i = 0; i < mutations; i++) {
    var newSound = sound.slice();
    newSound[5] = (i-mutations/2)*0.05 + sound[5];
    sounds.push(audio(newSound))
  }
  return sounds;
}

var baseFireSound = [0,,0.12,0.14,0.3,0.8,,-0.3399,0.04,,,-0.04,,0.51,-0.02,,-0.74,,0.21,0.24,,,0.02,0.41];
var fireSounds = mutates(baseFireSound, 6);
var totemAppears = audio([1,,0.38,,0.03,0.03,,0.8799,0.96,0.9411,0.9785,-0.9219,0.82,0.7513,0.6049,0.8,-0.6041,-0.8402,0.28,0.7,0.78,0.1423,-0.7585,0.5]);
var enemyDie = audio([3,0.0597,0.11,0.2,0.2513,0.5277,,0.5841,-0.0248,-0.076,0.5312,-0.2978,0.7065,-0.9091,0.4202,0.966,0.7036,0.4575,1,-0.9064,0.6618,0.0266,-0.0655,0.42]);
var heroSpeedUp = audio([2,,0.09,0.06,0.45,0.27,0.02,-0.28,0.82,0.41,0.58,-0.88,0.07,0.448,-0.355,1,0.54,-0.073,1,,,,,0.42]);
var totemDestroyed = audio([3,0.002,0.6302,0.499,0.0804,0.5224,,-0.0324,0.0004,0.5448,,-0.7762,-0.1765,0.6762,-0.4386,0.7747,-0.0347,-0.2051,0.931,-0.0732,0.4693,0.1444,,0.42]);
var heroDie = audio([1,0.145,0.2094,0.4645,0.4954,0.7134,,-0.1659,-0.8866,0.9733,,-0.572,-0.7927,-0.1186,0.4699,0.6044,0.4604,0.1762,0.9998,0.0236,0.1554,,0.659,0.42]);
var glitchStop = audio([1,0.0076,0.66,,,0.09,,0.96,0.32,0.1,0.97,-1,,0.0615,-0.1587,1,,-0.02,0.83,0.12,0.23,0.0231,-0.02,0.96]);

var baseEnemyHit = [3,0.0691,0.183,0.0949,0.5678,0.46,,-0.0001,,,,-0.542,-0.2106,-0.2402,-0.1594,,-0.3133,-0.0707,0.1592,-0.4479,0.5788,0.0169,-0.919,0.42];
var hitSounds = mutates(baseEnemyHit,8)

var spatialhashing,mapSize,tileset,gameOver,frame,mapPixels,map,slowMotion,viewPort,enemies,hero,heroShape,bullets,particles,message,particleZ,score,glitchTime,GLITCHS,glitchStoped,triggers,bigKiller,times,newRecord;
function init(){
  spatialhashing = {},
  mapSize = 21,
  tileset = 40,
  gameOver = false,
  frame=0,
  mapPixels = mapSize*tileset,
  map = [],
  slowMotion = 0.3,
  viewPort = [(FW-mapPixels)/2, (FH-mapPixels)/2 , FW/2-30, FH/2-30], // [x, y, leftOffset, topOffset]
  // [0x, 1y, 2size, 3angle, 4speed, 5crossFireAngle, 6countDown, 7bulletRatio, 8dashCountDown, 9dashcolddown]
  enemies = [],
  hero = [tileset*10.5, tileset*10.5, 16, 0, 150, 0, 0, 12,0,0],
  heroShape = [[0,1,0,-1],[-1,1,0.5,1]],
  //0x, 1y, 2size, 3angle
  bullets = [],
  // enemy description 
  // 0x, 1y, 2size, 4angleIncrement, 3angle, 5angleMomentum, 6xpath, 7ypath, 8hit
  // 0x, 1y, 2size, 3angle, 4index, 5type, 6hits, 7path, 8path, 9customdata
  // totem description
  // totem spawns enemies
  // 0x, 1y, 2size, 3angle, 4xpath, 5ypath, 6hitpoints, 7nextInvocation
  particles = [],
  message = '',
  particleZ = Math.PI/2,
  score = 0,
  glitchTime = 0,
  //012=rgb, 3, 4, 5, 6, 7stop 
  GLITCHS=[0,0,0,0,0,0,0],
  glitchStoped = false,
  triggers = {
    /*
  4000:[0,11.5*tileset,11.5*tileset,9], 
  1100000:[0,12.5*tileset,6.5*tileset,6],
  */
    //1st wave
    500:[1,sequence4],
    2500:[0,10.5*tileset,5.5*tileset,10],
    //2st wave
    8999:[5,'what are you doing?'],
    10500:[1,sequence3],
    11000:[0,5.5*tileset,5.5*tileset,10],
    18000:[0,15.5*tileset,15.5*tileset,10],
    18001:[5,''],
    25000:[0,15.5*tileset,5.5*tileset,10],
    31000:[0,5.5*tileset,15.5*tileset,10],
    37000:[0,10.5*tileset,11.5*tileset,11],
    37500:[1,sequence1],
    46000:[5,'you can\'t stop us!'],
    // some broken in the matrix
    48500:[2, 10,0,0,0,10,10,10],
    49000:[2, 10,10,10,15,10,20,10],
    49001:[4, sequence3, 1],
    49002:[4, sequence1, 1],
    49003:[4, sequence4, 1],
    50004:[2, 60,60,68,55,50,45,60],
    51000:[4, sequence3, 138],
    51001:[4, sequence1, 138],
    51002:[4, sequence4, 138],
    51003:[5,'we are perfect!'],
    //3st wave
    52000:[0,4.5*tileset,10.5*tileset,11],
    53000:[0,14.5*tileset,10.5*tileset,10],
    55550:[5,''],
    61000:[0,10.5*tileset,16.5*tileset,11],
    63000:[0,10.5*tileset,6.5*tileset,10],
    70000:[0,16.5*tileset,10.5*tileset,11],
    72000:[0,6.5*tileset,10.5*tileset,10],
    78000:[0,10.5*tileset,4.5*tileset,11],
    // some cool effect for the summon in the middle 
    88501:[2, 1000,0,0,0,0,0,10],
    92000:[0,10.5*tileset,9.5*tileset,12],
    92500:[1,sequence2],
   108050:[5,'do you think we are an error?'],
   112050:[5,'you are a glitch!'],
    // some cool effect
    //4st wave 
   115000:[0,10.5*tileset, 1.5*tileset,12],
   120050:[5,''],
   121000:[0,1.5*tileset, 10.5*tileset,12],
   126000:[0,19.5*tileset, 10.5*tileset,12],
   131000:[0,10.5*tileset, 19.5*tileset,12],
    // some cool effect
   154499:[5,'your limited dimension...'],
   160001:[2, 100,100,50,20,20,100,10],
   160500:[5,'is just a plane'],
    //5st wave
   164600:[0,10.5*tileset,15.5*tileset,10],
   164601:[0,12.5*tileset,16.5*tileset,10],
   164602:[0,12.5*tileset,18.5*tileset,10],
   164603:[0,10.5*tileset,19.5*tileset,10],
   164604:[0,8.5*tileset,18.5*tileset,10],
   164605:[0,8.5*tileset,16.5*tileset,10],
   180000:[0,10.5*tileset,17.5*tileset,13],//3
   //6th wave
   210000:[0,10.5*tileset,10.5*tileset,14],
    // summon
  1100000:[0,12.5*tileset,6.5*tileset,10],
    //200000:[15.5*tileset, 6.5*tileset,11]   
  /**/
  },
  bigKiller = undefined,  // reference for enemy followers
  // triggers = {
  //  1000:[11.5*tileset,6.5*tileset,10], 
  //  10000:[5.5*tileset,5.5*tileset,6],
  //  18000:[16.5*tileset,16.5*tileset,6],
  //  25000:[16.5*tileset,5.5*tileset,6],
  //  31000:[5.5*tileset,16.5*tileset,6]
  // },
  times=Object.keys(triggers).map(function(element){return parseInt(element)});

  for(var i=0;i<mapSize;i++){
    map.push([]);
    for(var j=0;j<mapSize;j++){
      map[i].push([]);
    }
  }
  //map[5][5]=1;

  // enemy type movement, 
  /*types
  0-5 enemies that moves
  enemy[9][angleIncrement, angleMomentun]
  >5 totems 
  */
  sequence1.stop();
  sequence2.stop();
  sequence3.stop();
  sequence4.stop();
  record = parseFloat(storage.getItem('agar3sjs13k-record')||0);
  if(buttons&&buttons[0])buttons[0][3] = false;
  if(buttons&&buttons[1])buttons[1][3] = false;
  if(buttons&&buttons[2])buttons[2][3] = false;
  newRecord = false;
}
init();
function checkRecord(){
  newRecord = score>record;
  if(!newRecord) return;
  record = score;
  storage.setItem('agar3sjs13k-record', score);
  buttons[1][3] = true;
  buttons[2][3] = true;
}

//temp
var locationref = window.location.href||'http://js13kgames.com/entries/';

function baseMessage(){
  return 'I reached '+score.toFixed()+' points in devilGlitches #js13k #js13kgames ';
}
function shareTwitter(){
  var message = baseMessage()+locationref;
  var link = encodeURIComponent(message);
  window.open('https://twitter.com/home?status='+link);
}
function shareFacebook(){
  uploadImgr();
  var link = encodeURIComponent(locationref)+'&description='+encodeURIComponent(baseMessage());
  window.open('https://www.facebook.com/sharer/sharer.php?u='+link);
}

function uploadImgr(){
  authorization = 'Client-ID d65571b4543e280';

  var r = new XMLHttpRequest();
  r.open("POST", "https://api.imgur.com/3/image", true);
  r.setRequestHeader('Authorization',authorization);
  r.setRequestHeader('Accept','application/json')
  r.onreadystatechange = function () {
    if (r.readyState != 4 || r.status != 200) return;
    alert("Success: " + r.responseText);
  };
  r.send("image="+c.toDataURL().replace("data:image/png;base64,", "")+'&type=base64');
  //window.location = 'https://imgur.com/gallery/' + id;
}
// x, y, width, visible, color, message, clicked, hover, action 
var buttons = [[240,320,300, false, '#F66', 'start again',false, false, init],
               [120,460,250, false, '#69F', 'twitter',false, false, shareTwitter],
               [430,460,250, false, '#32F', 'facebook',false, false, shareFacebook]];
function drawButtons(){
  // absolute position
  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    if(!button[3]) return;
    if(button[7]){
      ctx.strokeStyle = '#066';
    }else{
      ctx.strokeStyle = button[4];
    }
    ctx.lineWidth=2;
    ctx.strokeRect(button[0], button[1],button[2],42);
    drawWordCenter(button[5], button[0]+button[2]/2+1, button[1]+10,12, '#FFF');
    drawWordCenter(button[5], button[0]+button[2]/2, button[1]+8,12, button[5]);
  }
}

function updateButtons(){
  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    if(!button[3]||coords[0]<button[0]||coords[0]>button[0]+button[2]||coords[1]<button[1]||coords[1]>button[1]+42){
      button[6] = button[7] = false; 
      continue;
    }
    button[7] = true;
    if(coords[2]==1){
      button[6] = true;
    }else if(coords[2]==0&&button[6]){
      button[6] = false;
      button[8]();
    }
  }
}// x, y, timeleft, baseTime, summonElement, baseanimation...
var summons = [];

function updateSummons(){
  for (var i = 0; i < summons.length; i++) {
    var summon = summons[i];
    summon[2]-=dt;
    if(summon[2]<0){
      enemies.push(createEnemy(summon[4]));
      if(summon[4][2]>9){
        glitchTime = 10;
        play(totemAppears);
      }
      if(summon[4][2]==3){
        bigKiller = enemies[enemies.length-1];
      }
      summons.splice(i, 1);
    }
  }
}

function drawSummons(){
  ctx.beginPath();
  for (var i = 0; i < summons.length; i++) {
    var summon=summons[i];
    var percentage = easeOutQuad(summon[2], 1, -1, summon[3]);
    //var percentage = 1-summon[2]/summon[3];
    ctx.strokeStyle = 'rgba(38,82,255,'+percentage+')';
    ctx.fillRect(summon[0]+viewPort[0]+shakeScreen[0]-percentage*tileset/2, summon[1]+viewPort[1]+shakeScreen[1]-percentage*tileset/2, percentage*tileset, percentage*tileset);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function scheduleSummon(x,y,time, element){
  summons.push([x, y, time, time, element])
}


function updateTrigger(){
  if(times.length>0&&score>times[0]){
    var trigger  = triggers[times.splice(0,1)[0]];
    var type = trigger.splice(0,1)[0];
    switch(type){
      case 0:
        scheduleSummon(trigger[0], trigger[1], 1, trigger);
      break;
      case 1:
        trigger[0].play();
      break;
      case 2:
        GLITCHS = trigger;
      break;
      case 3:
        play(trigger[0])
      break;
      case 4:
        trigger[0].tempo = trigger[1];
        if(trigger[1]==138){trigger[0].stop();trigger[0].play()}
      break;
      case 5:
        message = trigger[0]
      break;
    }

  }else if(times.length==0){  // to infinite mode 
    triggers[score+7500] = [(Math.random()*21)*tileset,(Math.random()*21)*tileset,6]
    glitchTime = 5;
    times.push(score+7500)
  }
}//corrupt algorithm 
function corruptZone(x, y, radius){
  var col = ~~(x/tileset);
  var row = ~~(y/tileset);
  var r = Math.ceil(radius/tileset);
  for(var j = row-r; j < row+r; j++){
    if(typeof(map[j])=='undefined') continue;
    for(var i = col-r; i < col+r; i++){
      if(map[j][i]==1||getHypo((j+0.5)*tileset-y, (i+0.5)*tileset-x)>=radius) continue;
      map[j][i]=1;
    }
  }
}

function removeCorruption(x, y, radius){
 var col = ~~(x/tileset);
  var row = ~~(y/tileset);
  var r = Math.ceil(radius/tileset);
  for(var j = row-r; j < row+r; j++){
    if(typeof(map[j])=='undefined') continue;
    for(var i = col-r; i < col+r; i++){
      if(map[j][i]==1||getHypo((j+0.5)*tileset-y, (i+0.5)*tileset-x)<=radius){
        map[j][i]=0;
      }
    }
  } 
}var necronomicon = [
// normal enemies 
//size, angle, summonTime, type, hits, xpoints, ypoints, customData:angleTarget, customData: angleMomentum, anglediff, speed
// 0: basic square
[15,    0,     0,          0,    1, [1,0.25,-1,0.25],[0,-0.75,0,0.75],                 0, 3,0.1,1.1],
// 1: simple killer
[15,    0,     0,          1,    4, [1,0.3,0,-2,0,0.3], [0,1,0.3,0,-0.3,-1], 0, 3,0.05,0.8],
// 2: follower 
[8,    0,     0,           2,    2, [1,0.25,-1,0.25],[0,-0.5,0,0.5],0, 3.5,0.15,1.6],
// 3: heavy killer
[20,    0,     0,          3,    9, [0,0.25,0.75,0.75,1,0.75,0.75,0.25,0,-0.25,-0.75,-0.75,-1,-0.75,-0.75,-0.25], [-1,-0.75,-0.75,-0.25,0,0.25,0.75,0.75,1,0.75,0.75,0.25,0,-0.25,-0.75,-0.75], 0, 1,0.12,1.05],
//4: guardian
[12,    0,     0,          4,    5, [0,0.25,1,0.25,0,-0.25,-1,-0.25], [-1,-0.25,0,0.25,1,0.25,0,-0.25],                 0, 3,0.03,2.5, 0,0,0], // last two parameters, x y to turnon radiis
//5: bullet basic triangle
[3,    0,     0,           5,    150, [1,-1,-1], [0,1,-1],0, 0,0,1.4], // last two parameters, x y to turnon radiis
//6: totem seed - countdown=13 
[16,   0,     0,           6,    9, [1,0.25,-1,0.25],[0,-0.75,0,0.75], 0,0,0,0.6,3.5],
//7: totem seed - countdown=13 
[18,   0,     0,           7,    8, [1,0.25,-1,0.25],[0,0.75,0,-0.75], 0,0,0,0.8,2.5],
//8: nothing decided
[20,   0,     0,           8,   7, [1,0.25,-1,0.25],[0,0.75,0,-0.75], 0,0,0,1.2,1.5],
//9: nothing decided 
,
// spawners 10 -- por si acaso
//size, angle, hitEffect, type, hits, xpoints, ypoints, customData:nextInvocation, corruptionPower, corruptionRatio
//pyramid solid
[tileset/2, 0, 0, 10, 9, [[-1,0,0],[0,0,1],[-1,1,0]], [[-1.5,-0.5,0.5],[-0.5,0.5,-1.5],[-1.5,-1.5,-0.5]], 100, 0,7],
//cube solid 
[tileset/2, 0, 0, 11, 10, [[-1,0,0,-1],[1,0,0,1],[-1,0,1,0],[-1,0,1,0],[-1,0,0,-1],[1,0,0,1]], [[-1.25,-0.5,0.8,0.25],[-1.25,-0.5,0.8,0.25],[-1.25,-0.5,-1.25,-1.8],[0.25,-0.5,0.25,0.8],[0.25,-0.5,-1.8,-1.25],[0.25,-0.5,-1.8,-1.25]], 100, 0,6],
//prism solid 
[tileset*0.8, 0, 0, 12, 15, [[-0.5,0,0.5,0],[-0.5,0,0],[0.5,0,0],[-0.5,0,0],[0.5,0,0]], [[-0.75,-1,-0.75,-0.5],[-0.75,-0.5,0.25],[-0.75,-0.5,0.25],[-0.75,-1.75,-0.5],[-0.75,-1.75,-0.5]], 0.9, 0,4,0.004],
// st
[tileset*1.2, 0, 0, 13, 30, [[0,-0.75,0],[0,0.75,0],[-0.75,0.75,0],[-0.75,0.75,0],[-0.35,0.35,0]], [[-1,0.5,0],[-1,0.5,0],[0.5,0.5,0],[-0.5,-0.5,1],[0.25,0.25,-0.5]], 0.9, 0,13,0.1],
// flower of fucking life - summon counter=13
[tileset*2.5, 0, 0, 14, 200, [], [], 0.9, 0,60,0.003, 1,0,[6,7,6,7,8]]
];

var invocationTimes={
  10: 2800,
  11: 2600,
  12: 60,
  13:200
}

function summonGuardian(enemy, j){
  var newEnemy = createEnemy([enemy[0]+Math.cos(Math.PI*j/3)*10,enemy[1]+Math.sin(Math.PI*j/3)*10, 4])
  newEnemy[13] = enemy;
  newEnemy[9] = getAngle(newEnemy, enemy); 
  newEnemy[3] = newEnemy[9]+enemy[11];
  newEnemy[15]=0;
  newEnemy[16]=0;
  enemies.push(newEnemy);
}

// values: x, y, type
function createEnemy(values){
  var enemy = values.slice(0,2).concat(necronomicon[values[2]].slice(0));

  if(enemy[5]==12||enemy[5]==14){
    for (var j = 0; j<6; j++) {
      summonGuardian(enemy, j);
    }
  }
// for (var j = 0; j<12; j++) { for the last enemy 
// var newEnemy = createEnemy([enemy[0]+Math.cos(Math.PI*2*j/12+0.1)*10,enemy[1]+Math.sin(Math.PI*2*j/12+0.1)*10, 4])
  return enemy;
}

//draw methods 

function drawFace(xPath, yPath, size, index, color){
  ctx.beginPath();
  var value = 125-index*20;
  ctx.fillStyle = 'rgba('+color+')';
  path(xPath, yPath,size)
  ctx.closePath();
  ctx.fill()
  ctx.stroke()
}

function pathEnemy(enemy){
  ctx.rotate(enemy[9])
  path(enemy[7], enemy[8], enemy[2])
  //ctx.strokeRect(enemy[7][0], enemy[8][1], enemy[2]*2, enemy[2]*2)  
  ctx.rotate(-enemy[9])
}
var flowerOfpoints = [];
for (var i = 0; i < 6; i++) {
  var angle = (i-3)*Math.PI/3+Math.PI/6;
  var x = Math.cos(angle);
  var y = Math.sin(angle);
  flowerOfpoints.push(x,y);
}
function drawFlowerOfLife(enemy){
  var color = 'hsla('+enemy[3]*20+',50%,60%, 0.5)';
  ctx.lineWidth=2; 
  ctx.beginPath();
  ctx.strokeStyle=enemy[4]>0?'rgba(180,0,50,0.3)':color;
  var relativeSize = enemy[2]/3.5;
  ctx.arc(0,0, relativeSize/2, 0, Math.PI*2, false);
  ctx.stroke();
  ctx.beginPath();
  ctx.bezierCurveTo(-relativeSize, 0, 0, -relativeSize, relativeSize, 0);
  ctx.bezierCurveTo(relativeSize, 0, 0, relativeSize, -relativeSize, 0);
  ctx.stroke(); 
  ctx.rotate(enemy[3]);
  for (var i = 0; i < 6; i++) {
    var x= flowerOfpoints[i*2];
    var y= flowerOfpoints[i*2+1]
    var angle = (i-3)*Math.PI/3;
    ctx.beginPath(); 
    ctx.arc(4*x*relativeSize,4*y*relativeSize, relativeSize, 0, Math.PI*2, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(2*x*relativeSize,2*y*relativeSize, relativeSize, 0, Math.PI*2, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x*relativeSize*4,y*relativeSize*4);
    ctx.lineTo(relativeSize*4*flowerOfpoints[(i*2+2)%12],relativeSize*4*flowerOfpoints[(i*2+3)%12]);
    ctx.lineTo(relativeSize*4*flowerOfpoints[(i*2+6)%12],relativeSize*4*flowerOfpoints[(i*2+7)%12]);
    ctx.moveTo(x*relativeSize*2,y*relativeSize*2);
    ctx.lineTo(relativeSize*2*flowerOfpoints[(i*2+2)%12],relativeSize*2*flowerOfpoints[(i*2+3)%12]);
    ctx.lineTo(relativeSize*2*flowerOfpoints[(i*2+6)%12],relativeSize*2*flowerOfpoints[(i*2+7)%12]);
    
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.rotate(-enemy[3]);

}

// greater the percentage blink fast
function blink(percentage, i){
  if(percentage>0.99) return 1;
  var value = percentage*100;
  var umbral = 1/(percentage);
  return value%(umbral)>(umbral/2)?1:0;
}
var blinkValues={};
for (var i = 0; i < 10000; i++) {
  blinkValues[(i/10000).toFixed(4)] = blink(i/10000, i)
}

function pathTotem(totem){
  var loading = (invocationTimes[totem[5]]-totem[9])/invocationTimes[totem[5]];
  var green = totem[4]>0?-55:~~(200*loading)*blinkValues[loading.toFixed(4)];
  ctx.strokeStyle=totem[4]>0?'#0ff':green==0?'#66A':'#559';
  for(var i = 0; i < totem[7].length; i++){
    drawFace(totem[7][i], totem[8][i], totem[2], i, [80+totem[4],55+green,130+~~(green/2),totem[4]>0?0.9:0.4]);
  }
}

function randomSign(){
  return Math.random()>0.5?1:-1;
}

function drawEnemy(enemy){
  if(enemy[0]+viewPort[0]<20||enemy[0]+viewPort[0]>W-20||enemy[1]+viewPort[1]<20||enemy[1]+viewPort[1]>H-20) return;
  //ctx.rotate(enemy[2]);  
  var offsetX = enemy[0]+viewPort[0]+shakeScreen[0]+randomSign()*enemy[4]/40; // 20 /2 width/2
  var offsetY = enemy[1]+viewPort[1]+shakeScreen[1]+randomSign()*enemy[4]/40; //
  ctx.translate(offsetX, offsetY)
  ctx.beginPath();
  if(enemy[5]<10){ 
    ctx.strokeStyle = 'hsla('+enemy[5]*36+',50%,70%,0.6)';
    ctx.lineWidth = 3;
    pathEnemy(enemy);
  }else if(enemy[5]==14){
    drawFlowerOfLife(enemy);
  }else {
    ctx.lineWidth = 2;
    pathTotem(enemy);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.translate(-offsetX, -offsetY)
}

var spawns = {
  10: function(enemy){
    for (var j = 0; j<9; j++) {
      if(j==4) continue;  //summon especial
      var x = enemy[0]+(j%3-1)*tileset;
      var y = enemy[1]+(~~(j/3)-1)*tileset;
      scheduleSummon(x,y,0.65,[x,y,j==1?1:0]);
      //var newEnemy = createEnemy([enemy[0]+(j%3-1)*tileset,enemy[1]+(~~(j/3)-1)*tileset, j==1?1:0])
      //enemies.push(newEnemy);
    }
    enemy[9]=invocationTimes[10];  // time to summon again 
  },
  11: function(enemy){
    for (var j = 0; j<12; j++) {
      if(j==4) continue;  //summon especial
      var x = enemy[0]+(j%3-1)*tileset;
      var y = enemy[1]+(~~(j/3)-1)*tileset;
      scheduleSummon(x,y,0.65,[x,y,j==1?3:2])

      //if(j==1) bigKiller = newEnemy;
      //enemies.push(newEnemy);
    }
    enemy[9]=invocationTimes[11];
  },
  12: function(enemy){ // 
    for (var i = 0; i < 2; i++) {
      var newEnemy = createEnemy([enemy[0],enemy[1], 5])
      newEnemy[9] = enemy[3]+i*Math.PI;
      enemies.push(newEnemy);
    } 
    enemy[9]=invocationTimes[12]; //crazy  0.3 
  },
  13: function(enemy){
    for (var i = 0; i < 6; i++) {
      var newEnemy = createEnemy([enemy[0],enemy[1], 5])
      newEnemy[9] = enemy[3]+(i-3)*Math.PI/3;
      newEnemy[12]+=1.2;
      enemies.push(newEnemy);
    } 
    //var newEnemy = createEnemy([enemy[0],enemy[1], 6])
    //enemies.push(newEnemy); 
    enemy[9]=100;
    //enemy[9]=invocationTimes[12]; //crazy  0.3 
/*    
    if(enemy[6]>40){
      for (var i = 0; i < 8; i++) {
        var newEnemy = createEnemy([enemy[0],enemy[1], 5])
        newEnemy[9] = ((~~(enemy[6]/10))%2==0?1:-1)*enemy[3]+(i-4)*Math.PI/4;
        newEnemy[12] = 0.8;
        enemies.push(newEnemy); 
      }
    }else if(enemy[6]>35){

    }else if(enemy[6]>10){
      var newEnemy = createEnemy([enemy[0],enemy[1], 5])
      newEnemy[9] = getAngle(enemy, hero);
      newEnemy[12] = 3;
      enemies.push(newEnemy); 
    }else{
      summonGuardian(enemy, 0);
      enemy[9]=120; //crazy  0.3
      return;
    }

    enemy[9]=32; //crazy  0.3 
    //enemy[12]-=0.0003;
*/
  },
  14:function(enemy){
    for (var i = 0; i < 6; i++) {
      var newEnemy = createEnemy([enemy[0],enemy[1], 5])
      newEnemy[9] = enemy[3]+(i-3)*Math.PI/3+Math.PI/6;
      newEnemy[12]-=0.6;
      enemies.push(newEnemy);
    } 
    if(enemy[13]%16==0){
      var newEnemy = createEnemy([enemy[0],enemy[1], enemy[15][enemy[14]%enemy[15].length]]);
      newEnemy[9] = enemy[3]/2;
      enemies.push(newEnemy);
      enemy[14]++;
    }
    if(enemy[13]%100==0){
      for (var j = 0; j<6; j++) {
        summonGuardian(enemy, j);
      }
    }
    enemy[9]=70; 
    enemy[13]++;
  }
}
// update methods   
function updateEnemy(enemy,index){
  // have zero life
  if(enemy[6]<=0){
    enemies.splice(index,1);
    if(enemy[5]==5) return;
    for (var h = -10; h < 10; h++) {
      particles.push([enemy[0], enemy[1], enemy[2]+particleZ*h*Math.random(), 100]);
    }
    if(enemy[5]>9){
      removeCorruption(enemy[0], enemy[1], enemy[10]);
      play(totemDestroyed);
    }else{
      play(enemyDie);
    }
    return;
  }

  if(enemy[4]>0){
    enemy[4]-=50;
  }
  // miniom
  if(enemy[5]<10){
    if(enemy[10]*(enemy[9]-enemy[3])>0){
      if(enemy[5]==2){//follower 
        enemy[3] = getAngle(enemy, bigKiller||[0,0]);
      // }else if(enemy[5]==6&&enemy[6]%2==0){
      //   var clone1 = enemy.slice();
      //   clone1[2]= enemy[2]-2;
      //   clone1[6]=enemy[6]-1;
      //   clone1[12]+=0.1;
      //   var clone2 = enemy.slice();
      //   clone2[2]= enemy[2]-2;
      //   clone2[12]+=0.1;
      //   clone2[6]=enemy[6]-1;
      //   enemies.push(clone1);
      //   enemies.push(clone2);
      //   enemies.splice(index, 1);
      //   return;
      }else if(enemy[5]==4){
        enemy[3]+=enemy[9]+enemy[11];
      }else{
        enemy[3] = getAngle(enemy, hero);
      }
      enemy[10] = enemy[3]>enemy[9]?enemy[11]:-enemy[11];
    }

    var otherEnemy = collideElements(enemy);
    if(enemy[5]==4){
      enemy[9] +=enemy[10]*t;
    }else if(enemy[5]!=3||(otherEnemy&&otherEnemy[5]==3)){  // type 3 dont collide with followers and collide with himself
      enemy[9] +=(otherEnemy?-1:1)*enemy[10];
    }else{
      enemy[9] +=enemy[10];
    }
    
    if(enemy[5]==5){
      enemy[6]-=t/10;
    }

    if(enemy[5]>5&&enemy[5]<10){
      enemy[13]-=dt;
      if(enemy[13]<0){ 
        var coords = [(~~(enemy[0]/tileset)+0.5)*tileset, (~~(enemy[1]/tileset)+0.5)*tileset,enemy[5]+4];
        console.log(coords);
        scheduleSummon(coords[0], coords[1], 1, coords);
        enemies.splice(index,1);
        return;
      }
    }

    if(enemy[5]!=4){
      enemy[0] += Math.cos(enemy[9])*t*enemy[12];
      enemy[1] += Math.sin(enemy[9])*t*enemy[12];
    }else{
      // guardians moves
      if(enemy[13][6]<1){
        enemy[10]*=0.99;
      }
      enemy[15] = tileset*2*(-Math.cos(enemy[16])+1.2);
      enemy[16]+=t/200;
      enemy[0] = enemy[13][0]+Math.cos(enemy[9])*enemy[15];
      enemy[1] = enemy[13][1]+Math.sin(enemy[9])*enemy[15];
    }

  // spawner
  }else{
    enemy[9]-=t;
    if(enemy[5]>=12)enemy[3]+=enemy[12]*t;
    if(enemy[9]<0&&!gameOver){
      spawns[enemy[5]](enemy);
    }
    enemy[10]+=dt*enemy[11];
    corruptZone(enemy[0], enemy[1], enemy[10]);
  }
  addItem(enemy);
}
/**
* read the last events in game, update world
*/

function die(killer){
  play(heroDie);
  for (var h = -10; h < 10; h++) {
    particles.push([hero[0], hero[1], hero[2]+particleZ*h*Math.random(), 100]);
  }
  heroShape=[[], []]
  gameOver = true;
  sequence1.stop();
  sequence2.stop();
  sequence3.stop();
  sequence4.stop();
  buttons[0][3] = true;
  t = dt*30;
  checkRecord();
}

function playerUdate(dt){
  
  // apply speed to hero movement
  t = dt*hero[4]*(hero[8]>0?slowMotion:1);
  // move depending on keypressed 
  var speed = dt*hero[4]*(hero[8]>0?1.4:1);
  if(map[Math.round(hero[1]/tileset)]&&map[Math.round(hero[1]/tileset)][Math.round(hero[0]/tileset)]==1){
    speed-=0.5;
  }
  if(keyMap&keys[65]){
    hero[0]-=speed;
    if(hero[0]<hero[2]) hero[0] = hero[2]; // hero limit on x left
    if(hero[0]>viewPort[2]&&hero[0]<mapPixels-viewPort[2]) viewPort[0]+=speed;
  } 
  if(keyMap&keys[87]){
    hero[1]-=speed;
    if(hero[1]<hero[2]) hero[1] = hero[2];
    if(hero[1]>viewPort[3]&&hero[1]<mapPixels-viewPort[3]) viewPort[1]+=speed;
  }

  if(keyMap&keys[83]){
    hero[1]+=speed;
    if(hero[1]>mapPixels - hero[2]) hero[1] = mapPixels - hero[2];
    if(hero[1]>viewPort[3]&&hero[1]<mapPixels-viewPort[3]) viewPort[1]-=speed;
  }
  if(keyMap&keys[68]){
    hero[0]+=speed;
    if(hero[0]>mapPixels - hero[2]) hero[0] = mapPixels - hero[2];
    if(hero[0]>viewPort[2]&&hero[0]<mapPixels-viewPort[2]) viewPort[0]-=speed;
  }

  hero[3] = getAngle([hero[0]+viewPort[0], hero[1]+viewPort[1]], coords);

  var killer = collideElements(hero);
  if(killer)die(killer);
  // if fire shots fire
  if(coords[2]&&hero[6]<=0&&hero[8]<=0){
    bullets.push([hero[0]+shake(1, 2+hero[7]/30), hero[1]+shake(1, 2+hero[7]/30), 2, hero[3]+shake(1, 0.05+0.001*hero[7])])
    play(fireSounds[~~(Math.random()*fireSounds.length)]);
    hero[6] = 1/hero[7]; //12bullets per second  
  }else{
    hero[6]-=dt;
  }

  if(coords[3]&&hero[8]<=0&&hero[9]<=0){
    play(heroSpeedUp);
    hero[8] = 0.55;
    hero[9] = 1.2;
  }else{
    hero[8]-=dt;
    hero[9]-=dt;
  }
}

function update(dt){

  if(!gameOver) playerUdate(dt);

  // update bullets
  bulletsCycle: for (var i = bullets.length-1; i >= 0; i--) {
    var bullet = bullets[i];
    bullet[0] += Math.cos(bullet[3])*t*bullet[2]; // bullet speed *2
    bullet[1] += Math.sin(bullet[3])*t*bullet[2];
    if(bullet[0]<-20||bullet[0]>mapPixels+20||bullet[1]<-20||bullet[1]>mapPixels+20) bullets.splice(i,1);

    var enemy = collideElements(bullet);
    if(enemy){
      bullets.splice(i,1);
      --enemy[6];
      enemy[4]=200
      if(enemy[5]>5)
      play(hitSounds[~~(Math.random()*hitSounds.length)]);
    }
  }

  //update particles
  for(var i=0;i<particles.length;i++){
    var particle = particles[i];
    particle[0] += Math.cos(particle[2])*(2+Math.random()*3);
    particle[1] += Math.sin(particle[2])*(2+Math.random()*3);
    if(--particle[3]<0) particles.splice(i,1)
  }

  // update enemies 
  spatialhashing = {};
  for (var i = enemies.length-1; i >=0; i--) {
    updateEnemy(enemies[i], i);
  }
  updateTrigger();
  updateSummons();
}

function shake(cond, val){
  return cond?(Math.random()*val*2-val):0;
}

/**
helper function to draw paths. 
*/
function path(xpts, ypts, size){
  ctx.moveTo(xpts[0]*size, ypts[0]*size);
  for (var i = 1; i<xpts.length; i++) {
    ctx.lineTo(xpts[i]*size, ypts[i]*size);
  }
  ctx.lineTo(xpts[0]*size, ypts[0]*size);
}

/**enemies must have colors? */
function getRandomColor(r,r2,g,g2,b,b2,a,a2){
  return 'rgba('+(~~(Math.random()*r)+r2)+','+(~~(Math.random()*g)+g2)+','+(~~(Math.random()*b)+b2)+','+(~~(Math.random()*a)+a2)+')';
}


function draw(t){
  // draw map
  //some random points
  ctx.fillStyle= 'rgba(0,0,0,0.1)';
  ctx.fillRect(0,0,FW, FH);
  ctx.fillStyle = getRandomColor(180,0, 185,0,185,0,0,1);
  for(var i=0;i<6;i++) ctx.fillRect(Math.random()*800, Math.random()*600, 2, 2)
  
  // draw map
  ctx.save()
  ctx.strokeStyle = 'rgb(51,193,178)';
  var gridSize = H/mapSize
  ctx.beginPath();
  shakeScreen = !gameOver?[shake(coords[2], 2), shake(coords[2], 2)]:[0,0];
  ctx.translate(shakeScreen[0], shakeScreen[1]);
  ctx.fillStyle = 'rgba(15,12,40,'+ (0.2-(hero[8]>0?0.1:0)) +')';
  ctx.translate(viewPort[0], viewPort[1]);
  ctx.fillRect(0, 0, mapPixels, mapPixels);
  //ctx.strokeStyle = 'rgba(190,46,92,0.3)'; 
  //ctx.strokeStyle = 'rgba(50,46,92,0.8)'; 
  ctx.strokeStyle = 'rgba(102,82,156,0.8)'; 
  for(var i = 0; i <= mapSize; i++){
  ctx.beginPath();
    ctx.moveTo(i*tileset-0.5, 0);
    ctx.lineTo(i*tileset-0.5, mapPixels);
    ctx.stroke();
  ctx.beginPath();
    ctx.moveTo(0, i*tileset-0.5);
    ctx.lineTo(mapPixels, i*tileset-0.5);
    ctx.stroke();
  ctx.beginPath();
    ctx.moveTo(i*tileset+1.5, 0);
    ctx.lineTo(i*tileset+1.5, mapPixels);
    ctx.stroke();
  ctx.beginPath();
    ctx.moveTo(0, i*tileset+1.5);
    ctx.lineTo(mapPixels, i*tileset+1.5);
    ctx.stroke();
  }
  ctx.strokeStyle = 'rgba(200,200,200,0.6)';
  for(var i = 0; i <= mapSize; i++){
  ctx.beginPath();
    ctx.moveTo(i*tileset+0.5, 0);
    ctx.lineTo(i*tileset+0.5, mapPixels);
    ctx.stroke();
  ctx.beginPath();
    ctx.moveTo(0, i*tileset+0.5);
    ctx.lineTo(mapPixels, i*tileset+0.5);
    ctx.stroke();
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();

  // draw corruption 
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle='rgba(10,4,10,1)';
  ctx.strokeStyle = 'rgba(234,34,37,0.6)';
  for (var j = 0; j < mapSize; j++) {
    for (var i = 0; i < mapSize; i++) {
      if(map[j][i]==0) continue;
      ctx.fillRect(i*tileset+viewPort[0]+shakeScreen[0], j*tileset+viewPort[1]+shakeScreen[1], tileset, tileset);
      ctx.strokeRect(i*tileset+viewPort[0]+shakeScreen[0]-0.5, j*tileset+viewPort[1]+shakeScreen[1]-0.5, tileset+2, tileset+2);
      ctx.strokeRect(i*tileset+viewPort[0]+shakeScreen[0]+1.5, j*tileset+viewPort[1]+shakeScreen[1]+1.5, tileset-2, tileset-2);
    }
  }
  ctx.stroke();
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(231,197,11,0.3)';
  for (var j = 0; j < mapSize; j++) {
    for (var i = 0; i < mapSize; i++) {
      if(map[j][i]==0) continue;
      ctx.strokeRect(i*tileset+viewPort[0]+shakeScreen[0]+0.5, j*tileset+viewPort[1]+shakeScreen[1]+0.5, tileset, tileset);
    }
  }
  ctx.fill();
  ctx.closePath();
  ctx.restore();

  // draw summons 
  ctx.save();
  drawSummons();
  ctx.restore();

  // draw hero
  ctx.save();
  ctx.translate(hero[0] + viewPort[0] + shake(coords[2], 1), hero[1] + viewPort[1]+ shake(coords[2], 1));
  ctx.rotate(hero[3]+Math.PI/2);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgb(201,133,187)";
  ctx.beginPath();
  path(heroShape[0], heroShape[1],hero[2]);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();

  // draw enemies
  ctx.save();
  for (var i = 0; i < enemies.length; i++) {
    drawEnemy(enemies[i])
  }
  ctx.closePath();
  ctx.restore();

  // draw bullets 
  ctx.save();
  ctx.fillStyle = 'rgb(40,145,160)';
  for (var i = 0; i < bullets.length; i++) {
    var bullet = bullets[i];
    if(bullet[0]+viewPort[0]<20||bullet[0]+viewPort[0]>W-20||bullet[1]+viewPort[1]<20||bullet[1]+viewPort[1]>H-20) continue
    ctx.beginPath();
    ctx.arc(bullet[0]+viewPort[0], bullet[1]+viewPort[1], bullet[2], 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();


  //draw particles 
  ctx.save();
  ctx.fillStyle = getRandomColor(125,50, 125,50,125,50,0,1);
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    if(particle[0]+viewPort[0]<5||particle[0]+viewPort[0]>W-5||particle[1]+viewPort[1]<5||particle[1]+viewPort[1]>H-5) continue
    ctx.beginPath();
    ctx.fillStyle = getRandomColor(125,0, 125,100,125,100,0,particle[3]/100);
    ctx.arc(particle[0]+viewPort[0], particle[1]+viewPort[1], 2, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // cross  
  ctx.save();
  ctx.lineWidth = 2;
  ctx.translate(coords[0], coords[1]);
  ctx.strokeStyle = "#F952FF";
  hero[5]+=(t*25*(coords[2]*8+1))
  hero[5]%=360
  ctx.translate(-10, -10);
  ctx.beginPath();
  ctx.moveTo(0, 10)
  ctx.lineTo(20, 10)
  ctx.moveTo(10, 0)
  ctx.lineTo(10, 20)
  ctx.closePath();
  ctx.stroke();
  ctx.restore();

  // ui 
  ctx.save();
  drawWordCenter(message, 401, 501,14, '#90702F');
  drawWordCenter(message, 402, 502,14, '#D6AE45');
  //drawWordCenter(viewPort[0]+' '+viewPort[1], 402, 100,14, '#D6AE45');
  if(gameOver){
    ctx.fillStyle='rgba(0,0,0,0.71)';
    ctx.fillRect(0,0,mapPixels, mapPixels);
    if(newRecord){
      drawWordCenter('-new record-', 400, 240,22, '#F66');
      drawWordCenter('-new record-', 401, 240,22, '#F6F');
      drawWordCenter('-share it-', 400, 400,14, '#F6F');
      drawWordCenter('-share it-', 400, 400,14, '#F6F');
    }else{
      drawWordCenter('game over', 400, 240,20, '#FFF');
      drawWordCenter('game over', 401, 240,20, '#2FF');
    }
    drawWordCenter(score.toFixed(0), 400, 160,newRecord?20:16, '#2F2');
    drawWordCenter(score.toFixed(0), 401, 161,newRecord?20:16, '#FFF');
  }else{
    //score
    drawWord(score.toFixed(0), 750, 60,18, '#2F2');
    drawWord(score.toFixed(0), 751, 61,18, '#FFF');
    //record 
    var lrd = score>record?'record':record.toFixed(0);
    drawWord(lrd, 750, 110,9, '#F22');
    drawWord(lrd, 751, 111,9, '#FFF');
  }
  ctx.restore();

}


var lastTime;
function loop(t){
  // webgl postprocessing  
  if(DEBUG){
    _fps_.begin();
    _processing_.begin();
    _memory_.begin();
    _enemies_.begin();
  }

  if(!lastTime) lastTime = t;
  dt = (Math.min(100, t-lastTime)/1000);
  lastTime = t;
  frame++;

  // update changes 
  if(GLITCHS[6]<0)update(dt);
  //update buttons
  updateButtons();

  // draw changes 
  ctx.save();
  // draw game
  draw(dt);
  // draw buttons
  drawButtons();

  ctx.restore();

  drawPostProcessing(~~(t));
  if(!gameOver) score += dt*1000*(hero[8]>0?slowMotion:1);

  if(DEBUG){
    _fps_.end();
    _processing_.end();
    _memory_.end();
    _enemies_.end();
    enemiesPanel.update( enemies.length, 1000);
  }
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
}());
