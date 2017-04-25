import React from 'react';

export default class Timer extends React.Component {
    render () {
        let timer_class = "timer " + (this.props.enabled ? "timer-enabled" : "timer-disabled")

        return (
            <div className={timer_class} onClick={this.props.toggleFunc}>
                <div className="checkbox">{this.props.name}</div>
                <p>{this.props.value}</p>
	        </div>
        )
    }
}