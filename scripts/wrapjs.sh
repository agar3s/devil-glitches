#!/bin/bash
# original script from @gre 
# https://github.com/gre/behind-asteroids/blob/master/scripts/wrapjs.sh
# usage: cat glslfile | ./wrapjs.sh varname

echo -n "var $1 ='"
perl -p -e 's/\n/\\n/';
echo -ne "';"
