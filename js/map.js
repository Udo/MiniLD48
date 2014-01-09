var mapState = {};

var gameMap = {
  
  setDisplayContainer : function(e) {
    mapState.container = e;
    return(this);
    },
    
  init : function() {
    mapState.pfGrid = new PF.Grid(config.gridSize, config.gridSize);
    mapState.pathFinder = new PF.AStarFinder({});
    return(this);
    },
    
  display : function() {

    return(this);
    },
    
  update : function() {
    
    },
    
  makeCell : function(cellInfo) {
    
    mapState.container.append('<div class="mapblock" style="left:'+(cellInfo.pos.x*config.tileSize)+'px;top:'+(cellInfo.pos.y*config.tileSize)+'px;">X</div>');
    mapState.pfGrid.setWalkableAt(cellInfo.pos.x, cellInfo.pos.y, false);
    
    },

  loadTextMap : function(textLines) {
    $.each(textLines, function(y, line) {
      
      for(var x = 0; x < line.length; x++) {
        
        if(line.charAt(x) == 'X') {
          gameMap.makeCell({ pos : { x : x, y : y } });
        }
        
      }
      
      });    
    },
  
  };