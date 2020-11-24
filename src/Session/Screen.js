import React, { Component } from 'react';
import Field                from './Field';
import { connect          } from 'react-redux';
import * as actionCreators  from "../store/actions";

import './Screen.css';
import './Position.css';
import ProgramReport from './ProgramReport';
import DataDivisionMap from './DataDivisionMap';

class Screen extends Component {
    
    componentDidMount() {
        if (!this.props.sessionId) {
            this.props.screenRequest(null);
        }
    }

    shouldComponentUpdate() {
        console.log("screen scu")
        return true;
    }

    connectionStatus () {
        return this.props.status;
    }

    render() {
        let fields = [this.props.fields.length];
        let rows = [24];

        for (let row = 0; row < 24; row++) {
            rows[row] = [];
            for (let index = 0; index < this.props.fields.length; index++) {
                if (this.props.fields[index].row === row + 1) {
                    rows[row].push(this.props.fields[index])
                }
            }
        }

        console.log("Screen focusedField: " + this.props.focusedField);

        return  (
            <div >
                {/* <div className="Title">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;______________&nbsp;_______&nbsp;______&nbsp;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;(_______(_____&nbsp;(_______)&nbsp;__&nbsp;&nbsp;&nbsp;|<br />
&nbsp;_&nbsp;_&nbsp;_&nbsp;&nbsp;____|&nbsp;|&nbsp;_&nbsp;&nbsp;&nbsp;____&nbsp;&nbsp;&nbsp;____)&nbsp;)&nbsp;&nbsp;&nbsp;&nbsp;_|&nbsp;|&nbsp;//|&nbsp;|<br />
|&nbsp;|&nbsp;|&nbsp;|/&nbsp;_&nbsp;&nbsp;)&nbsp;||&nbsp;\&nbsp;(___&nbsp;\&nbsp;/_____/&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;)&nbsp;|//&nbsp;|&nbsp;|<br />
|&nbsp;|&nbsp;|&nbsp;(&nbsp;(/&nbsp;/|&nbsp;|_)&nbsp;)____)&nbsp;)_______&nbsp;&nbsp;&nbsp;/&nbsp;/|&nbsp;&nbsp;/__|&nbsp;|<br />
&nbsp;\____|\____)____(______/(_______)&nbsp;(_/&nbsp;&nbsp;\_____/

                </div> */}
                <div className="Body">
                    <div className="Session">
                        <div className="Screen">
                            <div className="Screen" key="screen">
                                <div className="Rows">
                                    {rows.map((row, index) => {
                                        return <p className="Row" key={"row" + index} id={"row" + index}>
                                                    {rows[index].map((field, fieldIndex) => {
                                                        return <Field key={field.fieldId + "_" + this.props.keyNameSufix }
                                                                    id={"Field" + field.fieldId}
                                                                    field={field} /> }
                                                    )}
                                            </p>}
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="TraillerDiv">
                            <p className="TraillerTitle">Connection details:</p>
                            <p className="Trailler">
                                    {this.connectionStatus()}<br/>
                                    Session id: {this.props.sessionId}
                            </p>
                        </div>
                    </div>
                </div>

                <DataDivisionMap />
                {/* <ProgramReport /> */}

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sessionId: state.sessionId,
        fields: state.fields,
        keyNameSufix: state.keyNameSufix,
        isConnecting : state.isConnecting,
        isUpdatingScreen : state.isUpdatingScreen,
        status : state.status,
        focusedField: state.focusedField
    };
}

const mapDispatchToProps = dispatch => {
    return { 
        newSessionRequest: (sessionId) => dispatch(actionCreators.newSessionAsync()),
        screenRequest: (sessionId) => dispatch(actionCreators.getScreenAsync(sessionId)),
    }
}

// connect returns a function that receives State and Actions and pass it to Screen component via props.
export default connect(mapStateToProps, mapDispatchToProps)(Screen);