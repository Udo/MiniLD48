var wizardCounter = 1;

var wizardController = {
  
  makeDomObject : function(wiz, container) {
  
    container.append('<div id="wid-'+wiz.id+'" class="gameunit wizard" data-wid="'+wiz.id+'">W</div>');
    return($('#wid-'+wiz.id));
  
    },
  
  display : function(wiz) {
  
    wiz.domLink
      .css('left', config.tileSize*wiz.pos.x)
      .css('top', config.tileSize*wiz.pos.y);
  
    },
    
  walkTo : function(wiz) {
    
    
    
    },
    
  };

var makeWizard = function(wizParams) {
  
  var wizardObject = { 
    id : wizardCounter++,
    pos : { x : 10, y : 10 },
    display : function() { wizardController.display(wizardObject);},
    walkTo : function() { wizardController.walkTo(wizardObject); },
    };
    
  gameState.units[wizardObject.id] = wizardObject;
  wizardObject.domLink = wizardController.makeDomObject(wizardObject, mapState.container);
    
  return(wizardObject);
  
  };
  
  
