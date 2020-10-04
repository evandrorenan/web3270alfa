import React from 'react';

import './Row.css';
import Position2 from './Position2.js';

const Row2 = (props) => {
    let keyName = "row" + props.rowNumber;

    return ( 
        <p className="Row" key={keyName}>
            {Array(80).fill().map((col, index) => {
                return <Position2 
                    key={props.rowNumber * 80 + index}
                    rowNumber={props.rowNumber} 
                    colNumber={index} /> 
                })
            }
        </p>
    )
}

export default Row2;