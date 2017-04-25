import React from 'react';

export default class Board extends React.Component {
    render () {
        return (
            <div id="board">
                {[...Array(this.props.boardSize)].map((x, i) => <div className="die" key={i}><div className="die-content">{this.props.diceFaces[i]}</div></div>)}
            </div>
        )
    }
}