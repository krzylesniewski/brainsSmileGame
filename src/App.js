import React, {Component} from 'react';
import './App.css';
import Board from './components/Board'
import LevelPicker from './components/LevelPicker'

// TODO bug on level 4. Put pawn on top and see -> checking state out of boards limit
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(48).fill(null),
                stepNumber: 0,
            }],
            stepLimit: 0,
            levelID: 0,
            stepNumber: 0,
            showWinModal: false,
            showLostModal: false,
        };
    }

    // **************************************************************** //
    setPickedLevelToHistory = (pickedLevel) => {
        this.setState({
            history: [{
                squares: pickedLevel.initialSet,
            }],
            stepLimit: pickedLevel.moveLimit,
            levelID: pickedLevel.id,
        })
    };

    // MAIN FUNCTION !!!!!
    handleClick(i, id) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const board = current.squares.slice();
        if (board[id] === 0) {
            board[id] = 4;
            this.stateChangeHandle(id, board);
            this.setState({
                history: history.concat({
                    squares: board,
                }),
                stepNumber: history.length,
            });
        }
        this.gameStatusResolver();
    }

    componentDidUpdate() {
        this.gameStatusResolver();
        // TODO function to check game status [win=all state >3 , lost=move limit reach]
    }

    gameStatusResolver() {
        // checking if all squars are smiled :D
        const {stepLimit, history} = this.state;
        const moveDone = history.length - 1;
        const currentBoard = history[moveDone].squares;

        // console.log(currentBoard);
        // console.log(moveDone,currentBoard.indexOf(2));

        if (currentBoard.indexOf(2) < 0 && currentBoard.indexOf(1) < 0 && moveDone > 1) {
            console.log("Gratulacje wygrałeś");
            // TODO conditional rendering => Model with game Win
            // TODO block posobility to put more pawn f()
            // this.setState({
            //     showWinModal: true,
            // });

        } else if (moveDone >= stepLimit && moveDone > 1) {
            console.log("Koniec gry nie masz już więcej pionków");
            // TODO conditional rendering => Model with game lost and button try again
            // TODO block posobility to put more pawn f()
        }
    }

    updateStateOfSingleSquare(id, board) {
        if (board[id] !== 0 && board[id] < 3) {
            board[id]++;
        }
    }

    // function to checking if we can change state of squars from giver arr
    squareNewStateFinder(arr, board) {
        // TODO add checking to do not cross game board
        let start = null;
        let startID = null;
        let end = null;
        let endID = null;
        arr.forEach((cell, key) => {
            if (cell.value >= 3 && start === null) {
                start = cell.id;
                startID = key;
            } else if (cell.value >= 3 && start !== null) {
                end = cell.id;
                endID = key;
            }
        });
        if (start !== null && end !== null) {
            for (let i = startID + 1; i < endID; i++) {
                this.updateStateOfSingleSquare(arr[i].id, board);
            }
        }
    }

    findCoordinateOfSingleSquare(id) {
        let row = Math.floor(id / 8);
        let col = id % 8;
        // console.log("id:",id, "row:",row, "row:",col);
        return [row, col]
    }

    // getting data in arr and resolving new state of squares
    stateChangeHandle(id, board) {
        const row = this.findCoordinateOfSingleSquare(id)[0]; //TODO refactor this !!!
        const col = this.findCoordinateOfSingleSquare(id)[1];
        let rowToCheck = this.returnRow(row, board);
        let colToCheck = this.returnCol(col, board);
        let xOneToCheck = this.returnXOne(id, board);
        let xTwoToCheck = this.returnXTwo(id, board);

        this.squareNewStateFinder(rowToCheck, board);
        this.squareNewStateFinder(colToCheck, board);
        this.squareNewStateFinder(xOneToCheck, board);
        this.squareNewStateFinder(xTwoToCheck, board);
    }

    //function to finding squars to be check 1
    returnRow(num, board) {
        let result = [];
        let x = 8 * num;
        for (let i = x; i < 8 + x; i++) {
            result.push({id: i, value: board[i]});
        }
        // console.log("returnRow",result);
        return result;
    }

    //function to finding squars to be check 2
    returnCol(num, board) {
        let result = [];
        for (let i = num; i < 48; i += 8) {
            result.push({id: i, value: board[i]});
        }
        // console.log("returnCol",result);
        return result;
    }

    //function to finding squars to be check 3
    returnXOne(num, board) {
        let result = [];
        for (let i = num; i < 48; i += 7) {
            result.push({id: i, value: board[i]});
        }
        for (let i = num; i > 0; i -= 7) {
            result.push({id: i, value: board[i]});
        }
        // console.log("returnXOne",result);
        // TODO use to check board limits findCoordinateOfSingleSquare
        return result;
    }

    //function to finding squars to be check 4
    returnXTwo(num, board) {
        let result = [];
        for (let i = num; i < 48; i += 9) {
            result.push({id: i, value: board[i]});
        }
        for (let i = num; i > 0; i -= 9) {
            result.push({id: i, value: board[i]});
        }
        // console.log("returnXTwo",result);
        // TODO use to check board limits findCoordinateOfSingleSquare
        return result;
    }

    // **************************************************************** //
    render() {
        const {history, stepLimit, levelID} = this.state;
        const winModal = <div className="modal"> Gratulacje wygrałeś </div>;
        return (
            <div className="App ">
                <div className="container">
                    <LevelPicker
                        setPickedLevelToHistory={this.setPickedLevelToHistory}
                    />
                    <Board
                        currentBoard={history[history.length - 1]}
                        stepLimit={stepLimit}
                        levelID={levelID}
                        onClick={(i, id) => this.handleClick(i, id)}
                    />
                    {this.state.showWinModal ? winModal : null}
                </div>
            </div>
        );
    }
}