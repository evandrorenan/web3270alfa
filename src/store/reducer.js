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

const initialFields = () => {
    let fields = [];
    for (let i = 0; i < 24; i++) {
        fields.push({
            fieldId : i,
            start : (i * 80) + 1,
            end: (i * 80) + 80,
            row: i + 1,
            col: i * 80 + 1,
            length : 80,
            text : " ",
            hidden : false,
            highLight : false,
            modified : false,
            ref : null 
        });
    }
    return fields;
}

const initialState = {  
    sessionId : null,
    screenId : null,
    fields: initialFields(),
    positions: [],
    fieldPos: [ 1 ],
    cursorPos : 1,
    focusedField : null,
    keyNameSufix : 1,
    isConnecting : false,
    isUpdatingScreen : false,
    status : ""
}

const reducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case actionTypes.NEW_SESSION:
            state.sessionId = action.sessionId;
            state.isConnecting = action.isConnecting;
            return state;
        
        case actionTypes.GET_SCREEN:
            newState = Object.assign({}, state);
            newState.keyNameSufix = state.keyNameSufix === 1 ? 1920 : 1;
            newState.positions = action.positions;
            newState.fields = action.fields;
            newState.cursorPos = action.cursorPos;
            newState.sessionId = action.sessionId;
            return newState;

        case actionTypes.GET_SCREEN_FIELDS:
            newState = Object.assign({}, state);
            newState.keyNameSufix = state.keyNameSufix === 1 ? 1920 : 1;
            newState.fields = action.fields;
            return newState;
    
        case actionTypes.SET_STATUS:
            state.status = action.status;
            return state;

        case actionTypes.CREATE_REF:            
            state.fields[action.index].ref = action.ref;
            return state;

        case actionTypes.UPDATE_POSITION_TEXT:
            state.fields[action.index].modified = true; 
            state.fields[action.index].text = action.text; 
            break;

        case actionTypes.SET_FIELD_TEXT:
            state.fields[action.index].text = action.text;
            return state;

        case actionTypes.MARK_MODIFIED_FIELD:
            state.fields[action.index].modified = true;
            return state;

        case actionTypes.SET_FOCUSED_FIELD:
            console.log("Set focused field-index: " + action.index);
            console.log("Set focused field-row: " + action.focusedField.row);
            state.fields[action.index].focusedField = action.focusedField;
            return state;    
                
        default:
            break;
    }
    return state;
}

export default reducer;