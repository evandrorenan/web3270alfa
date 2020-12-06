import React, { Component } from 'react';

import './RequestReportForm.css';
import Input from './input';

import { connect          } from 'react-redux';
import * as actionCreators  from "../../../../store/actions";

class RequestReportForm extends Component {
    constructor() {
        super();
        this.state = { form: [
            {id: 0, label: "Compilation report id on evt04", value="", maxLength: "9" },
            {id: 1, label: "User",              value="", maxLength: "9" },
            {id: 2, label: "Password",          value="", maxLength: "9" },
            {id: 3, label: "Program Name",      value="", maxLength: "8" },
            {id: 4, label: "Fault Analyzer id", value="", maxLength: "8" },
            {id: 5, label: "Abend File",        value="", maxLength: "40" }
        ]};
    }
    
    onclick() {
        this.props.requestAbendReport({
            "compilationJobid": this.state.form[0].value,
            "user": this.state.form[1].value,
            "password": this.state.form[2].value,
            "programName": this.state.form[3].value,
            "abendId": this.state.form[4].value,
            "abendFile": this.state.form[5].value
        })
    }
    
    onchange(event, id) {        
        let localState = Object.assign({}, this.state)
        localState.form[id].value = event.target.value;
        this.setState(localState);
        return true;
    }

    render() {
        return (
        <div className="RequestReportForm">
            { this.state.form.map((item) => {
                return <Input type="text" label={item.label} maxLength={item.maxLength} onChange={(event) => this.onchange(event, item.id)} />
            })}
            <input type="button" value="Request Report" onClick={this.onclick} />
        </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return { 
        requestAbendReport: (request) => dispatch(actionCreators.requestAbendReport(request))
    }
}

export default connect(null, mapDispatchToProps)(Screen);