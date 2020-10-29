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
        axios.post ("http://localhost:8080/newSession", body, { crossdomain: true })
            .then ( response => { 
                dispatch(newSessionResponseHandler(response));
            });
    };
};

const newSessionResponseHandler = (response) => {
    const x =  dispatch => {
        dispatch(newSessionAction(response.data.sessionId));
        dispatch(setStatus(STATUS_RETRIEVING_SCREEN));
        dispatch(getScreenAsync(response.data.sessionId));
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
        axios.get ("http://localhost:8080/session/" + sessionId + "/Screen", { crossdomain: true })
            .then ( response => { 
                dispatch(setStatus(STATUS_READY));
                dispatch(getScreenResponseHandler(response));
            } )
    };
};

const getScreenResponseHandler = (response) => {
    console.log("K");
    return getScreenAction(response.data);
}

export const getScreenAction = (responseData) => {
    return {
        type: actionTypes.GET_SCREEN,
        positions: responseData.positions
    };
};

export const sendKeys = (requestBody) => {
    console.log("F");

    return dispatch => {
        console.log("G");
        dispatch(setStatus(STATUS_SENDING_INPUT_DATA));
        console.log("H");
        axios.post ("http://localhost:8080/session/sendkeys", requestBody, { crossdomain: true })
        .then ( response => { 
                console.log("I");
                dispatch(setStatus(STATUS_READY));
                console.log("J");
                dispatch(getScreenResponseHandler(response));
            });
    };
};