import React from 'react';
import './style/Square.css'

export default function Square(props) {
    const type = [
        <div className="emote verySad">
            <div className="face">
                <div className="eye left"/>
                <div className="eye right"/>
                <div className="lips"/>
            </div>
        </div>,
        <div className="emote sad">
            <div className="face">
                <div className="eye left"/>
                <div className="eye right"/>
                <div className="lips"/>
            </div>
        </div>,
        <div className="emote smile">
            <div className="face">
                <div className="eye left"/>
                <div className="eye right"/>
                <div className="lips"/>
            </div>
        </div>,
        <div className="user">
            <div className="pawn">
                <div className="pawnTop"/>
                <div className="pawnMid"/>
                <div className="pawnBtm"/>
            </div>
        </div>,

    ];

    function typeHandler(data) {
        if (data === 3) {
            return type[2]
        } else if (data === 2) {
            return type[1]
        } else if (data === 1) {
            return type[0]
        } else if (data === 4) {
            return type[3]
        }
    }

    return (
        <React.Fragment>
            <button
                onClick={() => props.onClick(this)}>
                {typeHandler(props.value)}
            </button>
        </React.Fragment>
    )
}