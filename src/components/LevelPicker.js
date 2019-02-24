import React, {Component} from 'react';


export default class LevelPicker extends Component {
    // **************************************************************** //
    // prototype of level
    Level(number, moveLimit, levelSet = Array(48).fill(0), levelFinished = false) {
        this.id = number;
        this.moveLimit = moveLimit;
        this.initialSet = levelSet;
        this.levelFinished = levelFinished;
    }
    constructor(props) {
        super(props);
        this.state = {
            allLevelsArr: [
                new this.Level(1, 2, [
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 2, 0, 0, 0, 0,
                    0, 0, 0, 0, 3, 0, 0, 0,
                    0, 0, 0, 2, 0, 0, 0, 0,
                    0, 0, 2, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,]
                ),
                new this.Level(2, 2, [
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 3, 2, 2, 0, 0, 0,
                    0, 0, 0, 2, 0, 2, 0, 0,
                    0, 0, 0, 0, 2, 2, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,]
                ),
                new this.Level(11, 3, [
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 2, 2, 0, 0, 0,
                    0, 0, 0, 2, 0, 2, 0, 0,
                    0, 3, 2, 1, 2, 2, 0, 0,
                    0, 0, 0, 2, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,]
                ),
                new this.Level(12, 3, [
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 2, 2, 2, 0, 0, 0,
                    0, 3, 2, 1, 2, 2, 0, 0,
                    0, 0, 0, 2, 2, 2, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,]
                ),
                new this.Level(21, 4, [
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 2, 2, 0, 2, 2, 0, 0,
                    0, 2, 2, 0, 0, 2, 0, 0,
                    0, 2, 2, 0, 2, 2, 0, 0,
                    0, 3, 0, 0, 0, 2, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,]
                ),
                new this.Level(27, 4, [
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 2, 1, 0, 0,
                    0, 0, 0, 2, 1, 1, 0, 0,
                    0, 0, 0, 2, 1, 0, 0, 0,
                    0, 0, 0, 2, 0, 0, 0, 0,
                    0, 0, 3, 0, 0, 0, 0, 0,]
                ),
                new this.Level(31, 4, [
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 2, 0, 3, 0, 0, 0,
                    0, 0, 2, 1, 0, 2, 0, 0,
                    0, 0, 2, 2, 1, 1, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,]
                ),
                new this.Level(33, 3, [
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 2, 0, 0,
                    0, 0, 0, 0, 2, 2, 0, 0,
                    0, 2, 2, 2, 2, 3, 0, 0,
                    0, 2, 2, 2, 2, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,]
                ),
                new this.Level(40, 5, [
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 3, 2, 0, 0, 0, 0, 0,
                    0, 2, 0, 0, 2, 2, 2, 0,
                    0, 2, 2, 2, 2, 2, 2, 0,
                    0, 2, 0, 2, 0, 0, 2, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,]
                ),
                new this.Level(41, 5, [
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 2, 2, 3, 0, 0,
                    0, 0, 0, 1, 2, 2, 0, 0,
                    0, 0, 2, 2, 0, 1, 0, 0,
                    0, 0, 1, 2, 1, 1, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,]
                ),
            ],
            currentLevel: 1,
        }
    }

    render() {
      const levelList = this.state.allLevelsArr.map(level => {
            return <button
                key={level.id}
                onClick={() => {
                    this.props.setPickedLevelToHistory(level)
                }}>
                {level.id}
            </button>
        });
        return (
            <div>
                <h1>Uśmiech Proszę</h1>
                <div className="controls">
                    {levelList}
                </div>
            </div>
        );
    }
}