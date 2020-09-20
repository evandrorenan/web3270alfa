import handleFunctionKey    from "./HandleFunctionKey";
import handleSpecialKeys    from "./HandleSpecialKeys";
import handleArrowKeys      from "./HandleArrowKeys";
import handleType           from "./HandleType";
import { isFunctionKey }    from "./KeyTipe";
import { isSpecialKey }     from "./KeyTipe";
import { isArrowKey }       from "./KeyTipe";
import { isTypedChar }      from "./KeyTipe";
import { getPosition }      from "./InputFieldInfo";

const KeyDown = (event) => {
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

    if (isTypedChar(event)) {
        return handleType(event, position);
    }

    return false;
}

export default KeyDown;