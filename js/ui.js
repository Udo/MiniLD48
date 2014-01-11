var uiState = {
  
  mode : 'standard',
  oldCursorPos : { x : 0, y : 0 },
  cursorPos : { x : 0, y : 0 },
  mapClickHandler : false,
  afterClickCallback : false,
  msgBoxClick : false,
  
  };

var uiController = {

  makeLabel : function(pos, caption) {
    var label = unitController.makeDomObject('label', pos.x, pos.y);
    label.text(caption);
    },

  showActivity : function(pos, caption) {
    var banner = unitController.makeDomObject('banner', pos.x, pos.y);
    banner.text(caption);
    requestAnimationFrame(function(){ banner.css('top', (pos.y*config.tileSize)-12); });
    expire(1000, banner);
    },
    
  showInstruction : function(caption) {
    $('#instruction').html(caption);
    },
    
  showMessage : function(content, afterOKFunc) {
    gameState.nextTick = function() {
      game.pause();
      $('#msgbox-content').html(content);
      $('#msgbox').fadeIn(300);    
      uiState.msgBoxClick = function() {
        game.run();
        if(afterOKFunc) afterOKFunc();
        };  
      };
    },
    
  page2MapCoord : function(xp, yp, pos) {
    var xpos = xp-uiState.mapPosition.left;
    var ypos = yp-uiState.mapPosition.top;
    pos.x = Math.round((xpos-config.tileSize/2) / config.tileSize);
    pos.y = Math.round((ypos-config.tileSize/2) / config.tileSize);
    },

  init : function() {

    uiState.mapPosition = $('#map').offset();
    uiController.mode('standard');

    $('#map').mouseup(function(event) {
      if(uiState.mapClickHandler) {
        uiController.page2MapCoord(event.pageX, event.pageY, uiState.cursorPos);
        uiState.mapClickHandler(uiState.cursorPos);
        }
      });

    $('#map').mousemove(function(event) {
      uiController.page2MapCoord(event.pageX, event.pageY, uiState.cursorPos);
      if(uiState.cursorPos.x != uiState.oldCursorPos.x || uiState.cursorPos.y != uiState.oldCursorPos.y) {
        $('#cursor')
          .css('left', uiState.cursorPos.x*config.tileSize)
          .css('top', uiState.cursorPos.y*config.tileSize);
        // display some info:
        // ...
        }
      });
    
  },

  onPlacementClick : function(pos) {
    uiState.mapClickHandler = false;
    if(uiState.afterClickCallback)
      uiState.afterClickCallback(pos);
    },

  mode : function(m) {
    uiState.mode = m;
    $('#cursor').removeClass();
    $('#cursor').addClass('crs-'+m);
    },

  pickLocation : function(p, whenDoneFunc) {
    uiState.afterClickCallback = whenDoneFunc;
    uiState.mapClickHandler = uiController.onPlacementClick;
    if(p.caption)
      uiController.showInstruction(p.caption);
    uiController.mode('pick');    
    },
  
  // cast a spell
  castAction : function(act) {
    
    uiController.pickLocation({ caption : 'select a place on the map where you want to cast the spell' }, function(pos) {
      uiController.mode('standard');
      $('#instruction').text('');
      spells.cast({ type : act.spell, pos : pos });
      });
    
    },
  
  };

var uiAction = function(act) {
  
  var funcName = act.action+'Action';
  uiController[funcName](act);
  
  };