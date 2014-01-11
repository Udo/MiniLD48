var config = {
  
  tileSize : 24,
  
  };

var gameState = {
  
  units : [],
  tickCount : 0,
  gridSize : { x : 10, y : 10 },
  
  };
  
var game = {
  
  moveUnits : function() {
    $.each(gameState.units, function(idx, unit) {
      if(unit.update) unit.update();
      });
    },
    
  tick : function() {

    gameState.tickCount++;
    $('#tick_timer').text(gameState.tickCount);
    
    game.moveUnits();    
    curriculum.step();
    
    var suspicionCount = 0;
    var unitCount = 0;
    mechanics.all('wizard', function(wiz) {
      unitCount++;
      if(wiz.stats.suspicion >= 100) 
        suspicionCount++;
      });
    gameState.suspicionRate = Math.round(100*suspicionCount/(unitCount));
    $('#info').text(gameState.suspicionRate+'% suspicion');
      
    setTimeout(game.tick, 1000);
    }
  
  };