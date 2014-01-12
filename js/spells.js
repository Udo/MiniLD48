var spellCompendium = {
  
  muncher : function(param) {
    // creates a muncher monster
    var muncher = makeUnit({ type : 'muncher', pos : { x : param.pos.x, y : param.pos.y } });
    setTimeout(function() {
      muncher.die();
      }, 1000*15);
    },
  
  };

var spells = {
  
  cast : function(spellParam) {
    
    spellCompendium[spellParam.type](spellParam);
    
    },
  
  };