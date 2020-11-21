import React from 'react';

import { programReport } from './ProgramReportObjects';
import { dataDivisionMap } from './ProgramReportObjects';

import './ProgramReport.css';

const ProgramReport = (props) => {

    return <div className="SourceDiv">
            <p>Program Report</p>
            {programReport.lines.map((line) => {
                return <div className="ProgramLine" key={"line" + line.lindeId}>
                        <div className="SourceCodeLine" key={"sourceCodeLine" + line.lindeId}>
                            {line.sourceCodeLine}
                        </div>
                        <div className="DataContents" key={"dataContents" + line.lindeId}>
                            {line.dataContents.map((dataContent, index) => {
                                return <div className="DataContent" key={"dataContent" + line.lindeId + "_" + index}>
                                        <div className="DataName">{dataContent.dataName}</div>
                                        <div className="DataEbcdicContent">{dataContent.dataEbcdicContent}</div>
                                        <div className="DataHexContent">{dataContent.dataHexContent}</div>
                                </div>                                            
                            })}
                        </div>
                </div>
            })}
    </div> 
}

export default ProgramReport;