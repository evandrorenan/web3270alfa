import React from 'react';

import { programReport } from './ProgramReportObjects';
import { dataDivisionMap } from './ProgramReportObjects';

import './ProgramReport.css';

const ProgramReport = (props) => {

    return <div className="SourceDiv">
            <p>Data Division Map</p>
            <div className="DataDiv" key={"dataDiv"}>
                <div className="GridDataContent" key="dataDivItem">Data Item</div>
                <div className="GridDataContent" key="dataDivContent">Content</div>
            </div>
            {dataDivisionMap.map((dataDivisionItem, index) => {
                return  <div className="DataDiv" key={"dataDiv" + index}>
                            <div className="GridDataContent" key={"dataDivisionItem_line_" + index}>
                                {dataDivisionItem.dataName}
                            </div>
                            <div className="GridDataContent" key={"dataDivisionItem_line_" + index}>
                                {dataDivisionItem.assemblerDataDefinition}
                            </div>
                </div>                                            
            })}
    </div> 
}

export default ProgramReport;