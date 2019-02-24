import React, {Component} from 'react';
import './App.css';
import Board from './components/Board'
import LevelPicker from './components/LevelPicker'

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

    handleClick(i, id) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const board = current.squares.slice();
        // console.log(i, id);
        if (board[id] === 0) {
            board[id] = 4;
            this.stateChangeHandle(id, board);
            this.setState({
                history: history.concat({
                    squares: board,
                }),
                stepNumber: history.length,
            });
            
            // wywołanie sprawdzenia ktore elementy maja się zmienić
            // złapać ID - > Spradzić pozić wszystkie kierunki
            // jeżeli znajdziemy element o "i" 3 || 4 zwiększyć wszystkim podrodze i++;
            //
        }
    }

    updateStateOfSingleSquare(id, board) {
        console.log("id",id,"Pole do zmiany",board[id]);
        if(board[id]!==0 &&board[id]<3){
            board[id]++;
        }
        console.log('POle po zmianie', board[id])
    }

    squareNewStateFinder(arr, board) {
        // TODO Dopisać kiedyś prawdzanie czy warto sprawdzać
        console.log(arr);
        let start = null;
        let startID = null;
        let end = null;
        let endID = null;
        arr.forEach((cell,key) => {
            if(cell.value >= 3 && start === null) {
                start = cell.id;
                startID = key;
            } else if (cell.value >= 3 && start !== null){
                end = cell.id;
                endID = key;
            }
        });
        if(start !== null && end !== null){
            for(let i = startID+1; i<endID; i++){
                this.updateStateOfSingleSquare(arr[i].id, board);
            }
        }
        // console.log(start, startID, end, endID)
    }

    stateChangeHandle(id, board) {
        //ustalamy rząd
        let row = Math.floor(id / 8);
        let col = id % 8;
        console.log(id, row, col);
        // ID: 14, ROW: 1 COL:6
        // Złapać cały rząd
        let rowToCheck = this.returnRow(row,board);
        // złapać całą kolumne
        let colToCheck = this.returnCol(col,board);
        // złapać skos 1
        let xOneToCheck = this.returnXOne(id,board);
        // złapać skos 2
        let xTwoToCheck = this.returnXTwo(id,board);

        // Sprawdzanie zwróconych tabilc. 
        this.squareNewStateFinder(rowToCheck, board);
        this.squareNewStateFinder(colToCheck, board);
        this.squareNewStateFinder(xOneToCheck, board);
        this.squareNewStateFinder(xTwoToCheck, board);
    }

    returnRow(num, board){
        let result = [];
        let x = 8 * num;
        for(let i = x; i<8+x; i++){
            result.push({id: i ,value: board[i] });
        }
        return result;
    }

    returnCol(num, board){
        let result = [];
        for(let i = num; i<48; i+=8){
            result.push({id: i ,value: board[i] });
        }
        return result;
    }
    returnXOne(num, board){
        let result = [];
        for(let i = num; i<48; i+=7){
            result.push({id: i ,value: board[i] });
        }
        return result;
    }
    returnXTwo(num, board){
        let result = [];

        return result;
    }

    // **************************************************************** //
    render() {
    const {history, stepLimit, levelID} = this.state;
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
                </div>
            </div>
        );
    }
}



