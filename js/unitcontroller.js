var unitController = {
  
  makeDomObject : function(sclass, xp, yp) {
  
    var result = $('<div style="'+
      'left:'+(config.tileSize*xp)+'px;'+
      'top:'+(config.tileSize*yp)+'px;'+
      '" class="'+sclass+'"></div>').appendTo(mapState.container);
    return(result);
  
    },
  
  update : function(wiz) {
  
    mechanics.pathStep(wiz);
  
    if(wiz.pos.x != wiz.oldPos.x || wiz.pos.y != wiz.oldPos.y) {
      expire(6000, unitController.makeDomObject('wizdot', wiz.oldPos.x, wiz.oldPos.y));
      wiz.domElement
        .css('left', config.tileSize*wiz.pos.x)
        .css('top', config.tileSize*wiz.pos.y);
      wiz.oldPos.x = wiz.pos.x;
      wiz.oldPos.y = wiz.pos.y;
    }
    
    if(wiz.on.update)
      wiz.on.update(wiz);
      
    },
    
  getPath : function(wiz, x, y) {
    return(
      mapState.pathFinder.findPath(wiz.pos.x, wiz.pos.y, x, y, gameMap.getGrid(true)));    
    },
    
  walkTo : function(wiz, x, y, whenFinishedCall) {
    
    wiz.destination = { x : x, y : y };
    wiz.path = unitController.getPath(wiz, x, y);
    if(wiz.path) {
      wiz.pathFinished = whenFinishedCall;
    }
    else {
      wiz.path = false;
      whenFinishedCall(wiz, false);
    }
    
    },

  initUnitsFromMap : function(map) {
    
    if(map.initWizardsFrom)
      makeUnitsFromAll('wizard', map.initWizardsFrom);
    
    },
        
  };
  