// moves a unit along its set path
var mechanics = {
  
  pathStep : function(wiz) {
  
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
        if(nextPos && nextPos.length > 0) {
          wiz.pos.x = nextPos[0];
          wiz.pos.y = nextPos[1];
          }
        }
      }
  
    },
  
  };