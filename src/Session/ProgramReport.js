import React from 'react';

import './ProgramReport.css';
import * as report from './ProgramReportObjects';

const ProgramReport = (props) => {

    const arrProgramReport = report.programReportObject.sourceCode;

    return <div className="SourceDiv">
            <p>Program Report</p>
            {arrProgramReport.map((line) => {
                return <div className="ProgramLine" key={"line" + line.lindeId}>
                        <div className="var"/>
                        <div className="SourceCodeLine" key={"sourceCodeLine" + line.lindeId}>
                            {line.text}
                        </div>
                </div>
            })}
    </div> 
}

export default ProgramReport;