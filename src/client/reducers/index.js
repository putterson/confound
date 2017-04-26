import { combineReducers } from 'redux'
import dice from './dice'
import timers from './timers'

const confoundApp = combineReducers({
  dice,
  timers
})

export default confoundApp