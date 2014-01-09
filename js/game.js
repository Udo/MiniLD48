var config = {
  
  tileSize : 24,
  
  };

var gameState = {
  
  units : {},

  gridSize : { x : 10, y : 10 },
  
  };
  
var game = {
  
  tick : function() {
    $.each(gameState.units, function(idx, unit) {
      if(unit.update) unit.update();
      });
    setTimeout(game.tick, 1000);
    }
  
  };