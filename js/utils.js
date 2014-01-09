var rand = function(min, max) {
  var range = max-min;
  var result = Math.round(Math.random()*range);
  return(result+min);
  };