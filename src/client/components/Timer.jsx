import React from 'react';

export default class Timer extends React.Component {
    

    displayOrEditTimer() {
        if (this.props.editing) {
            let clazz = (this.props.valid ? "valid" : "invalid") 
            return <input
                    autoFocus
                    type="text"
                    className={clazz}
                    name={this.props.name}
                    defaultValue={this.props.value}
                    onKeyUp={this.props.onKeyHandler}
                    onBlur={this.props.onKeyHandler}
                    onFocus={(e) => e.target.select()}
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