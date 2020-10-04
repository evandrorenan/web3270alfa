import { nextPosition }     from "./InputFieldInfo";
import { isProtected }      from "./InputFieldInfo";
import { inputField }       from "./InputFieldInfo";
import { nextInputField }   from "./InputFieldInfo";
import { getPosition }      from "./InputFieldInfo";
import { focusOn }          from "./InputFieldAction";

const HandleType = (event, position) => {
    position = nextPosition(position, 1);

    event.target.value = event.key;
    if (isProtected(inputField(event, getPosition(event.target) + 1))) {
        nextInputField(event, position).focus();
        return;
    } else {
        focusOn(event, position);
    }
}

export default HandleType;