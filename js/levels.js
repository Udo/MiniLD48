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
          '         X   x         xxx       X  x   X          ',
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
    
    uiController.showMessage('<p>Welcome, Dark Lord.</p>'+
      '<p>You have been silently plotting and '+
      'scheming against the puny little wizard students of this school for years. '+
      'Yada yada yada, now there is a dead body in the Conservatory.</p>'+
      '<p>To protect your dark secrets, you need to dispose of it before the students find it.</p>', function() {
      uiController.showMessage('<p>You must hurry, oh Dark Lord, before the students arrive to Botanomancy class.</p>'+
        '<p>Select the "Muncher" spell and cast it near the body. A muncher is a monster that disposes of inconvenient bodies.</p>'+
        '<p class="goal">Goal: dispose of the body before 50% of students find out.</p>');  
      });
    
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