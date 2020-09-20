import { isFunctionKey } from "./KeyTipe";

const HandleFunctionKey = (event, position) => {
    if (isFunctionKey) {
        return false;
    }
}

export default HandleFunctionKey;