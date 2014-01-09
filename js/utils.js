var rand = function(range) {
  var result = Math.round(Math.random()*range);
  return(result);
  };
  
var dist = function(x1, y1, x2, y2) {
  
  var xd = x1 - x2;
  var yd = x1 - y2;
  return( Math.sqrt(xd*xd + yd*yd) );
  
  };
  
var expire = function(timeout, domElement) {
  
  domElement.fadeOut(timeout);
  setTimeout(function() { domElement.remove() }, timeout);
  
  };