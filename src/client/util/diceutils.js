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
  modern: [
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

const rollDice = (diceSet = diceSets[currentDiceSet]) => {
    var dice = diceSet.slice();
    var dieNumber = randInt(dice.length);
    var die = dice[dieNumber];
    var side = randSide(die);

    dice.splice(dieNumber, 1);
    if(diceSet.length > 1) {
        return [...rollDice(dice), side] }
    else {
        return [side]
    }
}

export default rollDice