import { start_interval, m_s_to_s, s_to_m_s } from '../util/timeutils.js'
import Intervals from '../util/Intervals.js'

const intervals = new Intervals()

export const rollDice = () => {
  return {
    type: 'ROLL_DICE'
  }
}


/* Timer actions */
export const timerTick = (id, remaining) => {
  return {
    type: 'TIMER_TICK',
    timer: id,
    remaining: remaining 
  }
}

export const timerSet = (id, time) => {
  return {
    type: 'TIMER_SET',
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
      console.log("countdown enabled")
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
      console.log("timer enabled")
        var seconds = m_s_to_s(timerTimer.time)
        var timer_update = function(rem){
            dispatch(timerTick(0, s_to_m_s(rem)));
            if ( rem <= 0 ) {
              dispatch(timerTick(0, timerTimer.time))
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
  return {type: 'PHASE_END'}
}