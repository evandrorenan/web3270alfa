import React from 'react';

import './Screen.css';
import Row from './Row';

const Screen = (props) => {
    /*
    let rows = new Array(24);

    for (let index = 0; index < rows.length; index++) {
        rows[index] = "                                                                                ";
    }
    */

    let rows = 
    [ " *****************************             +----------------------------------+ "
    , "EVANDRO RENAN NOGUEIRA GUIMARAES ESTUDOU A NOITE INTEIRA E NAO RESOLVEU O SPLICE"
    , " *********-    ______  *******             | LUNAME       : OA2BRQFJ          | "
    , " *****_-    -**********- *****             | PORT ADDRESS : 37245             | "
    , " **-      _______    *********             | DATA / HORA  : 08/29/20 16:08:08 | "
    , " *****-  **********-    ******             +----------------------------------+ "
    , " ****-  **************-   ****                                                  "
    , " ****-  ***************-   ***                                                  "
    , " *****- ****************-  ***    *****                *                        "
    , " ******- *******-  ****-  ****    *    *               *                        "
    , " ******** ******-  *** *******    *    *  * *  **    ***   **    **    **   **  "
    , " ***********- **-  ***********    *****   **     *  *  *  *  *  *     *    *  * "
    , " ***********- **-  ***********    *    *  *    ***  *  *  ****   **   *    *  * "
    , " ***********- **-  ***********    *    *  *   *  *  *  *  *        *  *    *  * "
    , " ***********- **-  ***********    *****   *    ***   ***   **    **    **   **  "
    , "                                                                                "
    , " +----------------------------------------------------------------------------+ "
    , " | Esta conexão é específica e de uso exclusivo de empresas via Rede Empresa  | "
    , " | Caso  haja  alguma  irregularidade  nas  informações  apresentadas,  favor | "
    , " | contactar  nossa  Central  de  Atendimento  DITI:  (0 xx 11)  4197-2222    | "
    , " | Empresas                                                                   | "
    , " +----------------------------------------------------------------------------+ "
    , "                                                                                "
    , " Tecle o sistema desejado:                                                      "]

    // Deal with fields that the overflow the remaining columns of the starting row
    for (let i = 0; i < props.fieldList.length; i++) {
        // Force right blanks in the text to match declared size
        props.fieldList[i].text += " ".repeat(
            props.fieldList[i].fieldLength - props.fieldList[i].text.length );

        // Aux variables to easy reading
        let startRow = props.fieldList[i].startRow;
        let startCol = props.fieldList[i].startColumn;
        let fieldText = props.fieldList[i].text;
        let rowText = rows[startRow];

        //Calculate how many positions left available
        let availablePos = 80 - startCol;
        let stringSize = availablePos > fieldText.length ? 
                         fieldText.length : availablePos;
        
        let linString = rowText.substring(0, startCol)
                      + fieldText.substring(0, stringSize)
                      + rowText.substring(startCol + stringSize);
        
        rows[startRow] = linString;

        let remainderText = fieldText.substring(stringSize);

        for (let j = 1; remainderText.length > 0; j++) {
            stringSize = remainderText.length > 80 ? 80 : remainderText.length;
            rows[startRow + j] = remainderText.substring(0, stringSize);
            remainderText = remainderText.substring(stringSize);            
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

const nextPosition = (position, desloc) => {

    position += desloc;
    
    if (position < 0) {
        position += 1920;
    }

    if (position > 1919) {
        position -= 1920;
    }

    return position;    
}

const currentFieldStart = (event, position) => {
    if (isProtected(event.target)) {
        return event.target;
    }

    for (let i = position; i >= 0; i--) {
        if (isProtected(inputField(event, i))) {
            return inputField(event, i + 1);
        }
    }
    
    return event.target;
}

const currentFieldEnd = (event, position) => {
    if (isProtected(event.target)) {
        return event.target;
    }

    for (let i = position + 1; i < 1920; i++) {
        if (isProtected(inputField(event, i))) {
            return inputField(event, (i === 0 ? 0 : i - 1));
        }
    }
    
    return event.target;
}

const previowsInputField = (event, position) => {
    // WIP
    let fieldStartPosition = getPosition(currentFieldStart(event, position));

    // look from current position until the beginning
    for (let i = fieldStartPosition - 1; i >= 0; i--) {
        if (!isProtected(inputField(event, i))) {
            return currentFieldStart(event, i);
        }
    }

    // look from the end until current position
    for (let i = 1919; i >= position; i--) {
        if (!isProtected(inputField(event, i))) {
            return currentFieldStart(event, i);
        }
    }

    return inputField(event, 0);
}

const nextInputField = (event, position) => {
    let fieldEndPosition = getPosition(currentFieldEnd(event, position));

    // loop from current position until end of the screen
    for (let i = fieldEndPosition + 1; i < 1920; i++) {
        if (!isProtected(inputField(event, i))) {
            return inputField(event, i);
        }
    }

    // look from the beginning until current position
    for (let i = 0; i < position + 1; i++) {
        if (!isProtected(inputField(event, i))) {
            return inputField(event, i);
        }
    }

    return inputField(event, 0);
}

const rcPosition = (position) => {
    const row = parseInt(position / 80);
    const col = parseInt(position - (row * 80));
    return {
        row: row,
        col: col
    }
}

const focusOn = (event, positionNumber) => {
    let rc = rcPosition(positionNumber);
    event.target.parentNode.parentNode.children[rc.row].children[rc.col].focus();
}

const inputField = (event, position) => {
    const rc = rcPosition(position);
    return event.target.parentNode.parentNode.children[rc.row].children[rc.col];
}

const isProtected = (inputField) => {
    return (inputField.className.search(" Prot") >= 0 );
}

const isFunctionKey = (event) => {
    const keyInputs = ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", 
                       "F11", "F12", "PageUp", "PageDown", "Enter", "Pause"];
    return (keyInputs.indexOf(event.key) >= 0);
}

const handleFunctionKey = (event, position) => {
    if (isFunctionKey) {
        return false;
    }
}

const isSpecialKey = (event) => {
    const specialKeys = [ "Unidentified"
						, "Home"
						, "Control"
						, "Alt"
						, "Shift"
						, "Escape"
						, "Tab"
						, "CapsLock"
						, "Delete"
                        , "Insert"
                        , "Backspace"
						, "End" ];

    return (specialKeys.indexOf(event.key) >= 0);
}

const handleSpecialKeys = (event, position) => {

    if (event.key === "Home") {
        nextInputField(event, 0).focus();
        return;
    }

    if (event.key === "Delete") {
        deleteFieldValue(event, position);
        return false;
    }

    if (event.key === "Backspace") {
        handleBackspace(event, position);
        return false;
    }

    if (event.key === "Tab") {
        if (event.shiftKey) {
            previowsInputField(event, position).focus();
        } else {
            nextInputField(event, position).focus();
        }      
        return false;
    }

    return;
}

const deleteFieldValue = (event, position) => {

    if (isProtected(event.target)) {
        return false;
    } 

    let lastFieldPos = getPosition(currentFieldEnd(event, position));

    for (let i = position; i < lastFieldPos; i++) {
        inputField(event, i).value = inputField(event, i + 1).value;
        inputField(event, i + 1).value = "";
    }
    inputField(event, lastFieldPos).value = "";
}

const handleBackspace = (event, position) => {
    
    if (isProtected(event.target)) {
        return false;
    } else {
        let previowsPos = nextPosition(position, -1);
        if (!isProtected(inputField(event, previowsPos))) {
            deleteFieldValue(event, previowsPos);
            inputField(event, previowsPos).focus();
        }
    }
}

const isArrowKey = (event) => {
    const arrowKeys = [ "ArrowLeft"
						, "ArrowRight"
						, "ArrowUp"
						, "ArrowDown"];

    return (arrowKeys.indexOf(event.key) >= 0); 
}

const handleArrowKeys = (event, position) => {

    switch (event.key) {
        case "ArrowLeft":
            return inputField(event, nextPosition(position, -1)).focus();
    
        case "ArrowRight":
            return focusOn(event, nextPosition(position, 1));

        case "ArrowUp":
            return focusOn(event, nextPosition(position, -80));
    
        case "ArrowDown":
            return focusOn(event, nextPosition(position, 80));

        default:
            console.log("Invalid arrow key: " + event.key);
            break;
    }
}

const getPosition = (inputField) => {
    return inputField.id.replace("position", "") * 1
}

onkeydown = (event) => {
    if (event.target.id.search("position") < 0 ){
        return;
    }

    let position = getPosition(event.target);

    if (isFunctionKey(event)) {
        handleFunctionKey(event, position)
        return false;
    }

    if (isSpecialKey(event)) {
        handleSpecialKeys(event, position);
        return false;
    }

    if (isArrowKey(event)) {
        return handleArrowKeys(event, position);
    }

    // other keys
    position = nextPosition(position, 1);

    const validChars = " âäàáãåçñ¢.<(+|&éêëèíîïìß!$*);¬-/ÂÄÀÁÃ"
                     + "ÅÇÑ¦,%_>?øÉÊËÈÍÎÏÌ`:#@'=\"Øabcdefghi«»ð"
                     + "ýþ±°jklmnopqrªºæ¸Æ¤µ~stuvwxyz¡¿ÐÝÞ®^£¥"
                     + "·©§¶¼½¾[]¯¨´×{ABCDEFGHI­ôöòóõ}JKLMNOPQR"
                     + "¹ûüùúÿ\\÷STUVWXYZ²ÔÖÒÓÕ0123456789³ÛÜÙÚ";
                        
    if (validChars.search(event.key) >= 0) {
        if (!isProtected(event.target)) {
            event.target.value = event.key;
            if (isProtected(inputField(event, getPosition(event.target) + 1))) {
                nextInputField(event, position).focus();
                return;
            }
        } else {
            return false;
        }
    } else {
        return;
    }

    return focusOn(event, position);
}

onkeyup = (event) => {
    return;
}

export default Screen;