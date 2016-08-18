
function getAngle(p1, p2){
  return Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
}

function getHypo(p1, p2){
  return Math.sqrt(p1*p1+p2*p2)
}