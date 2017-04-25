import React from 'react';
import { connect } from 'react-redux'
import Timer from '../components/Timer.jsx'
import { toggleTimer } from '../actions/index.js'

const mapStateToProps = (state) => ({
    timers: state.timers.timers
})

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
})

let Timers = ({timers, dispatch}) => {
    return (
        <div id="timers">
            {timers.map( (x, i) => <Timer name={x.name} value={x.remaining} enabled={x.enabled} key={i} toggleFunc={() => dispatch(toggleTimer(i))}/>)}
        </div>
    );
}

Timers = connect(
    mapStateToProps,
    mapDispatchToProps
)(Timers)

export default Timers