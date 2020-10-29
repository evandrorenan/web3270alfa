import React, { Component } from 'react';
import axios                from 'axios';
import { connect          } from 'react-redux';

import Position             from './Position';
import KeyDown              from "../KeyEvents/KeyDown";

import * as actionCreators  from "../store/actions";

import './Screen.css';

class Screen2 extends Component {
    
    constructor(props) {
        super();

        this.positionRef = [];
        for (let index = 0; index < 1920; index++) {
            this.positionRef.push(React.createRef());
        }
        this.refreshSessionScreen = true;

        this.state = {
            "positions": [
                {"positionId":  0, "text": "C", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId":  1, "text": "o", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId":  2, "text": "n", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId":  3, "text": "n", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId":  4, "text": "e", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId":  5, "text": "c", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId":  6, "text": "t", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId":  7, "text": "i", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId":  8, "text": "n", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId":  9, "text": "g", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId": 10, "text": ".", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId": 11, "text": ".", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId": 12, "text": ".", "protected": false, "hidden": false, "highLight": false }],
            keyNameSufix : 1
        };
    }

    componentDidMount() {
        if (!this.props.sessionId) {
            this.props.screenRequest(null);
        }
    }

    refreshScreen = (response) => {
        console.log(response.data)
        if (this.refreshSessionScreen) {
            let localState = this.state;
            localState.positions = response.data.positions;
            localState.keyNameSufix = - localState.keyNameSufix;
            localState.sessionId = response.data.sessionId;
            this.setState(localState); 
            this.refreshSessionScreen = false;
            if (response.data.cursorPos >= 0 && response.data.cursorPos < this.positionRef.length) {
                this.positionRef[response.data.cursorPos].current.focusPositionRef();
            }
        }
    }

    onkeydown = (event) => {
        
        let requestBody = KeyDown(event, this.state, this.positionRef);
        if (!requestBody) {
            return false;
        }
        requestBody.sessionId = this.state.sessionId;

        if (requestBody === "" || requestBody === undefined) {
            return true;
        } else {
            axios.post ("http://localhost:8080/sendKeys", requestBody, { crossdomain: true })
                    .then ( response => {
                        console.log(response.data);
                        this.refreshSessionScreen = true;
                        this.refreshScreen(response);
                    });
        }
    }

    connectionStatus () {
        return this.props.status;
    }

    render() {
        console.log("render - this.props.positions.lenght: " + this.props.positions.lenght);

        let positions = [];
        let rows = [];

        console.log("refresh: " + this.props.keyNameSufix);

        for (let index = 0; index < 1920; index++) {
            let position = (<Position 
                                key={(index) + ("_" + ( index + this.props.keyNameSufix)) }
                                id={"Position" + index}
                                rowNumber={Math.floor(index / 80)} 
                                onkeydown={this.onkeydown}
                                index={index}
                                position={this.props.positions[index]}
                                ref={this.positionRef[index]} />);

            positions.push(position);
        }

        for (let index = 0; index < 24; index++) {
            rows.push( 
                <p className="Row" key={"row" + index} id={"row" + index}>
                    { positions.slice (
                        ( index * 80 ), (index + 1) * 80 )}
                </p>)
        }

        return <div className="Screen" key="screen">
                    <div className="Rows">
                    {rows.map((row) => {return row})}
                    </div>
                    <p className="Trailler">{this.connectionStatus()}</p>
                </div>
    }
}

//TODO: get rid of state on this.state replacing it by this.props
const mapStateToProps = state => {
    console.log("mapStateToProps - state.isConnecting: " + state.isConnecting);
    console.log("mapStateToProps - state.positions.length: " + state.positions.length);

    return {
        sessionId: state.sessionId,
        positions: state.positions,
        keyNameSufix: state.keyNameSufix,
        isConnecting : state.isConnecting,
        isUpdatingScreen : state.isUpdatingScreen,
        status : state.status
    };
}

//TODO: Dispatch onRefreshScreenRequest as this.props.onRefreshScreenRequest 
const mapDispatchToProps = dispatch => {
    return { 
        newSessionRequest: (sessionId) => dispatch(actionCreators.newSessionAsync()),
        screenRequest: (sessionId) => dispatch(actionCreators.getScreenAsync(sessionId)),
        setIsConnecting: (isConnecting) => dispatch(actionCreators.setIsConnecting(isConnecting)),
        setIsUpdatingScreen: (isUpdatingScreen) => dispatch(actionCreators.setIsUpdatingScreen(isUpdatingScreen)),
        toggleKeyNameSufix: () => dispatch(actionCreators.toggleKeyNameSufix())
    }
}

// connect returns a function that receives State and Actions and pass it to Screen component via props.
export default connect(mapStateToProps, mapDispatchToProps)(Screen2);