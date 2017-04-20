import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Timer from '../components/Timer.jsx';
import Board from '../components/Board.jsx';

export default class ConfoundApp extends React.Component {
    render () {

        var board_size = 16

        return (
            <div id="container">
                <Board size={board_size}/>
                <div id="controls">
                    <div><button id="roll" type="button">Roll</button></div>
                    <div id="timers">
                        <Timer identifier="timer" name="Timer" valueid="timer_value"/>
                        <Timer identifier="countdown" name="Countdown" valueid="countdown_value"/>
                    </div>
                </div>
            </div>
        );
    }
}