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


//    // other keys
//    position = nextPosition(position, 1);

//    const validChars = " âäàáãåçñ¢.<(+|&éêëèíîïìß!$*);¬-/ÂÄÀÁÃ"
//                     + "ÅÇÑ¦,%_>?øÉÊËÈÍÎÏÌ`:#@'=\"Øabcdefghi«»ð"
//                     + "ýþ±°jklmnopqrªºæ¸Æ¤µ~stuvwxyz¡¿ÐÝÞ®^£¥"
//                     + "·©§¶¼½¾[]¯¨´×{ABCDEFGHI­ôöòóõ}JKLMNOPQR"
//                     + "¹ûüùúÿ\\÷STUVWXYZ²ÔÖÒÓÕ0123456789³ÛÜÙÚ";
                       
//    if (validChars.search(event.key) >= 0) {
//        if (!isProtected(event.target)) {
//            event.target.value = event.key;
//            if (isProtected(inputField(event, getPosition(event.target) + 1))) {
//                nextInputField(event, position).focus();
//                return;
//            }
//        } else {
//            return false;
//        }
//    } else {
//        return;
//    }

//    return focusOn(event, position);