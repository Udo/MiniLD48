var wizardCounter = 1;

var wizardController = {
  
  makeDomObject : function(wiz, container) {
  
    container.append('<div id="wid-'+wiz.id+'" class="gameunit wizard" data-wid="'+wiz.id+'">W</div>');
    return($('#wid-'+wiz.id));
  
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
        wiz.pos.x = nextPos[0];
        wiz.pos.y = nextPos[1];
      }
    }
  
    wiz.domLink
      .css('left', config.tileSize*wiz.pos.x)
      .css('top', config.tileSize*wiz.pos.y);
  
    },
    
  walkTo : function(wiz, x, y, whenFinishedCall) {
    
    wiz.path = mapState.pathFinder.findPath(wiz.pos.x, wiz.pos.y, x, y, mapState.pfGrid.clone());
    if(wiz.path) {
      wiz.pathFinished = whenFinishedCall;
    }
    else {
      wiz.path = false;
      whenFinishedCall(wiz, false);
    }
    
    },
    
  };

var makeWizard = function(wizParams) {
  
  var wizardObject = { 
    type : 'wizard',
    id : wizardCounter++,
    path : false,
    pos : { x : 20, y : 20 },
    update : function() { wizardController.update(wizardObject);},
    walkTo : function(x, y, whenFinishedCall) { wizardController.walkTo(wizardObject, x, y, whenFinishedCall); },
    };
    
  $.each(wizParams, function(idx, p) {
    wizardObject[idx] = p;
    });
    
  gameState.units[wizardObject.id] = wizardObject;
  wizardObject.domLink = wizardController.makeDomObject(wizardObject, mapState.container);
  wizardObject.update();  
    
  return(wizardObject);
  
  };
  
  
