import React, {Component} from 'react';
import Square from './Square'

export default class Board extends Component {

    renderSquare(i, id) {
        return <Square
            value={i}
            id={id}
            onClick={() => this.props.onClick(i, id)}
        />
    }

    render() {
        const currentBoard = this.props.currentBoard.squares;
        const stepLimit = this.props.stepLimit;
        const levelID = this.props.levelID;
        const draw = currentBoard.map((step, move) => {
            return (
                <div key={move}>
                    {this.renderSquare(step, move)}
                    {/*{console.log(step)}*/}
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