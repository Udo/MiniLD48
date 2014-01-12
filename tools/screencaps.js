var exec = require('child_process').exec;
var recordStr = 'screencapture -Cm -t jpg -x "screencaps/';
var today = new Date();
var config = {
  prefix : Math.round(today.getTime()/1000)+'-',
  runningCounter : 1000001,
  intervalSeconds : 4,
  };


var makeRecording = function() {

	config.runningCounter++;
	var child = exec(recordStr+config.prefix+config.runningCounter+'.jpg"');
	console.log('taking screenshot '+config.runningCounter);

  };

setInterval(makeRecording, 1000*config.intervalSeconds);