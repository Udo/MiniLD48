var uiState = {};

var uiController = {

  

  pickLocation : function(p) {
    
    
    
    },
  
  // cast a spell
  castAction : function(act) {
    
    uiController.pickLocation({ caption : 'select a place on the map where you want to cast the spell' });
    
    },
  
  };

var uiAction = function(act) {
  
  var funcName = act.action+'Action';
  uiController[funcName](act);
  
  };