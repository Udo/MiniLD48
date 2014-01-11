var levelData = [];

levelData.push({
  floorPlan : [
          'X                     X    X                      X',
          'XXXXXXXXXXXXXXXXXXXXXXX    XXXXXXXXXXXXXXXXXXXXXXXX',
          'X    xa xa xa xa      X    X      xa xa xa xa     X',
          'X A  xa xa xa xa      X    X      xa xa xa xa  A  X',
          'X Ax      2                            3       xA X',
          'X    xa xa xa xa   A  X    X  A   xa xa xa xa     X',
          'X    xa xa xa xa      X    X      xa xa xa xa     X',
          'XXXXXXXXXXXXXXXXXXXXXXX    XXXXXXXXXXXXXXXXXXXXXXXX',
          '                      X    X                       ',
          '                   X          X                    ',
          '                   XXXXXXXXXXXX                    ',
          '                                                   ',
          '                                                   ',
          '                                                   ',
          '         XXX  XXXXXXXXXXXXXXXXXXXXXX  XXX          ',
          '         X      X                X      X          ',
          '         X      X     DB B       X      X          ',
          '         X   x       aaxxx       X  x   X          ',
          '             x  X  bb   1    bb  X  x              ',
          '         X   x  X   bbbbbbbbbb      x   X          ',
          '         X      X                X      X          ',
          '         X      X                X      X          ',
          '         XXX  XXXXXXXXXXXXXXXXXXXXXX  XXX          ',
          '                                                   ',
          '                                                   ',
          ],
  
  initWizardsFrom : 'a',
  
  init : function() {
    
    makeUnitsFromAll('deadbody', 'D');
    makeLabelFrom('1', 'The Conservatory');
    makeLabelFrom('2', 'Jabberworthy Auditorium');
    makeLabelFrom('3', 'Potion Laboratorium');
    
    },
    
  step : function() {
    if(gameState.suspicionRate >= 50) game.lose();
    if(!gameState.unitCounts.deadbody) game.win();
    },
  
  curriculum : {
    
    timer : [
      { time : 10, who : 'wizard', action : 'go', to : ['a', 'b'] },
      { time : 100, who : 'wizard', action : 'go', to : ['a'] },
      { time : 100, who : 'wizard', action : 'go', to : ['a', 'b'] },
      { time : 100, who : 'wizard', action : 'go', to : ['a', 'b'] },
      ],    
    
    },
    
  });