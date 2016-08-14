if(DEBUG){
  var _fps_ = new Stats();
  var _processing_ = new Stats();
  var _memory_ = new Stats();
  _fps_.dom.style.left = '0px';
  _processing_.dom.style.left = '100px';
  _memory_.dom.style.left = '200px';
  _fps_.showPanel(0);
  _processing_.showPanel(1);
  _memory_.showPanel(2);
  document.body.appendChild(_fps_.dom);
  document.body.appendChild(_processing_.dom);
  document.body.appendChild(_memory_.dom);
}