var rand = function(range) {
  var result = Math.round(Math.random()*range);
  return(result);
  };
  
var dist = function(x1, y1, x2, y2) {
  
  var xd = x1 - x2;
  var yd = y1 - y2;
  return( Math.sqrt(xd*xd + yd*yd) );
  
  };
  
var distFromPos = function(pos1, pos2) {
  
  var xd = pos1.x - pos2.x;
  var yd = pos1.y - pos2.y;
  return( Math.sqrt(xd*xd + yd*yd) );
  
  };
  
var expire = function(timeout, domElement) {
  
  domElement.fadeOut(timeout-100);
  setTimeout(function() { domElement.remove() }, timeout);
  
  };