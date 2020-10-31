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
        fields: responseData.fields
    };
};

export const sendKeys = (requestBody) => {

    return dispatch => {
        dispatch(setStatus(STATUS_SENDING_INPUT_DATA));
        axios.post ("http://localhost:8080/session/sendkeys", requestBody, { crossdomain: true })
        .then ( response => { 
                dispatch(setStatus(STATUS_READY));
                dispatch(getScreenResponseHandler(response));
            });
    };
};

export const setFieldText = (index, text) => {
    return { 
        type: actionTypes.SET_FIELD_TEXT,
        index: index,
        text: text 
    }
}