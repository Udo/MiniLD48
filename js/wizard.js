var wizardCounter = 1;

var wizardController = {
  
  makeDomObject : function(wiz, container) {
  
    container.append('<div id="wid-'+wiz.id+'" class="gameunit wizard" data-wid="'+wiz.id+'">W</div>');
    return($('#wid-'+wiz.id));
  
    },
  
  update : function(wiz) {
  
    if(wiz.path) {
      var nextPos = wiz.path.shift();
      wiz.pos.x = nextPos[0];
      wiz.pos.y = nextPos[1];
      if(wiz.path.length == 0) {
        wiz.path = false;
      } 
    }
  
    wiz.domLink
      .css('left', config.tileSize*wiz.pos.x)
      .css('top', config.tileSize*wiz.pos.y);
  
    },
    
  walkTo : function(wiz, x, y) {
    
    wiz.path = mapState.pathFinder.findPath(wiz.pos.x, wiz.pos.y, x, y, mapState.pfGrid);
    
    },
    
  };

var makeWizard = function(wizParams) {
  
  var wizardObject = { 
    type : 'wizard',
    id : wizardCounter++,
    path : false,
    pos : { x : 10, y : 10 },
    update : function() { wizardController.update(wizardObject);},
    walkTo : function(x, y) { wizardController.walkTo(wizardObject, x, y); },
    };
    
  gameState.units[wizardObject.id] = wizardObject;
  wizardObject.domLink = wizardController.makeDomObject(wizardObject, mapState.container);
    
  return(wizardObject);
  
  };
  
  
