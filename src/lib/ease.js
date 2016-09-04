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
};