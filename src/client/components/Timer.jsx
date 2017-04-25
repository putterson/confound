import React from 'react';

export default class Timer extends React.Component {
    

    displayOrEditTimer() {
        if (this.props.editing) {
            return <input
                    autoFocus
                    type="text"
                    className="form-control"
                    name={this.props.name}
                    defaultValue={this.props.value}
                    onKeyDown={this.props.onKeyDownHandler}
                    onBlur={this.props.onKeyDownHandler}
                    />
        } else {
            return <p onClick={this.props.editFunc}>{this.props.value}</p>
        }
    }

    render () {
        let timer_class = "timer " + (this.props.enabled ? "timer-enabled" : "timer-disabled")

        return (
            <div className={timer_class}>
                <div className="checkbox" onClick={this.props.toggleFunc}>{this.props.name}</div>
                {this.displayOrEditTimer()}
	        </div>
        )
    }
}