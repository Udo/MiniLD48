var config = {
  
  tileSize : 24,
  gridSize : 50
  
  };

var gameState = {
  
  units : {},
  
  };
  
var game = {
  
  tick : function() {
    $.each(gameState.units, function(idx, unit) {
      if(unit.update) unit.update();
      });
    setTimeout(game.tick, 1000);
    }
  
  };