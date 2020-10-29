import axios                from 'axios';

export const NEW_SESSION = 'NEW_SESSION';
export const GET_SCREEN = 'GET_SCREEN';
export const SET_IS_CONNECTING = "SET_IS_CONNECTING";
export const SET_IS_UPDATING_SCREEN = "SET_IS_UPDATING_SCREEN";
export const TOGGLE_KEY_NAME_SUFIX = "TOGGLE_KEY_NAME_SUFIX";
export const SET_STATUS = "SET_STATUS";

// Functions exported on this class have to return an Action object.
// All actions has to have a type.

const STATUS_CONNECTING = "Connecting...";
const STATUS_RETRIEVING_SCREEN = "Retrieving screen data...";
const STATUS_READY = "Ready";

export const setStatus = (localStatus) => {
    return { 
        type: SET_STATUS,
        status : localStatus
    }
}

export const setIsConnecting = (localIsConnecting) => {
    console.log("setIsConnecting: " + localIsConnecting);
    return {
        type: SET_IS_CONNECTING,
        isConnecting : localIsConnecting
    }
}

export const setIsUpdatingScreen = (localIsUpdatingScreen) => {
    console.log("setIsUpdatingScreen: " + localIsUpdatingScreen);
    return {
        type: SET_IS_UPDATING_SCREEN,
        isUpdatingScreen : localIsUpdatingScreen
    }
}

export const toggleKeyNameSufix = () => {
    console.log("toggleKeyNameSufix");
    return {
        type: TOGGLE_KEY_NAME_SUFIX
    }
}

export const newSessionAsync = () => {
    console.log("newSessionAsync");

    const body = {
        "host": "192.168.240.1",
        "port": "51004"
    }
    return dispatch => {
        dispatch(setIsConnecting(true));
        dispatch(setStatus(STATUS_CONNECTING));
        console.log("newSessionRequest");
        axios.post ("http://localhost:8080/newSession", body, { crossdomain: true })
            .then ( response => { 
                console.log("newSessionResponse");
                dispatch(newSessionResponseHandler(response));
            });
    };
};

const newSessionResponseHandler = (response) => {
    console.log("newSessionReturnHandler - response: " + response);
    const x =  dispatch => {
        dispatch(setIsConnecting(false));
        dispatch(setStatus(STATUS_RETRIEVING_SCREEN));
        dispatch(setIsUpdatingScreen(true));
        dispatch(getScreenAsync(response.data.sessionId));
        return newSessionAction(response.data.sessionId);
    }
    return x;
}

export const newSessionAction = (localSessionId) => {
    console.log("newSessionAction - localSessionId: " + localSessionId);
    return {
        type: NEW_SESSION,
        sessionId: localSessionId,
        isConnecting: false
    };
};

export const getScreenAsync = (sessionId) => {
    console.log("getScreenAsync: " + sessionId);
    if (!sessionId) {
        return dispatch => {
            dispatch(newSessionAsync());
        }
    }
    return dispatch => {
        console.log ("getScreenAsync - localhost:8080/session/" + sessionId + "/Screen");
        axios.get ("http://localhost:8080/session/" + sessionId + "/Screen", { crossdomain: true })
        .then ( response => { 
            console.log("getScreenResponse");
            dispatch(setIsUpdatingScreen(false));
            dispatch(setStatus(STATUS_READY));
            dispatch(getScreenResponseHandler(response));
            } )
    };
};

const getScreenResponseHandler = (response) => {
    console.log("getScreenResponseHandler - response: " + response);
    return getScreenAction(response.data);
}

export const getScreenAction = (responseData) => {
    console.log("getScreenAction: " + responseData);
    return {
        type: GET_SCREEN,
        positions: responseData.positions,
        isUpdatingScreen: false
    };
};