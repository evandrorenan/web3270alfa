import React, { Component } from 'react';
import { connect          } from 'react-redux';

import './ProgramReport.css';

class ProgramReport extends Component {

    constructor(props) {
        super();
    }

    

    render() {

        return (<div className="SourceDiv">
                <p>Program Report</p>
                { typeof this.props.report.programReportObject === 'undefined' ? "" :
                    this.state.report.programReportObject.sourceCode.map((line) => {
                    return <div className="ProgramLine" key={"line" + line.lindeId}>
                            <div className="var"/>
                            <div className="SourceCodeLine" key={"sourceCodeLine" + line.lindeId}>
                                {line.text}
                            </div>
                    </div>
                })}
        </div>);
    }
}

const mapStateToProps = (state) => {
    return { report : state.report };
}

export default connect(mapStateToProps)(ProgramReport);