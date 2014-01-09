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
  
  };