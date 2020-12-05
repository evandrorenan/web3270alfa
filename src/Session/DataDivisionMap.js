import React from 'react';

import './DataDivisionMap.css';
import * as report from './ProgramReportObjects';

const DataDivisionMap = (props) => {

    const arrdataDivision = report.programReportObject.dataDivisionMap;

    const fixedDatadivision = report.fixedDatadivision;
    
    return <div className="DataDivision">
            <div class="DataItemsList">
                <div className="DataDiv" key={"dataDivTitle"}>
                    <input type="checkbox" class="checkboxTitle" id={"checkboxTitle"}/>
                    <div className="DataDivLeft" key={"dataDivisionItem_dataItem_"}>
                        Data Item
                    </div>
                    <div className="DataDivRight" key={"dataDivisionItem_dataContent_"}>
                        Content
                    </div>
                </div>

                {fixedDatadivision.map((dataDivisionItem, index) => {
                return  <div className="DataDiv" key={"dataDiv" + index}>
                            <input type="checkbox" id={"checkbox" + index}/>
                            <div className="DataDivLeft Fixed" key={"dataDivisionItem_line_" + index}>
                                {dataDivisionItem.dataName}
                            </div>
                            <div className="DataDivRight" key={"dataDivisionItem_line_" + index}>
                                {dataDivisionItem.ebcdicContent[0].substring(0, 
                                    dataDivisionItem.ebcdicContent[0].length > 50 ? 50 : dataDivisionItem.ebcdicContent[0].length) }
                            </div>
                </div>                                            
                })}

                {arrdataDivision.map((dataDivisionItem, index) => {
                    return  <div className="DataDiv" key={"dataDiv" + index}>
                                <input type="checkbox" id={"checkbox" + index}/>
                                <div className="DataDivLeft" key={"dataDivisionItem_line_" + index}>
                                    {dataDivisionItem.dataName}
                                </div>
                                <div className="DataDivRight" key={"dataDivisionItem_line_" + index}>
                                    {dataDivisionItem.ebcdicContent[0].substring(0, 
                                        dataDivisionItem.ebcdicContent[0].length > 50 ? 50 : dataDivisionItem.ebcdicContent[0].length) }
                                </div>
                    </div>                                            
                })}
            </div>
            <div class="DataItemDetail">
                <div class="ContentDetail">
                    <textarea id="contentDetail" class="Textarea"></textarea>
                </div>
            </div>
    </div> 
}

export default DataDivisionMap;