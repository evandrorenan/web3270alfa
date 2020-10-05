import React from 'react';

import './Row.css';
import Position2 from './Position2.js';

const Row2 = (props) => {
    
    return ( 
        <p className="Row" key={"p" + props.keyName}>
            {props.rowPositions.map((position, index) => {
                return <Position2 
                            key={(props.rowNumber 
                                * props.rowPositions.length + index) 
                                * props.refreshIndicator}
                            rowNumber={props.rowNumber} 
                            onkeydown={props.onkeydown}
                            position={position}
                            colNumber={index} /> 
            })}
        </p>
    )
}

export default Row2;