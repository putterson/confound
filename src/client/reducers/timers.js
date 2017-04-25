const getInitialTimersState = () => ({timers: [
        {name: 'Timer', phase: 'TIMER', time: '3:00', remaining: '3:00', enabled: false},
        {name: 'Countdown', phase: 'COUNTDOWN', time: '10', remaining: '10', enabled: false}
    ]})

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
        case 'TIMER_TICK':
            return updateTimer(state, action.timer, (timer) => ({ remaining: action.remaining }))
        case 'TIMER_SET':
            return updateTimer(state, action.timer, (timer) => ({ time: action.time }))
        case 'TIMER_TOGGLE':
            return updateTimer(state, action.timer, (timer) => ({ enabled: !timer.enabled }))
        default:
            return state
    }
}

export default timers