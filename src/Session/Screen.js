import React, { Component } from 'react';
import axios                from 'axios';
import Row                  from './Row';
import keyDown              from "../KeyEvents/KeyDown";
import './Screen.css';

class Screen extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            fields: [
                {   startRow: 1,
                    startColumn: 1,
                    text: 'Connecting...',
                    length: 1920,
                    protected: true,
                    hidden: false,
                    highLight: false
                }
            ],
            rows : [],
            sessionId: ""
        };

        for (let i = 0; i < 24; i++) {
            this.state.rows[i] = " ".repeat(80);
        }
    }

    componentDidMount(){
        axios.get ("http://localhost:8080/getScreen", { crossdomain: true })
             .then ( response => {
                 this.refreshScreen(response);
            });
    }

    refreshScreen = (response) => {
        console.log(response);
        let localState = {};
        localState.fields    = response.data.fields;
        localState.sessionId = response.data.sessionId;
        localState.rows      = mountRows(response.data.fields);
        this.setState(localState);
    }

    onkeydown = (event) => {
        console.log(event.target.attributes.screenstate);
        let requestBody = keyDown(event, this.state);
        if (requestBody === false) {
            return false;
        } else {
            if (requestBody === "" || requestBody === undefined) {
                return true;
            } else {
                axios.post ("http://localhost:8080/userInput", requestBody, { crossdomain: true })
                     .then ( response => {
                         this.refreshScreen(response);
                     });
            }
        }
    }
    
    render() {
        return (
            <div className="Screen" key="screen">
                {this.state.rows.map((row, index) => {
                    return <Row 
                        fieldList={this.state.fields}
                        key={index}
                        buffer={row} 
                        onkeyup={this.onkeydown}
                        onkeydown={onkeyup}
                        rowNumber={index} />
                })}
            </div>
        )
    }
}

const mountRows = (fieldList) => {

    let rows = [];

    // clean screen 
    for (let i = 0; i < 24; i++) {
        rows[i] = " ".repeat(80);
    }

    // set text from fields. Deal with fields with more columns than available in current row
    for (let i = 0; i < fieldList.length; i++) {
        let brkRows = breakFieldText(fieldList[i].startRow,
                                     fieldList[i].startColumn,
                                     fieldList[i].text);
        for (let j = 0; j < brkRows.length; j++) {
            rows[brkRows[j].startRow] = 
                rows[brkRows[j].startRow].substring(0, brkRows[j].startCol) + 
                brkRows[j].fieldText +
                rows[brkRows[j].startRow].substring(brkRows[j].startCol + brkRows[j].fieldText.length);
        }
    }
    return rows;
}

const onkeyup = (event) => {
    return;
}

const breakFieldText = ( startRow, startCol, fieldText) => {

    startRow--;
    startCol--;

    let fieldRows = [];
    let maxCols = fieldText.length <= 80 - startCol ? 80 : 80 - startCol;

    for (let j = 0; fieldText.length > 0; j++) {
        let stringLength = fieldText.length > maxCols ? maxCols : fieldText.length;

        let row = {};
        row.startRow = startRow + j;
        row.startCol = j === 0 ? startCol : 0;
        row.fieldText = fieldText.substring(0, stringLength);

        fieldRows.push(row);
        
        fieldText = fieldText.substring(stringLength); 
        maxCols = 80;          
    }

    return fieldRows;
}

export default Screen;