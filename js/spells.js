var spellCompendium = {
  
  muncher : function(param) {
    // creates a muncher monster
    makeUnit({ type : 'muncher', pos : { x : param.pos.x, y : param.pos.y } });
    },
  
  };

var spells = {
  
  cast : function(spellParam) {
    
    spellCompendium[spellParam.type](spellParam);
    
    },
  
  };