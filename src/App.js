import React, {Component} from 'react';
import './App.css';
import Board from './components/Board'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(48).fill(null),
                stepNumber: 0,
                stepLimit: 4,
                levelID: 33,
            }],
            stepNumber: 0,
            isLevelLoaded: false,
        };
    }

    // **************************************************************** //
    setPickedLevelToHistory(pickedLevel) {
        this.setState({
            history: [{
                squares: pickedLevel.initialSet,
                stepLimit: pickedLevel.moveLimit,
                levelID: pickedLevel.id,
            }],
        })
    }

    handleClick(i) {
        // sprawdzić czy level został załadowany
        // złapać stary stan. DONE
        // stworzyć nowy (zmienić wartość klikniętego pola na "4") DONE
        // zapisać nowy stan do Historii na nastepne pole
        // poprawić informacje przesyłane do Borda ana nowy stan history[1]
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const board = current.squares.slice();

        if (board[i] === 0) {
            board[i] = 4;
        }
        console.log(board[i]);
        this.setState({
            history: history.concat({
                squares: board,
            }),
            stepNumber: history.length,
            isLevelLoaded: false,
        });

    }



// **************************************************************** //
// prototype of level
    Level(number, moveLimit) {
        this.id = number;
        this.moveLimit = moveLimit;
        this.initialSet = Array(48).fill(0);
    }


    // **************************************************************** //
    render() {

        // Generowane levele
        const level27 = new this.Level(27, 4);
        level27.initialSet = [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 2, 1, 0, 0,
            0, 0, 0, 2, 1, 1, 0, 0,
            0, 0, 0, 2, 1, 0, 0, 0,
            0, 0, 0, 2, 0, 0, 0, 0,
            0, 0, 3, 0, 0, 0, 0, 0,
        ];

        const level33 = new this.Level(33, 4);
        level33.initialSet = [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 8, 2, 0, 0,
            0, 0, 0, 0, 2, 2, 0, 0,
            0, 2, 2, 2, 2, 3, 0, 0,
            0, 2, 2, 2, 2, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
        ];
        return (
            <div className="App ">
                <div className="container">
                    <h1>Hello World</h1>
                    <div className="controls">
                        <p>level picekr</p>
                        <button
                            onClick={() => {
                                this.setPickedLevelToHistory(level27)
                            }}
                        >
                            27
                        </button>
                        <button
                            onClick={() => {
                                this.setPickedLevelToHistory(level33)
                            }}
                        >
                            33
                        </button>
                    </div>
                    <Board
                        currentBoard={this.state.history[this.state.history.length - 1]}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
            </div>
        );
    }
}



