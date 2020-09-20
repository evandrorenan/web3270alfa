import React from 'react';

import './Position.css'

const handleFocus = (event) => {
     console.log("handleFocus");
}

const Position = (props) => {
     let pos = ((props.rowNumber * 80)+ props.colNumber);
     let keyName = "position" + pos;
     let fieldIndex = 0;

     for (let i = 0; i < props.fieldList.length; i++) {
          let fieldPos = (((props.fieldList[i].startRow - 1) * 80) + (props.fieldList[i].startColumn - 1));
          if (pos >= fieldPos && pos < fieldPos + props.fieldList[i].length ) {
               fieldIndex = i;
               console.log("fieldIndex: " + fieldIndex + " - " + props.fieldList[i].text);
          }
     } 

     let className = "Position ";

     if (props.fieldList[fieldIndex].hidden) {
          className += " Hidden";
     } else {
          className += props.fieldList[fieldIndex].protected ? " Prot-" : " NotProt-";
          className += props.fieldList[fieldIndex].highLight ? "High" : "NotHigh";
     }

     return <input 
          key={keyName}
          type="text" 
          className={className}
          maxLength="1" 
          onKeyUp={props.onkeyup}
          onKeyDown={props.onkeydown}
          onFocus={handleFocus}
          id={keyName}
          value={props.content} />;     
}

export default Position;