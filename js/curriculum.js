var curriculum = {

  initCurriculum : function() {
    
    gameState.nextTimerIndex = 0;
    gameState.nextTimerEvent = gameState.currentLevel.curriculum.timer[0];
    gameState.nextTimerCount = 0;
    
    },
    
  step : function() {
    
      gameState.nextTimerCount++;
      
      if(gameState.nextTimerIndex != -1 && gameState.nextTimerCount >= gameState.nextTimerEvent.time) {
        
        gameState.nextTimerCount = 0;
        
        gameState.currentTimerEvent = gameState.nextTimerEvent;
        curriculum.performAction(gameState.currentTimerEvent);
        
        gameState.nextTimerIndex++;
        if(gameState.nextTimerIndex >= gameState.currentLevel.curriculum.timer.length)
          gameState.nextTimerIndex = -1;        
        else
          gameState.nextTimerEvent = gameState.currentLevel.curriculum.timer[gameState.nextTimerIndex];
      
      }
        
    },
    
  goAction : function(action) {
    
    var targetPositions = [];
    $.each(action.to, function(idx, posChar) { targetPositions = targetPositions.concat(mapState.positionIndex[posChar]); });
    
    $.each(gameState.units, function(idx, unit) {
      
      if(unit.type == action.who) {
        var ps = gameMap.findFreeCell(targetPositions);
        if(ps) unit.walkTo(ps.pos.x, ps.pos.y);
      }
      
      });
    
  },
  
  performAction : function(action) {
    
    var funcName = action.action+'Action'; // haha
    curriculum[funcName](action);
    
    },
  
  };