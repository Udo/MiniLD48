var unitCounter = 1;

var unitTemplates = {

  muncher : {
    
    update : function(muncher) {
      if(muncher.state == 'munching') {
        var food = mechanics.findNext(muncher, 'deadbody', 1);
        if(food) 
          food.damage(1, 'munch');
        else 
          muncher.state = 'searching';          
        }
      else if(muncher.state == 'searching') {
        // look for the nearest food
        uiController.showActivity(muncher.pos, '?');
        var food = mechanics.findNext(muncher, 'deadbody', 100);
        if(food) {
          var munchPosition = mechanics.nearestFreeCell(food);
          if(munchPosition) {
            muncher.state = 'walking';
            muncher.walkTo(munchPosition.x, munchPosition.y, function() { muncher.state = 'munching'; });
            }
          }
        }
      
      },
      
    create : function(muncher) {
      muncher.state = 'munching';
      },
    
    },

  deadbody : {
    
    update : function(db) {
      // if there are any wizards nearby, they get suspicious
      mechanics.nearby(db, 'wizard', 3, function(wiz, dst) {
        wiz.on.suspect(wiz, (100-dst*20));
        });
      },
    
    },
  
  wizard : {
  
    suspect : function(wiz, amount) {
      if(wiz.stats.suspicion < 100) {
        uiController.showActivity(wiz.pos, '!');
        wiz.stats.suspicion += amount; 
        }
      else 
        wiz.stats.suspicion = 100;
      },
    
    update : function(wiz) {
      wiz.domElement.css('background', 'rgba('+(wiz.stats.suspicion)+', '+(100-wiz.stats.suspicion)+', '+(0)+', 0.4)');
      if(wiz.stats.suspicion >= 80 && rand(3) == 0) {
        mechanics.nearby(wiz, 'wizard', 3, function(fellow) {
          fellow.on.suspect(fellow, 20);
          });
        }
      },

    create : function(wiz) {
      },
    
    },
  
  };

var makeUnit = function(wizParams) {

  var unitObject = { 
    id : wizParams.type+(unitCounter++),
    path : false,
    stats : {
      suspicion : 0,
      hp : 10,      
      },
    pos : { x : Math.round(gameState.gridSize.x/2), y : Math.round(gameState.gridSize.y/2) },
    oldPos : { x : Math.round(gameState.gridSize.x/2), y : Math.round(gameState.gridSize.y/2) },
    update : function() { unitController.update(unitObject);},
    walkTo : function(x, y, whenFinishedCall) { unitController.walkTo(unitObject, x, y, whenFinishedCall); },
    damage : function(dmg, type) { unitController.damage(unitObject, dmg, type); },
    die : function() { unitController.die(unitObject); },
    };

  $.each(wizParams, function(idx, p) {
    unitObject[idx] = p;
    });
    
  if(unitTemplates[wizParams.type]) {
    unitObject.on = unitTemplates[wizParams.type];
    if(unitObject.on.create)
      unitObject.on.create(unitObject);
  }
  else 
    unitObject.on = {};
  
  gameState.units.push(unitObject);
  unitObject.domElement = unitController.makeDomObject('gameunit '+unitObject.type, unitObject.x, unitObject.y);
    
  return(unitObject);
  
  };
  
  
var makeUnitsFromAll = function(utype, ch) {
  
  if(mapState.positionIndex[ch]) $.each(mapState.positionIndex[ch], function(idx, v) {
      makeUnit({ type : utype, pos : { x : v.pos.x, y : v.pos.y } });
      });
      
  };

var makeLabelFrom = function(ch, labelText) {
  
  if(mapState.positionIndex[ch]) $.each(mapState.positionIndex[ch], function(idx, v) {
      uiController.makeLabel(v.pos, labelText);
      });
      
  };

