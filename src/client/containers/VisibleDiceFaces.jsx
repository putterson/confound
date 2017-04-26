import { connect } from 'react-redux'
import Board from '../components/Board.jsx'

const mapStateToProps = (state) => ({
  boardSize: state.dice.boardSize,
  diceFaces: state.dice.diceFaces
})

const mapDispatchToProps = {}

const VisibleDiceFaces = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)

export default VisibleDiceFaces