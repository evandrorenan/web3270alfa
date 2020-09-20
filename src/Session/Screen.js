import React from 'react';

import './Screen.css';
import Row from './Row';
import keyDown from "../KeyEvents/KeyDown";

const breakFieldText = ( startRow, startCol, fieldText) => {

    startRow--;
    startCol--;

    let fieldRows = [];
    let maxCols = fieldText.length <= 80 - startCol ? 80 : 80 - startCol;

    for (let j = 0; fieldText.length > 0; j++) {
        let stringLength = fieldText.length > maxCols ? maxCols : fieldText.length;

        let row = {};
        row.startRow = startRow + j;
        row.startCol = j === 0 ? startCol : 0;
        row.fieldText = fieldText.substring(0, stringLength);

        fieldRows.push(row);
        
        fieldText = fieldText.substring(stringLength); 
        maxCols = 80;          
    }

    return fieldRows;
}

const Screen = (props) => {
    
    let rows = [];

    // clean screen to be remounted
    for (let i = 0; i < 24; i++) {
        rows[i] = " ".repeat(80);
    }

    // set text from fields. Deal with fields with more columns than available in current row
    for (let i = 0; i < props.fieldList.length; i++) {
        let brkRows = breakFieldText(props.fieldList[i].startRow,
                                               props.fieldList[i].startColumn,
                                               props.fieldList[i].text);
        for (let j = 0; j < brkRows.length; j++) {
            rows[brkRows[j].startRow] = 
                    rows[brkRows[j].startRow].substring(0, brkRows[j].startCol) + 
                    brkRows[j].fieldText +
                    rows[brkRows[j].startRow].substring(brkRows[j].startCol + brkRows[j].fieldText.length);
        }
    }

    return (
        <div className="Screen" key="screen">
            {rows.map((row, index) => {
                return <Row 
                    fieldList={props.fieldList}
                    key={index}
                    buffer={row} 
                    onkeyup={onkeyup}
                    onkeydown={onkeydown}
                    rowNumber={index} />
            })}
        </div>
    )
}

// const nextPosition = (position, desloc) => {

//     position += desloc;
    
//     if (position < 0) {
//         position += 1920;
//     }

//     if (position > 1919) {
//         position -= 1920;
//     }

//     return position;    
// }

// const currentFieldStart = (event, position) => {
//     if (isProtected(event.target)) {
//         return event.target;
//     }

//     for (let i = position; i >= 0; i--) {
//         if (isProtected(inputField(event, i))) {
//             return inputField(event, i + 1);
//         }
//     }
    
//     return event.target;
// }

// const currentFieldEnd = (event, position) => {
//     if (isProtected(event.target)) {
//         return event.target;
//     }

//     for (let i = position + 1; i < 1920; i++) {
//         if (isProtected(inputField(event, i))) {
//             return inputField(event, (i === 0 ? 0 : i - 1));
//         }
//     }
    
//     return event.target;
// }

// const previowsInputField = (event, position) => {
//     // WIP
//     let fieldStartPosition = getPosition(currentFieldStart(event, position));

//     // look from current position until the beginning
//     for (let i = fieldStartPosition - 1; i >= 0; i--) {
//         if (!isProtected(inputField(event, i))) {
//             return currentFieldStart(event, i);
//         }
//     }

//     // look from the end until current position
//     for (let i = 1919; i >= position; i--) {
//         if (!isProtected(inputField(event, i))) {
//             return currentFieldStart(event, i);
//         }
//     }

//     return inputField(event, 0);
// }

// const nextInputField = (event, position) => {
//     let fieldEndPosition = getPosition(currentFieldEnd(event, position));

//     // loop from current position until end of the screen
//     for (let i = fieldEndPosition + 1; i < 1920; i++) {
//         if (!isProtected(inputField(event, i))) {
//             return inputField(event, i);
//         }
//     }

//     // look from the beginning until current position
//     for (let i = 0; i < position + 1; i++) {
//         if (!isProtected(inputField(event, i))) {
//             return inputField(event, i);
//         }
//     }

//     return inputField(event, 0);
// }

// const rcPosition = (position) => {
//     const row = parseInt(position / 80);
//     const col = parseInt(position - (row * 80));
//     return {
//         row: row,
//         col: col
//     }
// }

// const focusOn = (event, positionNumber) => {
//     let rc = rcPosition(positionNumber);
//     event.target.parentNode.parentNode.children[rc.row].children[rc.col].focus();
// }

// const inputField = (event, position) => {
//     const rc = rcPosition(position);
//     return event.target.parentNode.parentNode.children[rc.row].children[rc.col];
// }

// const isProtected = (inputField) => {
//     return (inputField.className.search(" Prot") >= 0 );
// }

