import * as actionTypes from "../store/actionTypes";

const initialPositions = () => {
    let positions = [];
    for (let i = 0; i < 1920; i++) {
        positions.push({
            positionId : i,
            text: " ",
            protected : false,
            hidden : false,
            highLight : false,
            modified : false,
            ref : null }
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
    const newState = Object.assign({}, state);

    switch (action.type) {

        case actionTypes.NEW_SESSION:
            newState.sessionId = action.sessionId;
            newState.isConnecting = action.isConnecting;
            break;
        
        case actionTypes.GET_SCREEN:
            newState.keyNameSufix = state.keyNameSufix === 1 ? 1920 : 1;
            newState.positions = action.positions;
            break;

        case actionTypes.SET_STATUS:
            newState.status = action.status;
            break;

        case actionTypes.CREATE_REF:            
            newState.positions[action.index].ref = action.ref;
            break;

        case actionTypes.UPDATE_POSITION_TEXT:
            newState.positions[action.index].modified = true; 
            newState.positions[action.index].text = action.text; 
            break;

        default:
            break;
    }
    return newState;
}

export default reducer;