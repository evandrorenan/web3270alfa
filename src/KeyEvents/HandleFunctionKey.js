import { getPosition   } from "./InputFieldInfo"

const HandleFunctionKey = (event, position, screenState, positionRefs) => {
    let functionKey = getPfkey(event);
    if (functionKey === "") {
        return "";
    }

    let sendFunctionKey = {
        row : 0,
        col : 0,
        text : ""
    };
    let sendKey = {
        row : 0,
        col : 0,
        text : ""
    };

    let sendKeys = [];    

    for (let row = 0; row < 24; row++) {
        for (let col = 0; col < 80; col++) {
            if (positionRefs[row * 80 + col] === document.activeElement) {
                sendFunctionKey.row = row;
                sendFunctionKey.col = col;
                sendFunctionKey.text += functionKey;
            }

            if (positionRefs[row * 80 + col].current.state.className.search(" Mod") >= 0) {
                sendKey.row = row;
                sendKey.col = col;
                sendKey.text += positionRefs[row * 80 + col].current.state.positionAttributes.text;
            } else {
                if (sendKey.text && sendKey.text.trim !== "") {
                    sendKeys.push(sendKey);
                    sendKey.text = "";
                }
            }   
        }
    }
    if (sendKey.text.trim !== "") {
        sendKeys.push(sendKey);
    }
    sendKeys.push(sendFunctionKey);

    let request = {};

    request.sessionId = screenState.sessionId;
    request.sendKeys = sendKeys;        
    return request;
}

const getPfkey = (event) => {

    const keyInputs         = ["F1"    , "F2"      , "F3"     , "F4"     , "F5"    , "F6"    , 
                               "F7"    , "F8"      , "F9"     , "F10"    , "F11"   , "F12"   , 
                               "PageUp", "PageDown", "Enter"  , "Pause"  ];

    const functionKeys      = ["[pf1]" , "[pf2]"   , "[pf3]"  , "[pf4]"  , "[pf5]" , "[pf6]" ,  
                               "[pf7]" , "[pf8]"   , "[pf9]"  , "[pf10]" , "[pf11]", "[pf12]",
                               "[pa1]" , "[pa2]"   , "[enter]", "[clear]"];

    const shiftFunctionKeys = ["[pf13]", "[pf14]"  , "[pf15]" , "[pf16]" , "[pf17]", "[pf18]", 
                               "[pf19]", "[pf20]"  , "[pf21]" , "[pf22]" , "[pf23]", "[pf24]",
                               "[pa3]"]
    
    let index = keyInputs.indexOf(event.key); 
    if (event.shiftKey) {
       if (index <= 12 ) {
           return shiftFunctionKeys[index];
       } else {
           return "";
       }
    } else {
        return functionKeys[index];
    }
}

export default HandleFunctionKey;