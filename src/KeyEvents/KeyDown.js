import handleFunctionKey    from "./HandleFunctionKey";
import handleSpecialKeys    from "./HandleSpecialKeys";
import handleArrowKeys      from "./HandleArrowKeys";
import handleType           from "./HandleType";
import { isFunctionKey }    from "./KeyTipe";
import { isSpecialKey }     from "./KeyTipe";
import { isArrowKey }       from "./KeyTipe";
import { isTypedChar }      from "./KeyTipe";
import { getPosition }      from "./InputFieldInfo";

const KeyDown = (event, screenState, positionRefs) => {
    if (event.target.id.search("Position") < 0 ){
        if (isSpecialKey(event)) {
            return false;
        }
        return;
    }

    let position = getPosition(event.target);

    if (isFunctionKey(event)) {
        return handleFunctionKey(event, position, screenState)
    }

    if (isSpecialKey(event)) {
        handleSpecialKeys(event, position, positionRefs);
        return false;
    }

    if (isArrowKey(event)) {
        return handleArrowKeys(event, position, positionRefs);
    }

    if (isTypedChar(event)) {
        screenState.positions[position].modified = true;
        return handleType(event, position);
    }

    return false;
}

export default KeyDown;