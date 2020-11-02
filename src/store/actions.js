import axios                from 'axios';
import * as actionTypes from "../store/actionTypes";

// Functions exported on this class have to return an Action object.
// All actions has to have a type.

const STATUS_CONNECTING = "Connecting...";
const STATUS_RETRIEVING_SCREEN = "Retrieving screen data...";
const STATUS_READY = "Ready";
const STATUS_SENDING_INPUT_DATA = "Sending input data...";

export const setStatus = (localStatus) => {
    return { 
        type: actionTypes.SET_STATUS,
        status : localStatus
    }
}

export const createRef = (localIndex, localRef) => {
    return { 
        type: actionTypes.CREATE_REF,
        index: localIndex,
        ref: localRef
    }
}

export const updatePositionText = (localIndex, localText) => {
    return { 
        type: actionTypes.UPDATE_POSITION_TEXT,
        index: localIndex,
        text: localText
    }
}

export const newSessionAsync = () => {
    const body = {
        "host": "192.168.240.1",
        "port": "51004"
    }
    return dispatch => {
        dispatch(setStatus(STATUS_CONNECTING));
        axios.post ("http://localhost:8080/newsession", body, { crossdomain: true })
            .then ( response => { 
                dispatch(newSessionResponseHandler(response));
            });
    };
};

const newSessionResponseHandler = (response) => {
    const x =  dispatch => {
        dispatch(newSessionAction(response.data.sessionId));
        dispatch(setStatus(STATUS_RETRIEVING_SCREEN));
        dispatch(getScreenFieldsAsync(response.data.sessionId));
        return newSessionAction(response.data.sessionId);
    }
    return x;
}

export const newSessionAction = (localSessionId) => {
    return {
        type: actionTypes.NEW_SESSION,
        sessionId: localSessionId,
        isConnecting: false
    };
};

export const getScreenAsync = (sessionId) => {
    if (!sessionId) {
        return dispatch => {
            dispatch(newSessionAsync());
        }
    }
    return dispatch => {
        axios.get ("http://localhost:8080/session/" + sessionId + "/screen", { crossdomain: true })
            .then ( response => { 
                dispatch(setStatus(STATUS_READY));
                dispatch(getScreenResponseHandler(response));
            } )
    };
};

export const getScreenFieldsAsync = (sessionId) => {
    if (!sessionId) {
        return dispatch => {
            dispatch(newSessionAsync());
        }
    }
    return dispatch => {
        axios.get ("http://localhost:8080/session/" + sessionId + "/screenfields", { crossdomain: true })
            .then ( response => { 
                dispatch(setStatus(STATUS_READY));
                dispatch(getScreenResponseHandler(response));
            } )
    };
};

const getScreenResponseHandler = (response) => {
    return getScreenAction(response.data);
}

export const getScreenAction = (responseData) => {
    return {
        type: actionTypes.GET_SCREEN,
        positions: responseData.positions,
        fields: responseData.fields,
        cursorPos: responseData.cursorPos,
        sessionId : responseData.sessionId
    };
};

const buildRequestBody = (row, col, currentFieldText, userFunctionKey, fields, sessionId) => {
    let requestBody = {};
    requestBody.sessionId = sessionId;
    requestBody.sendKeys = [];
    let currentFieldLen = 0;
    for (let i = 0; i < fields.length; i++) {
        if (fields[i].modified ) {
            if (fields[i].row === row && fields[i].col === col ) {
                currentFieldLen = fields[i].length;
            } else {
                requestBody.sendKeys.push({
                    row : fields[i].row,
                    col : fields[i].col,
                    text : ((fields[i].text + Array(fields[i].length).join(' ')).substr(0, fields[i].length)),
                    functionKey : ""
                })
            }
        }
    }
    
    requestBody.sendKeys.push({
        row : row,
        col : col,
        text : ((currentFieldText + Array(currentFieldLen).join(' ')).substr(0, currentFieldLen)),
        functionKey : userFunctionKey }); 
    return requestBody;
}

const buildRequestBodyOld = (row, col, currentFieldText, functionKey, fields, sessionId) => {
    let requestBody = {};
    let localText = "";
    requestBody.sessionId = sessionId;
    requestBody.sendKeys = [];
    for (let i = 0; i < fields.length; i++) {
        if (!fields[i].protected) {
            localText = fields[i].text;
            if (fields[i].row === row 
            &&  fields[i].col === col ) {
                localText = currentFieldText + functionKey;
            } 
            requestBody.sendKeys.push({
                row : fields[i].row,
                col : fields[i].col,
                text : localText }
            )
        }
    }
    return requestBody;
}

export const sendKeys = (row, col, currentFieldText, functionKey, fields, sessionId) => {

    const requestBody = buildRequestBody(row, col, currentFieldText, functionKey, fields, sessionId);
    console.log("requestBody:" + requestBody.sessionId + " " + requestBody.sendKeys[0].text);

    return dispatch => {
        console.log("A");
        dispatch(setStatus(STATUS_SENDING_INPUT_DATA));
        console.log("b");
        axios.post ("http://localhost:8080/session/sendkeys", requestBody, { crossdomain: true })
        .then ( response => { 
                console.log("c");
                dispatch(setStatus(STATUS_READY));
                dispatch(getScreenResponseHandler(response));
            });
    };
};

export const setFieldText = (localIndex, localText) => {
    return { 
        type: actionTypes.SET_FIELD_TEXT,
        index: localIndex,
        text: localText 
    }
}

export const markModifiedField = (localIndex) => {
    return {
        type : actionTypes.MARK_MODIFIED_FIELD,
        index : localIndex
    }
}