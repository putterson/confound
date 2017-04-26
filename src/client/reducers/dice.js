import rollDice from '../util/diceutils.js'

const getInitialBoard = () => {
  const diceFaces = rollDice();
  return {
    diceFaces: diceFaces,
    boardSize: diceFaces.length
  }
}

const dice = (state = getInitialBoard(), action) => {
  switch (action.type) {
    case 'ROLL_DICE':
      var diceFaces = rollDice()
      return {diceFaces: diceFaces, boardSize: diceFaces.length}
    default:
      return state
  }
}

export default dice