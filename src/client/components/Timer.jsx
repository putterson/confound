import React from 'react';

export default class Timer extends React.Component {
    render () {
        return (
            <div className="timer">
                <div className="checkbox"><input type="checkbox" id={this.props.identifier}></input>{this.props.name}</div>
                <p id={this.props.valueid}></p>
	        </div>
        )
    }
}