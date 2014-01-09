var wizardCounter = 1;

var wizardController = {
  
  makeDomObject : function(sclass, xp, yp) {
  
    var result = $('<div style="'+
      'left:'+(config.tileSize*xp)+'px;'+
      'top:'+(config.tileSize*yp)+'px;'+
      '" class="'+sclass+'"></div>').appendTo(mapState.container);
    return(result);
  
    },
  
  update : function(wiz) {
  
    if(wiz.path) {
      if(!wiz.path.shift || wiz.path.length == 0) {
        wiz.path = false;
        if(wiz.pathFinished) {
          wiz.pathFinished(wiz, true);
          wiz.pathFinished = false;
        }
      } 
      else {
        var nextPos = wiz.path.shift();
        if(nextPos && nextPos.length > 0) {
          wiz.pos.x = nextPos[0];
          wiz.pos.y = nextPos[1];
        }
      }
    }
  
    if(wiz.pos.x != wiz.oldPos.x || wiz.pos.y != wiz.oldPos.y) {
      expire(6000, wizardController.makeDomObject('wizdot', wiz.oldPos.x, wiz.oldPos.y));
      wiz.domElement
        .css('left', config.tileSize*wiz.pos.x)
        .css('top', config.tileSize*wiz.pos.y);
      wiz.oldPos.x = wiz.pos.x;
      wiz.oldPos.y = wiz.pos.y;
    }
      
    },
    
  getPath : function(wiz, x, y) {
    return(
      mapState.pathFinder.findPath(wiz.pos.x, wiz.pos.y, x, y, gameMap.getGrid(true)));    
    },
    
  walkTo : function(wiz, x, y, whenFinishedCall) {
    
    wiz.destination = { x : x, y : y };
    wiz.path = wizardController.getPath(wiz, x, y);
    if(wiz.path) {
      wiz.pathFinished = whenFinishedCall;
    }
    else {
      wiz.path = false;
      whenFinishedCall(wiz, false);
    }
    
    },

  initWizardsFromMap : function(mapElementChar) {
    
    if(mapState.positionIndex[mapElementChar]) $.each(mapState.positionIndex[mapElementChar], function(idx, v) {
      
      var newWizard = makeWizard({ pos : { x : v.pos.x, y : v.pos.y } });
      
      });
    
    },
        
  };

var makeWizard = function(wizParams) {
  
  var wizardObject = { 
    type : 'wizard',
    id : wizardCounter++,
    path : false,
    pos : { x : Math.round(gameState.gridSize.x/2), y : Math.round(gameState.gridSize.y/2) },
    oldPos : { x : Math.round(gameState.gridSize.x/2), y : Math.round(gameState.gridSize.y/2) },
    update : function() { wizardController.update(wizardObject);},
    walkTo : function(x, y, whenFinishedCall) { wizardController.walkTo(wizardObject, x, y, whenFinishedCall); },
    };
    
  $.each(wizParams, function(idx, p) {
    wizardObject[idx] = p;
    });
    
  gameState.units[wizardObject.id] = wizardObject;
  wizardObject.domElement = wizardController.makeDomObject('gameunit wizard', wizardObject.x, wizardObject.y);
    
  return(wizardObject);
  
  };
  
  
