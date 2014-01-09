var curriculum = {

  initCurriculum : function() {
    
    gameState.nextTimerIndex = 0;
    gameState.nextTimerEvent = gameState.currentLevel.curriculum.timer[0];
    gameState.nextTimerCount = 0;
    
    },

  goAction : function(action) {
    
    var targetPositions = [];
    $.each(action.to, function(idx, posChar) { targetPositions = targetPositions.concat(mapState.positionIndex[posChar]); });
    
    $.each(gameState.units, function(idx, unit) {
      
      var ps = gameMap.findFreeCell(targetPositions);
      if(ps) unit.walkTo(ps.pos.x, ps.pos.y);
      
      });
    
  },
  
  performAction : function(action) {
    
    var funcName = action.action+'Action'; // haha
    curriculum[funcName](action);
    
    },
  
  };