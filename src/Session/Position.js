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
          let fieldPos = ((props.fieldList[i].startRow * 80)+ props.fieldList[i].startColumn);
          if (pos >= fieldPos && pos < fieldPos + props.fieldList[i].fieldLength ) {
               fieldIndex = i;
               // console.log("fieldIndex: " + fieldIndex + " - " + props.fieldList[i].text);
          }
     } 

     let className = "Position ";

     if (props.fieldList[fieldIndex].isHidden) {
          className += " Hidden";
     } else {
          className += props.fieldList[fieldIndex].isProtected ? " Prot-" : " NotProt-";
          className += props.fieldList[fieldIndex].isHighLight ? "High" : "NotHigh";
     }

     console.log("sc: " + className);

     return <input 
          key={keyName}
          type="text" 
          className={className}
          maxLength="1" 
          onKeyUp={props.onkeyup}
          onKeyDown={props.onkeydown}
          onFocus={handleFocus}
          id={keyName}
          defaultValue={props.content} />;     
}

export default Position;