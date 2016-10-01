
function dieRoll() {

  return String.fromCharCode('A'.charCodeAt(0) +  Math.floor((Math.random() * 26)));
}

function rollDice() {
  $( ".die-content" ).each( function(idx) {
    $( this ).text(dieRoll());
    console.log( this);
  });
}

$( document ).ready( function() {
  $( "#roll" ).click(rollDice);
  rollDice();  
});
