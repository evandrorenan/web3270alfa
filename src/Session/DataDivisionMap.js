import React, { Component } from 'react';
import { connect          } from 'react-redux';

import './DataDivisionMap.css';

class DataDivisionMap extends Component {

    constructor(props) {
        super();
        this.state = { 
            fixedDatadivision: []
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
        console.log("Data Division Map" + this.props.dataDivisionMap);
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
                        <div className="DataDivHex" key={"dataDivisionItem_dataContent_"}>
                            Hex content
                        </div>
                        <div className="ToogleHex" key={"toogleHex_line_"}>
                            Hex
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
                                <div className="DataDivHex" key={"dataHexDivisionItem_line_" + index}>
                                    {dataDivisionItem.hexContent[0].substring(0, 
                                            dataDivisionItem.hexContent[0].length > 50 ? 50 : dataDivisionItem.hexContent[0].length) }
                                </div>
                                <div className="ToogleHex" key={"toogleHex_line_" + index}>
                                    <input type="checkbox" id={"fixedCheckboxHex" + index}  />
                                </div>
                    </div>                                            
                    })}

                    {typeof this.props.report.dataDivisionMap === 'undefined' ? "" :
                     this.props.report.dataDivisionMap.map((dataDivisionItem, index) => {
                        return  <div className="DataDiv" key={"dataDiv" + index}>
                                    <input type="checkbox" id={"checkbox" + index} onClick={this.onclicknormal} />
                                    <div className="DataDivLeft" key={"dataDivisionItem_line_" + index}>
                                        {dataDivisionItem.dataName}
                                    </div>
                                    <div className="DataDivRight" key={"dataDivisionItem_line_" + index}>
                                        {dataDivisionItem.ebcdicContent[0].substring(0, 
                                            dataDivisionItem.ebcdicContent[0].length > 50 ? 50 : dataDivisionItem.ebcdicContent[0].length) }
                                    </div>
                                    <div className="DataDivHex" key={"dataHexDivisionItem_line_" + index}>
                                        {dataDivisionItem.hexContent[0].substring(0, 
                                            dataDivisionItem.hexContent[0].length > 50 ? 50 : dataDivisionItem.hexContent[0].length) }
                                    </div>
                                    <div className="ToogleHex" key={"toogleHex_line_" + index}>
                                        <input type="checkbox" id={"checkboxHex" + index}  />
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

const mapStateToProps = (state) => {
    return { report : state.report };
}

export default connect(mapStateToProps)(DataDivisionMap);