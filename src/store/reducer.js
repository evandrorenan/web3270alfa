import { NEW_SESSION , 
         GET_SCREEN,
         SET_IS_CONNECTING, 
         SET_IS_UPDATING_SCREEN, 
         SET_STATUS,
         TOGGLE_KEY_NAME_SUFIX } from '../store/actions';

const initialPositions = () => {
    const strConnecting = "Connecting...";
    let positions = [];
    for (let i = 0; i < strConnecting.length; i++) {
        positions.push({
            positionId : i,
            text: strConnecting.charCodeAt[i],
            protected : false,
            hidden : false,
            highLight : false}
        )
    }
    return positions;
}

const initialState = {    
    sessionId : null,
    screenId : null,
    positions: initialPositions(),
    fieldPos: [ 1 ],
    cursorPos : 1,
    keyNameSufix : 1,
    isConnecting : false,
    isUpdatingScreen : false,
    status : ""
}

const reducer = (state = initialState, action) => {
    console.log("antes");
    console.log("reducer - " + action.type + " - sessionId: " + state.sessionId);
    console.log("reducer - " + action.type + " - positions.length: " + state.positions.length);
    console.log("reducer - " + action.type + " - isConnecting: " + state.isConnecting);
    console.log("reducer - " + action.type + " - isUpdatingScreen: " + state.isUpdatingScreen);
    console.log("reducer - " + action.type + " - keyNameSufix: " + state.keyNameSufix);
    const newState = Object.assign({}, state);

    newState.keyNameSufix = state.keyNameSufix === 1 ? 1920 : 1;

    switch (action.type) {

        case NEW_SESSION:
            newState.sessionId = action.sessionId;
            newState.isConnecting = action.isConnecting;
            break;
        
        case GET_SCREEN:
            newState.positions = action.positions;
            newState.isUpdatingScreen = action.isUpdatingScreen;
            break;

        case SET_IS_CONNECTING:
            newState.isConnecting = action.isConnecting;
            break;

        case SET_IS_UPDATING_SCREEN:
            newState.isUpdatingScreen = action.isUpdatingScreen;
            break;

        case SET_STATUS:
            newState.status = action.status;
            break;

        case TOGGLE_KEY_NAME_SUFIX:
            break;
    
        default:
            break;
    }
    console.log("depois");
    console.log("reducer - " + action.type + " - sessionId: " + newState.sessionId);
    console.log("reducer - " + action.type + " - positions.length: " + newState.positions.length);
    console.log("reducer - " + action.type + " - isConnecting: " + newState.isConnecting);
    console.log("reducer - " + action.type + " - isUpdatingScreen: " + newState.isUpdatingScreen);
    console.log("reducer - " + action.type + " - keyNameSufix: " + newState.keyNameSufix);
    return newState;
}

export default reducer;