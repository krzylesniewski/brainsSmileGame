import React from 'react';

export default function Square(props) {
    const type = [
        <i className="fas fa-sad-tear"></i>,
        <i className="fas fa-meh"></i>,
        <i className="fas fa-smile"></i>,
        <i className="fas fa-chess-pawn"></i>,
    ];

    function typeHandler(data){
        if(data === 3) {
            return type[2]
        } else if(data === 2) {
            return type[1]
        }
        else if(data === 1) {
            return type[0]
        } else if (data === 4) {
            return type[3]
        }
    }

    return(
        <React.Fragment>
            <button
                onClick={()=>props.onClick(this)}
            >{typeHandler(props.value)}</button>
        </React.Fragment>
    )
}