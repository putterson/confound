import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { phaseInit, phaseReset } from '../actions'
import VisibleDiceFaces from '../containers/VisibleDiceFaces.jsx'
import Timers from '../containers/Timers.jsx'


const mapStateToProps = (state) => ({
    timers: state.timers
})

const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
})


let ConfoundApp = ({timers, dispatch}) => {

    let button_text = timers.running ? 'Stop' : 'Roll'
    let button_onclick = timers.running ? phaseReset : phaseInit

    return (
        <div id="container">
            <VisibleDiceFaces />
            <div id="controls">
                <div><button type="button" onClick={() => dispatch(button_onclick())}>{button_text}</button></div>
                <Timers/>
            </div>
        </div>
    );
}

ConfoundApp = connect(mapStateToProps, mapDispatchToProps)(ConfoundApp)
export default ConfoundApp