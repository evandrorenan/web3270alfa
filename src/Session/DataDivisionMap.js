import React, { Component } from 'react';

import './DataDivisionMap.css';
import * as report from './ProgramReportObjects';

class DataDivisionMap extends Component {

    constructor(props) {
        super();
        this.state = { 
            arrDataDivision: report.programReportObject.dataDivisionMap,
            fixedDatadivision: report.fixedDatadivision
        }
        
    }

    onclickfixed = (event) => {
        if (! event.target.checked ) {
            const index = event.target.id.replace("fixedCheckBox", "") * 1;
            let localState = Object.assign({}, this.state);
            localState.fixedDatadivision.splice(index, 1);
            this.setState(localState);
        }
    }
    
    onclicknormal = (event) => {
        if (event.target.checked ) {
            const index = event.target.id.replace("checkbox", "") * 1;
            let localState = Object.assign({}, this.state);
            localState.fixedDatadivision.push(localState.arrDataDivision[index]);
            this.setState(localState);
            event.target.checked = false;
        }
    }
    
    render() {

        return (
            <div className="DataDivision">
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

                    {this.state.fixedDatadivision.map((dataDivisionItem, index) => {
                    return  <div className="DataDiv" key={"dataDiv" + index}>
                                <input type="checkbox" id={"fixedCheckBox" + index} checked="true" onClick={this.onclickfixed} />
                                <div className="DataDivLeft Fixed" key={"dataDivisionItem_line_" + index}>
                                    {dataDivisionItem.dataName}
                                </div>
                                <div className="DataDivRight" key={"dataDivisionItem_line_" + index}>
                                    {dataDivisionItem.ebcdicContent[0].substring(0, 
                                        dataDivisionItem.ebcdicContent[0].length > 50 ? 50 : dataDivisionItem.ebcdicContent[0].length) }
                                </div>
                    </div>                                            
                    })}

                    {this.state.arrDataDivision.map((dataDivisionItem, index) => {
                        return  <div className="DataDiv" key={"dataDiv" + index}>
                                    <input type="checkbox" id={"checkbox" + index} onClick={this.onclicknormal} />
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
    );}
}

export default DataDivisionMap;