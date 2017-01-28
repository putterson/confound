
var diceSets = {
  classic: [
    "AACIOT",
    "ABILTY",
    "ABJMOQ",
    "ACDEMP",
    "ACELRS",
    "ADENVZ",
    "AHMORS",
    "BIFORX",
    "DENOSW",
    "DKNOTU",
    "EEFHIY",
    "EGKLUY",
    "EGINTV",
    "EHINPS",
    "ELPSTU",
    "GILRUW"
  ],
  new: [
    "AAEEGN",
    "ABBJOO",
    "ACHOPS",
    "AFFKPS",
    "AOOTTW",
    "CIMOTU",
    "DEILRX",
    "DELRVY",
    "DISTTY",
    "EEGHNW",
    "EEINSU",
    "EHRTVW",
    "EIOSST",
    "ELRTTY",
    "HIMNUQ",
    "HLNNRZ"
  ]
};

var currentDiceSet = "classic";

var interval_handles = [];

function register_interval(callback, interval) {
    var handle = setInterval(callback, interval);
    interval_handles.push(handle);
    console.log("After register: ");
    console.log(interval_handles);
    return handle;
}

function clear_interval(handle) {
    var idx = interval_handles.indexOf(handle);
    if ( idx === -1 ) {
	throw "Interval handle " + handle + " is not registered."
    }
    clearInterval(handle);
    interval_handles.splice(idx,1);
    console.log("After clear: ");
    console.log(interval_handles);
}

function clear_all_intervals() {
    while ( interval_handles.length > 0 ) {
	var handle = interval_handles[0];
	clearInterval(handle);
	interval_handles.splice(0,1);
    }
    console.log("After clear all: ");
    console.log(interval_handles);
}

/* Return the number of registered handlers */
function num_handlers() {
    return interval_handles.length;
}

function randSide(die) {
  var length = die.length
  var side = randInt(length);
  var character = die[side];
  if (character == 'Q'){
    return "Qu"
  }
  return character
}

function randInt(max){
  return Math.floor((Math.random() * max));
}

function rollDice() {
  var diceSet = diceSets[currentDiceSet];
  var dice = diceSet.slice();
  $( ".die-content" ).each( function(idx) {
    var dieNumber = randInt(dice.length);
    var die = dice[dieNumber];
    var side = randSide(die);
    $( this ).text(side);
    dice.splice(dieNumber, 1);
  });
}

function start_interval(seconds, update_callback) {
    var remaining = seconds;
    var interval = null;
    var update = function() {
	console.log("Timer remaining: " + remaining)
	if ( remaining <= 0 ) {
	    clear_interval(interval);
	}
	update_callback(remaining);
	remaining--;
    };
    update(remaining);
    interval = register_interval(update, 1000);
}

/* Seconds to minutes and seconds */
function s_to_m_s (seconds) {
    var min = Math.floor(seconds/60);
    var sec = seconds % 60;
    if ( min > 0 ) {
	return min + ":" + ("00" + sec).slice(-2);
    } else {
	return sec;
    }
}
/* And vice versa */
function m_s_to_s (min_sec) {
    var components = min_sec.split(":");
    if (components.length > 2 || components.length === 0) {
	throw "Invalid minute:second format";
    } else if ( components.length === 2 ) {
	return 60 * parseInt(components[0]) + parseInt(components[1]);
    } else if ( components.length === 1 ) {
	return parseInt(components[0]);
    }
}

var state = {
    initial_timer : "20",
    initial_countdown : "3",
};

function start(state, stage) {
    console.log("start("+stage+")");

    var countdown = document.getElementById("countdown").checked;
    var timer = document.getElementById("timer").checked;
    var countdown_value = state.initial_countdown;
    var timer_value = state.initial_timer;
    
    if (stage === 0) {
	if(!countdown){ return start(state, stage+1); }
	var seconds = m_s_to_s(countdown_value)
	var countdown_update = function(rem){
	    $( "#countdown_value" ).text(s_to_m_s(rem));
	    if ( rem <= 0 ) {
		$( "#countdown_value" ).text(state.initial_countdown);
		start(state, stage+1);
	    }
	};
	start_interval(seconds, countdown_update);
    } else if (stage === 1) {
	rollDice();
	return start(state, stage+1);
    } else if (stage === 2) {
	if(!timer){ return start(state, stage+1); }

	console.log("Timer value: " + timer_value);
	var seconds = m_s_to_s(timer_value)
	var timer_update = function(rem){
	    $( "#timer_value" ).text(s_to_m_s(rem));
	    if ( rem <= 0 ) {
		$( "#timer_value" ).text(state.initial_timer);
		beep();
		setTimeout(beep, 150);
		setTimeout(beep, 300);
		start(state, stage+1);
	    }
	};
	start_interval(seconds, timer_update);
    }

    update(state);
}

function update(state){
    if ( num_handlers() > 0 ) {
	$( "#roll" ).text("Stop");
	$( "#roll" ).off("click");
	$( "#roll" ).click(function(){ stop(state) });
    } else {
	$( "#roll" ).text("Roll");
	$( "#roll" ).off("click");
	$( "#roll" ).click(function(){ start(state, 0); });
    }	
}

function stop(state) {
    console.log("stop");
    clear_all_intervals();
    $( "#timer_value" ).text(state.initial_timer);
    $( "#countdown_value" ).text(state.initial_countdown);
    $( "#roll" ).off("click");
    $( "#roll" ).click(function(){ start(state, 0); });
    $( "#roll" ).text("Roll");
}

function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
    snd.play();
}

$( document ).ready( function() {
    $( "#timer_value" ).text(state.initial_timer);
    $( "#countdown_value" ).text(state.initial_countdown);
    $( "#roll" ).click(function(){start(state, 0)});
    rollDice();
});
