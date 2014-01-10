var levelData = [];

levelData.push({
  floorPlan : [
          'X                     X    X                      X',
          'XXXXXXXXXXXXXXXXXXXXXXX    XXXXXXXXXXXXXXXXXXXXXXXX',
          'X    xa xa xa xa      X    X      xa xa xa xa     X',
          'X A  xa xa xa xa      X    X      xa xa xa xa  A  X',
          'X Ax                                           xA X',
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
          '         X   x         xxx       X  x   X          ',
          '             x  X  bb        bb  X  x              ',
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
    
    },
  
  curriculum : {
    
    timer : [
      { time : 1, who : 'wizard', action : 'go', to : ['a', 'b'] },
      { time : 100, who : 'wizard', action : 'go', to : ['a'] },
      { time : 100, who : 'wizard', action : 'go', to : ['a', 'b'] },
      { time : 100, who : 'wizard', action : 'go', to : ['a', 'b'] },
      ],    
    
    },
    
  });