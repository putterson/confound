import React from 'react';

export default class ConfoundApp extends React.Component {
    render () {
        return (
    <div id="container">
      <div id="board">
	<div className="die"><div className="die-content"></div></div>
	<div className="die"><div className="die-content"></div></div>
	<div className="die"><div className="die-content"></div></div>
	<div className="die"><div className="die-content"></div></div>
	<div className="die"><div className="die-content"></div></div>
	<div className="die"><div className="die-content"></div></div>
	<div className="die"><div className="die-content"></div></div>
	<div className="die"><div className="die-content"></div></div>
	<div className="die"><div className="die-content"></div></div>
	<div className="die"><div className="die-content"></div></div>
	<div className="die"><div className="die-content"></div></div>
	<div className="die"><div className="die-content"></div></div>
	<div className="die"><div className="die-content"></div></div>
	<div className="die"><div className="die-content"></div></div>
	<div className="die"><div className="die-content"></div></div>
	<div className="die"><div className="die-content"></div></div>
      </div>
      <div id="controls">
	<div><button id="roll" type="button">Roll</button></div>
	<div id="timers">
	  <div className="timer">
	    <input type="checkbox" id="timer"></input>Timer
	    <p id="timer_value"></p>
	  </div>
	  <div className="timer">
	    <div className="checkbox"><input type="checkbox" id="countdown"></input>Countdown</div>
	    <p id="countdown_value"></p>
	  </div>
	</div>
      </div>
    </div>
        );
    }
}