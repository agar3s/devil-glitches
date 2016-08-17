#!/bin/bash
# original script from @gre 
# https://github.com/gre/behind-asteroids/blob/master/scripts/concat.sh
cat src/pre.js

if [ "$NODE_ENV" == "production" ]; then
  cat src/env_prod.js
else
  cat src/env_dev.js 
  cat src/lib/stats.min.js
fi;

# libs

cat src/lib/geometry.js
#cat src/lib/path.js
#cat src/lib/asteroids.font.js
cat src/lib/webgl.js
cat src/lib/jsfxr.js
cat src/lib/audio.js

# shaders

cd build;
for glsl in *.frag *.vert; do
  name=`echo $glsl | tr '.' '_' | tr '[:lower:]' '[:upper:]'`
  cat $glsl | ../scripts/wrapjs.sh $name
  echo
done
cd ..;

# game

cat src/setup.js
cat src/effects.js
cat src/clickEvents.js
cat src/keyEvents.js
cat src/gameState.js
cat src/sounds.js
cat src/gameLoop.js
cat src/post.js
