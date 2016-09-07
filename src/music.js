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
