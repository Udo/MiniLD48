var unitCounter = 1;

var unitTemplates = {

  deadbody : {
    
    update : function(db) {
      // if there are any wizards nearby, they get suspicious
      $.each(gameState.units, function(idx, unit) {
        if(unit.type == 'wizard' && distFromPos(db.pos, unit.pos) < 3) {
          unit.on.suspect(unit);
          }
        });
      },
    
    },
  
  wizard : {
  
    suspect : function(wiz) {
      if(wiz.stats.suspicion < 100) wiz.stats.suspicion += 10;
      },
    
    update : function(wiz) {
      wiz.domElement.css('background', 'rgba('+(wiz.stats.suspicion)+', '+(100-wiz.stats.suspicion)+', '+(0)+', 0.4)');
      },

    create : function(wiz) {
      wiz.stats = {
        suspicion : 0,
        };
      },
    
    },
  
  };

var makeUnit = function(wizParams) {

  var unitObject = { 
    id : wizParams.type+(unitCounter++),
    path : false,
    pos : { x : Math.round(gameState.gridSize.x/2), y : Math.round(gameState.gridSize.y/2) },
    oldPos : { x : Math.round(gameState.gridSize.x/2), y : Math.round(gameState.gridSize.y/2) },
    update : function() { unitController.update(unitObject);},
    walkTo : function(x, y, whenFinishedCall) { unitController.walkTo(unitObject, x, y, whenFinishedCall); },
    };

  $.each(wizParams, function(idx, p) {
    unitObject[idx] = p;
    });
    
  if(unitTemplates[wizParams.type]) {
    unitObject.on = unitTemplates[wizParams.type];
    if(unitObject.on.create)
      unitObject.on.create(unitObject);
  }
  else {
    unitObject.on = {};
  }
  
  gameState.units.push(unitObject);
  unitObject.domElement = unitController.makeDomObject('gameunit '+unitObject.type, unitObject.x, unitObject.y);
    
  return(unitObject);
  
  };
  
  
var makeUnitsFromAll = function(utype, ch) {
  
  if(mapState.positionIndex[ch]) $.each(mapState.positionIndex[ch], function(idx, v) {
      makeUnit({ type : utype, pos : { x : v.pos.x, y : v.pos.y } });
      });
      
}

