import React, {Component} from 'react';
import Square from './Square'

export default class Board extends Component {

    renderSquare(i, id) {
        return <Square
            value={i}
            id={id}
            onClick={() => this.props.onClick(i, id)}
        />
    };

    backgroundColorPicker(id) {
        if (id >= 0 && id <= 10) {
            return '255,187,17'
        } else if (id >= 11 && id <= 20) {
            return '240,109,6'
        } else if (id >= 21 && id <= 30) {
            return '208,13,30'
        } else if (id >= 31 && id <= 40) {
            return '176,0,181'
        } else if (id >= 41 && id < 50) {
            return '102,102,102'
        }
    };


    render() {
        const currentBoard = this.props.currentBoard.squares;
        const {stepLimit, levelID} = this.props;
        const draw = currentBoard.map((step, move) => {
            return (
                <div key={move}>
                    {this.renderSquare(step, move)}
                </div>
            )
        });

        const gameStyle = {
            background: `rgba(${this.backgroundColorPicker(levelID)}, .7)`,
        };

        return (
            <div className="boardBackground" style={gameStyle}>
                <div className="board">
                    {draw}
                </div>
                <div className="stepLimit">
                    {stepLimit}
                </div>
                <div className="levelID">
                    {levelID}
                </div>
            </div>
        );
    }
}