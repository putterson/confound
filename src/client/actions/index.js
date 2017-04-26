import { start_interval, m_s_to_s, s_to_m_s } from '../util/timeutils.js'
import Intervals from '../util/Intervals.js'
import beep from '../util/Beeper.js'

const intervals = new Intervals()

export const rollDice = () => {
  return {
    type: 'ROLL_DICE'
  }
}


/* Timer actions */
export const timerTick = (id, remaining) => {
  return {
    type: 'TIMER_SET_REMAINING',
    timer: id,
    remaining: remaining 
  }
}

export const timerSet = (id, time) => {
  return {
    type: 'TIMER_SET_TIME',
    timer: id,
    time: time
  }
}

export const toggleTimer = (id) => {
  return {
    type: 'TIMER_TOGGLE',
    timer: id
  }
}

export const timerRunning = (running) => {
  return {
    type: 'TIMER_RUNNING',
    running: running
  }
}

export const editTimer = (id, editing) => {
  return function (dispatch, getState) {
    if(!getState().timers.running){
      dispatch( {
        type: 'TIMER_EDITING',
        timer: id,
        editing: editing
      }
      )
    }
  }
}

/* Game phases */
export const phaseInit = () => {
  return function (dispatch, getState) {
    dispatch(phaseCountdown())
  }
}

export const phaseCountdown = () => {
  return function (dispatch, getState) {
    var countdownTimer = getState().timers.timers[1]
    if (countdownTimer.enabled){
      dispatch(timerRunning(true))
      var seconds = m_s_to_s(countdownTimer.time)
      var countdown_update = function(rem){
          dispatch(timerTick(1, s_to_m_s(rem)));
          if ( rem <= 0 ) {
            dispatch(timerTick(1, countdownTimer.time))
            dispatch(phaseRoll())
          }
      };
      intervals.start_interval(seconds, countdown_update);
    } else {
      dispatch(phaseRoll())
    }
  }
}

export const phaseRoll = () => {
  return function (dispatch, getState) {
    dispatch(rollDice())
    dispatch(phaseTimer())
  }
}

export const phaseTimer = () => {
  return function (dispatch, getState) {
    var timerTimer = getState().timers.timers[0]
    if (timerTimer.enabled){
      dispatch(timerRunning(true))
      var seconds = m_s_to_s(timerTimer.time)
      var timer_update = function(rem){
          dispatch(timerTick(0, s_to_m_s(rem)));
          if ( rem <= 0 ) {
            dispatch(timerTick(0, timerTimer.time))
            beep()
            dispatch(phaseEnd())
          }
      };
      intervals.start_interval(seconds, timer_update);
    } else {
      dispatch(phaseEnd())
    }
  }
}

export const phaseEnd = () => {
  return function (dispatch) {
    dispatch(timerRunning(false))
    return {type: 'PHASE_END'}
  }
}

export const phaseReset = () => {
  return function (dispatch, getState) {
    intervals.clear_all_intervals()
    var timer_time = getState().timers.timers[0].time
    var countdown_time = getState().timers.timers[1].time
    dispatch(timerTick(0, timer_time))
    dispatch(timerTick(1, countdown_time))
    return dispatch(phaseEnd())
  }
}