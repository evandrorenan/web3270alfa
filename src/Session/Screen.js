
import React, { Component } from 'react';
import Position             from './Position';
import { connect          } from 'react-redux';
import * as actionCreators  from "../store/actions";

import './Screen.css';

class Screen2 extends Component {
    
    componentDidMount() {
        if (!this.props.sessionId) {
            this.props.screenRequest(null);
        }
    }

    connectionStatus () {
        return this.props.status;
    }

    render() {
        let positions = [];
        let rows = [];

        for (let index = 0; index < 1920; index++) {
            let position = (<Position 
                                key={(index) + ("_" + ( index + this.props.keyNameSufix)) }
                                id={"Position" + index}
                                index={index} />);

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

const mapStateToProps = state => {
    return {
        sessionId: state.sessionId,
        positions: state.positions,
        keyNameSufix: state.keyNameSufix,
        isConnecting : state.isConnecting,
        isUpdatingScreen : state.isUpdatingScreen,
        status : state.status
    };
}

const mapDispatchToProps = dispatch => {
    return { 
        newSessionRequest: (sessionId) => dispatch(actionCreators.newSessionAsync()),
        screenRequest: (sessionId) => dispatch(actionCreators.getScreenAsync(sessionId)),
    }
}

// connect returns a function that receives State and Actions and pass it to Screen component via props.
export default connect(mapStateToProps, mapDispatchToProps)(Screen2);