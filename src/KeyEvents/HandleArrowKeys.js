import { focusOn        } from "./InputFieldAction";
import { nextPosition   } from "./InputFieldInfo";
import { inputField     } from "./InputFieldInfo";

const HandleArrowKeys = (event, position) => {

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

export default HandleArrowKeys;