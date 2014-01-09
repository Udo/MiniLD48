var config = {
  
  tileSize : 24,
  
  };

var gameState = {
  
  units : {},
  tickCount : 0,
  gridSize : { x : 10, y : 10 },
  
  };
  
var game = {
  
  moveUnits : function() {
    $.each(gameState.units, function(idx, unit) {
      if(unit.update) unit.update();
      });
    },
    
  handleCurriculum : function() {
    
      gameState.nextTimerCount++;
      if(gameState.nextTimerIndex != -1 && gameState.nextTimerCount >= gameState.nextTimerEvent.time) {
        
        gameState.nextTimerCount = 0;
        
        gameState.currentTimerEvent = gameState.nextTimerEvent;
        curriculum.performAction(gameState.currentTimerEvent);
        
        gameState.nextTimerIndex++;
        if(gameState.nextTimerIndex >= gameState.currentLevel.curriculum.timer.length)
          gameState.nextTimerIndex = -1;        
      
      }
        
    },
    
  tick : function() {

    gameState.tickCount++;
    $('#tick_timer').text(gameState.tickCount);
    
    game.moveUnits();    
    game.handleCurriculum();
      
    setTimeout(game.tick, 1000);
    }
  
  };