// const isFunctionKey = (event) => {
//     const keyInputs = ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", 
//                        "F11", "F12", "PageUp", "PageDown", "Enter", "Pause"];
//     return (keyInputs.indexOf(event.key) >= 0);
// }

// const handleFunctionKey = (event, position) => {
//     if (isFunctionKey) {
//         return false;
//     }
// }

// const isSpecialKey = (event) => {
//     const specialKeys = [ "Unidentified"
// 						, "Home"
// 						, "Control"
// 						, "Alt"
// 						, "Shift"
// 						, "Escape"
// 						, "Tab"
// 						, "CapsLock"
// 						, "Delete"
//                         , "Insert"
//                         , "Backspace"
// 						, "End" ];

//     return (specialKeys.indexOf(event.key) >= 0);
// }

// const handleSpecialKeys = (event, position) => {

//     if (event.key === "Home") {
//         nextInputField(event, 0).focus();
//         return;
//     }

//     if (event.key === "Delete") {
//         deleteFieldValue(event, position);
//         return false;
//     }

//     if (event.key === "Backspace") {
//         handleBackspace(event, position);
//         return false;
//     }

//     if (event.key === "Tab") {
//         if (event.shiftKey) {
//             previowsInputField(event, position).focus();
//         } else {
//             nextInputField(event, position).focus();
//         }      
//         return false;
//     }

//     return;
// }

// const deleteFieldValue = (event, position) => {

//     if (isProtected(event.target)) {
//         return false;
//     } 

//     let lastFieldPos = getPosition(currentFieldEnd(event, position));

//     for (let i = position; i < lastFieldPos; i++) {
//         inputField(event, i).value = inputField(event, i + 1).value;
//         inputField(event, i + 1).value = "";
//     }
//     inputField(event, lastFieldPos).value = "";
// }

// const handleBackspace = (event, position) => {
    
//     if (isProtected(event.target)) {
//         return false;
//     } else {
//         let previowsPos = nextPosition(position, -1);
//         if (!isProtected(inputField(event, previowsPos))) {
//             deleteFieldValue(event, previowsPos);
//             inputField(event, previowsPos).focus();
//         }
//     }
// }

// const isArrowKey = (event) => {
//     const arrowKeys = [ "ArrowLeft"
// 						, "ArrowRight"
// 						, "ArrowUp"
// 						, "ArrowDown"];

//     return (arrowKeys.indexOf(event.key) >= 0); 
// }

// const handleArrowKeys = (event, position) => {

//     switch (event.key) {
//         case "ArrowLeft":
//             return inputField(event, nextPosition(position, -1)).focus();
    
//         case "ArrowRight":
//             return focusOn(event, nextPosition(position, 1));

//         case "ArrowUp":
//             return focusOn(event, nextPosition(position, -80));
    
//         case "ArrowDown":
//             return focusOn(event, nextPosition(position, 80));

//         default:
//             console.log("Invalid arrow key: " + event.key);
//             break;
//     }
// }

// const getPosition = (inputField) => {
//     return inputField.id.replace("position", "") * 1
// }

// onkeydown = (event) => {
//     if (event.target.id.search("position") < 0 ){
//         return;
//     }

//     let position = getPosition(event.target);

//     if (isFunctionKey(event)) {
//         handleFunctionKey(event, position)
//         return false;
//     }

//     if (isSpecialKey(event)) {
//         handleSpecialKeys(event, position);
//         return false;
//     }

//     if (isArrowKey(event)) {
//         return handleArrowKeys(event, position);
//     }

//     // other keys
//     position = nextPosition(position, 1);

//     const validChars = " âäàáãåçñ¢.<(+|&éêëèíîïìß!$*);¬-/ÂÄÀÁÃ"
//                      + "ÅÇÑ¦,%_>?øÉÊËÈÍÎÏÌ`:#@'=\"Øabcdefghi«»ð"
//                      + "ýþ±°jklmnopqrªºæ¸Æ¤µ~stuvwxyz¡¿ÐÝÞ®^£¥"
//                      + "·©§¶¼½¾[]¯¨´×{ABCDEFGHI­ôöòóõ}JKLMNOPQR"
//                      + "¹ûüùúÿ\\÷STUVWXYZ²ÔÖÒÓÕ0123456789³ÛÜÙÚ";
                        
//     if (validChars.search(event.key) >= 0) {
//         if (!isProtected(event.target)) {
//             event.target.value = event.key;
//             if (isProtected(inputField(event, getPosition(event.target) + 1))) {
//                 nextInputField(event, position).focus();
//                 return;
//             }
//         } else {
//             return false;
//         }
//     } else {
//         return;
//     }

//     return focusOn(event, position);
// }

onkeydown = (event) => {
    return keyDown(event);
}
onkeyup = (event) => {
    return;
}

export default Screen;