import { parseTime, s_to_m_s } from '../util/timeutils.js'

const getInitialTimersState = () => ({
    timers: [
        {name: 'Timer', phase: 'TIMER', time: '3:00', remaining: '3:00', enabled: false, editing: false, valid: true},
        {name: 'Countdown', phase: 'COUNTDOWN', time: '10', remaining: '10', enabled: false, editing: false, valid: true}
    ],
    running: false
})

const updateTimer = (state, timer_id, updateFunc) => {
    return Object.assign({}, state, {
        timers: state.timers.map((timer, i) => {
            if(i === timer_id) {
                return Object.assign({}, timer, updateFunc(timer))
            }
            return timer
        })
    })
}

const timers = (state = getInitialTimersState(), action) => {
    switch (action.type) {
        case 'TIMER_SET_REMAINING':
            if (state.timers[action.timer].valid){
                return updateTimer(state, action.timer, (timer) => ({ remaining: s_to_m_s(parseTime(action.remaining)) }))
            } else {
                return state
            }
        case 'TIMER_SET_TIME':
            if (state.timers[action.timer].valid){
                return updateTimer(state, action.timer, (timer) => ({ time: s_to_m_s(parseTime(action.time)) }))
            } else {
                return state
            }
        case 'TIMER_TOGGLE':
            return updateTimer(state, action.timer, (timer) => ({ enabled: !timer.enabled }))
        case 'TIMER_RUNNING':
            return Object.assign({}, state, {running: action.running})
        case 'TIMER_EDITING':
            return updateTimer(state, action.timer, (timer) => ({ editing: action.editing }))
        case 'TIMER_EDIT_UPDATE':
            let valid = !isNaN(parseTime(action.input))
            console.log(valid)
            return updateTimer(state, action.timer, (timer) => ({ valid: valid }))
        default:
            return state
    }
}

export default timers