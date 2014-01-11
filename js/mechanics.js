// moves a unit along its set path
var mechanics = {
  
  pathStep : function(wiz) {
  
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
  
    },
    
  nearestFreeCell : function(toUnit) {
    for(var x = toUnit.pos.x-1; x <= toUnit.pos.x+1; x++)
      for(var y = toUnit.pos.y-1; y <= toUnit.pos.y+1; y++) {
      if(gameMap.getGrid(false).isWalkableAt(x, y))
        return({ x : x, y : y });
      }
    return(false);
    },
    
  findNext : function(fromUnit, ofType, withinDistance) {
    var result = false;
    mechanics.nearby(fromUnit, ofType, withinDistance, function(foundUnit) {
      result = foundUnit;
      });
    return(result);
    },
    
  all : function(ofType, callFunc) {
    
    $.each(gameState.units, function(idx, unit) {
      if(ofType == false || unit.type == ofType)
        callFunc(unit);
      });
    
    },
    
  nearby : function(fromUnit, toUnitType, maxDist, func) {
    
    $.each(gameState.units, function(idx, unit) {
      
      var calcDistance = distFromPos(fromUnit.pos, unit.pos);
      
      if((!toUnitType || unit.type == toUnitType) && calcDistance <= maxDist) {
        func(unit, calcDistance);
        }
      
      });
    },
  
  };