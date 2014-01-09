var mapState = {
  
  doomList : [],
  
  };

var gameMap = {
  
  setDisplayContainer : function(e) {
    mapState.container = e;
    return(this);
    },
    
  init : function() {
    mapState.pathFinder = new PF.AStarFinder({});
    return(this);
    },
    
  display : function() {

    return(this);
    },
    
  update : function() {
    
    },
    
  makeCell : function(cellInfo) {
    
    mapState.container.append('<div class="mapblock" style="left:'+(cellInfo.pos.x*config.tileSize)+'px;top:'+(cellInfo.pos.y*config.tileSize)+'px;"> </div>');
    mapState.pfGrid.setWalkableAt(cellInfo.pos.x, cellInfo.pos.y, false);
    
    },
    
  loadMapLevel : function(mapLevel) {
    gameState.tickCount = 0;
    gameState.currentLevel = mapLevel;
    var textLines = mapLevel.floorPlan;
    gameState.gridSize = { y : textLines.length+1, x : textLines[0].length+1};
    mapState.pfGrid = new PF.Grid(gameState.gridSize.x, gameState.gridSize.y);
    mapState.positionIndex = {};

    $.each(textLines, function(y, line) {
      
      for(var x = 0; x < line.length; x++) {
        
        var ch = line.charAt(x);
        
        switch(ch) {
          case 'X':
            gameMap.makeCell({ pos : { x : x, y : y } });
            break;
        }        
        
        if(!mapState.positionIndex[ch])
          mapState.positionIndex[ch] = [];
          
        mapState.positionIndex[ch].push({ pos : { x : x, y : y } });
        
      }
      
      });
    
      wizardController.initWizardsFromMap(mapLevel.initWizardsFrom);    
      curriculum.initCurriculum();
    },
    
  findFreeCell : function(possiblePositions) {
    if(possiblePositions.length == 0) return false;
    return(possiblePositions.splice(rand(possiblePositions.length-1), 1)[0]);        
    },
    
  isOccupied : function(x, y) {
    var occupied = false;
    if(!mapState.pfGrid.isWalkableAt(x, y)) return(true);
    $.each(gameState.units, function(idx, unit) {
      if(unit.pos.x == x && unit.pos.y == y) {
        occupied = true;
        //console.log('occupied: '+JSON.stringify(unit.pos));
      }
      });
    return(occupied);
    },
    
  getGrid : function(ignoreUnits) {
    
    var result = mapState.pfGrid.clone();
    if(!ignoreUnits)
      $.each(gameState.units, function(idx, unit) {
        result.setWalkableAt(unit.pos.x, unit.pos.y, false);
        });
    return(result);
    
    },
  
  };