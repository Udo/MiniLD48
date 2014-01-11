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

    if(!gameState.stopped) {
      gameState.tickCount++;
      $('#tick_timer').text(gameState.tickCount);
      
      game.moveUnits();    
      curriculum.step();
      
      var suspicionCount = 0;
      gameState.unitCounts = {};
      mechanics.all(false, function(wiz) {
        if(wiz.stats.suspicion >= 100) suspicionCount++;
        if(gameState.unitCounts[wiz.type])
          gameState.unitCounts[wiz.type]++;
        else
          gameState.unitCounts[wiz.type] = 1; 
        });
      gameState.suspicionRate = Math.round(100*suspicionCount/(gameState.unitCounts.wizard));
      $('#info').text(gameState.suspicionRate+'% suspicion');
  
      gameState.currentLevel.step();
    }
      
    setTimeout(game.tick, 1000);
    },
    
  lose : function() {
    gameState.stopped = true;
    $('#instruction').text('All is lost! They found you out. You\'ll have time to think about your misdeeds in the Horrible Prison of Sokoban...');
    },
  
  win : function() {
    gameState.stopped = true;
    $('#instruction').text('You managed to survive... this time.');
    },
  
  };