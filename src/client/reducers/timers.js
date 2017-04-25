const getInitialTimersState = () => ({
    timers: [
        {name: 'Timer', phase: 'TIMER', time: '3:00', remaining: '3:00', enabled: false, editing: false},
        {name: 'Countdown', phase: 'COUNTDOWN', time: '10', remaining: '10', enabled: false, editing: false}
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
            return updateTimer(state, action.timer, (timer) => ({ remaining: action.remaining }))
        case 'TIMER_SET_TIME':
            return updateTimer(state, action.timer, (timer) => ({ time: action.time }))
        case 'TIMER_TOGGLE':
            return updateTimer(state, action.timer, (timer) => ({ enabled: !timer.enabled }))
        case 'TIMER_RUNNING':
            return Object.assign({}, state, {running: action.running})
        case 'TIMER_EDITING':
            return updateTimer(state, action.timer, (timer) => ({ editing: action.editing }))
        default:
            return state
    }
}

export default timers