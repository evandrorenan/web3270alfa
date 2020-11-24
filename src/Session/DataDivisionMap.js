import React from 'react';

import './ProgramReport.css';
import * as report from './ProgramReportObjects';

const DataDivisionMap = (props) => {

    const arrdataDivision = report.programReportObject.dataDivisionMap;
    
    return <div className="SourceDiv">
            <p>Data Division Map</p>
            <div className="DataDiv" key={"dataDiv"}>
                <div className="GridDataContent" key="dataDivItem">Data Item</div>
                <div className="GridDataContent" key="dataDivContent">Content</div>
            </div>
            {arrdataDivision.map((dataDivisionItem, index) => {
                return  <div className="DataDiv" key={"dataDiv" + index}>
                            <div className="GridDataContent" key={"dataDivisionItem_line_" + index}>
                                {dataDivisionItem.dataName}
                            </div>
                            <div className="GridDataContent" key={"dataDivisionItem_line_" + index}>
                                {dataDivisionItem.ebcdicContent}
                            </div>
                </div>                                            
            })}
    </div> 
}

export default DataDivisionMap;