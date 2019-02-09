import React, {Component} from 'react';
import Square from './Square'

export default class Board extends Component {

    renderSquare(i) {
        return <Square
            value={i}
            onClick = {()=>this.props.onClick(i)}
        />
    }


    render() {
        const currentBoard = this.props.currentBoard.squares;
        const stepLimit = this.props.currentBoard.stepLimit;
        const levelID = this.props.currentBoard.levelID;
        const draw = currentBoard.map((step, move) => {
            return (
                <div key={move}>
                    {this.renderSquare(step)}
                </div>
            )
        });
        return (
            <div className="boardBackground">
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