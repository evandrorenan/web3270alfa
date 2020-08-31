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

const moveCursor = (positionNumber, direction) => {

    if (direction === "Left"  ) {
        if (positionNumber > 0) {
            positionNumber -= 1;
        } else {
            positionNumber = 1919;
        }
    }

    if (direction === "Up") {
        if (positionNumber > 79) {
            positionNumber -= 80;
        } else {
            positionNumber += 1840;
        }
    }

    if (direction === "Down") {
        if (positionNumber > 1839) {
            positionNumber -= 1840;
        } else {
            positionNumber += 80;
        }
    }

    if (direction === "Right") {
        if (positionNumber >= 1919) {
            positionNumber = 0;
        } else {
            positionNumber += 1;
        }
    }

    return positionNumber;
}

const focusOnNext = (event, positionNumber) => {
    let row = parseInt(positionNumber / 80);
    let col = parseInt(positionNumber - (row * 80));
    if (((row * 80) + col) <= 1919) {
        event.target.parentNode.parentNode.children[row].children[col].focus();
        event.target.parentNode.parentNode.children[row].children[col].selectionStart = 0;
        event.target.parentNode.parentNode.children[row].children[col].selectionEnd = 0;
        return false;
    }
}

onkeydown = (event) => {
    console.log(event.key);

    let positionNumber = event.target.id.replace("position", "") * 1;

    if (event.key === "F1" 
    ||  event.key === "F2" 
    ||  event.key === "F3"
    ||  event.key === "F4"
    ||  event.key === "F5"
    ||  event.key === "F6"
    ||  event.key === "F7"
    ||  event.key === "F8"
    ||  event.key === "F9"
    ||  event.key === "F10"
    ||  event.key === "F11"
    // ||  event.key === "F12"
    ||  event.key === "PageUp" 
    ||  event.key === "PageDown" 
    ||  event.key === "Enter" 
    ||  event.key === "Pause" ) {
        console.log("key: " + event.key);
        return false;
    }

    if (event.key === "Home") {
        positionNumber = 0;
        focusOnNext(event, positionNumber);
        return;
    } else {
        if (event.key === "Unidentified"
        ||  event.key === "Control"
        ||  event.key === "Alt"
        ||  event.key === "Shift"
        ||  event.key === "Escape"
        ||  event.key === "Tab"
        ||  event.key === "CapsLock"
        ||  event.key === "Delete"
        ||  event.key === "Insert"
        ||  event.key === "End") {
            return;
        }
    }

    switch (event.key) {
        case "ArrowLeft":
            positionNumber = moveCursor(positionNumber, "Left");
            focusOnNext(event, positionNumber)
            break;
    
        case "ArrowRight":
            positionNumber = moveCursor(positionNumber, "Right");
            focusOnNext(event, positionNumber)
            break;

        case "ArrowUp":
            positionNumber = moveCursor(positionNumber, "Up");
            focusOnNext(event, positionNumber)
            break;
    
        case "ArrowDown":
            positionNumber = moveCursor(positionNumber, "Down");
            focusOnNext(event, positionNumber)
            break;
            
        case "Backspace":
            positionNumber = moveCursor(positionNumber, "Left");
            event.target.value = " ";
            event.target.focus();
            return;

        default:
            positionNumber = moveCursor(positionNumber, "Right");
            break;
    }

    const validChars = " âäàáãåçñ¢.<(+|&éêëèíîïìß!$*);¬-/ÂÄÀÁÃÅÇÑ¦,%_>?øÉÊËÈÍÎÏÌ`:#@'=\"Øabcdefghi«»ðýþ±°jklmnopqrªºæ¸Æ¤µ~stuvwxyz¡¿ÐÝÞ®^£¥·©§¶¼½¾[]¯¨´×{ABCDEFGHI­ôöòóõ}JKLMNOPQR¹ûüùúÿ\÷STUVWXYZ²ÔÖÒÓÕ0123456789³ÛÜÙÚ";
    
    if (validChars.search(event.key) >= 0) {
        event.target.value = event.key;
    } else {
        return;
    }

    return focusOnNext(event, positionNumber);
}

onkeyup = (event) => {
    // if ("a" === "a") {
        return;
    // }

    // let numberPosition = event.target.id.replace("position", "") * 1;
    // let row = parseInt(numberPosition / 80);
    // let col = parseInt(numberPosition - (row * 80));

    // if (((row * 24) + col) <= 1919) {
    //     event.target.parentNode.parentNode.children[row].children[col].value = event.key;
    // }
}

export default Screen;