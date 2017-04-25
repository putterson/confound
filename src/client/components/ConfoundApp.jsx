import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { phaseInit } from '../actions'
import VisibleDiceFaces from '../containers/VisibleDiceFaces.jsx'
import Timers from '../containers/Timers.jsx'

let ConfoundApp = ({dispatch}) => {
    return (
        <div id="container">
            <VisibleDiceFaces />
            <div id="controls">
                <div><button type="button" onClick={() => dispatch(phaseInit())}>Roll</button></div>
                <Timers/>
            </div>
        </div>
    );
}

ConfoundApp = connect()(ConfoundApp)
export default ConfoundApp