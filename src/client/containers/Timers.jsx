import React from 'react';
import { connect } from 'react-redux'
import Timer from '../components/Timer.jsx'
import { toggleTimer, editTimer, timerSet, timerTick, timerEditUpdate } from '../actions/index.js'

const mapStateToProps = (state) => ({
    timers: state.timers.timers
})

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
})

const editKeyHandlerFactory = (dispatch, id) => {
    return function (event) {
        if ( event.keyCode === 13 || event.type === 'blur') {
            dispatch(timerSet(id, event.target.value))
            dispatch(timerTick(id, event.target.value))
            dispatch(editTimer(id, false))
        } else {
            dispatch(timerEditUpdate(id, event.target.value))
        }
    }
}

let Timers = ({timers, dispatch}) => {
    return (
        <div id="timers">
            {timers.map( (x, i) => 
                <Timer 
                    name={x.name}
                    value={x.remaining}
                    enabled={x.enabled}
                    editing={x.editing}
                    key={i}
                    toggleFunc={() => dispatch(toggleTimer(i))}
                    editFunc={() => dispatch(editTimer(i, true))}
                    onKeyHandler={editKeyHandlerFactory(dispatch, i)}
                    valid={x.valid}
                />
            )}
        </div>
    );
}

Timers = connect(
    mapStateToProps,
    mapDispatchToProps
)(Timers)

export default Timers