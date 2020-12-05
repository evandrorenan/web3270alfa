import React  from 'react';

import './Content.css';
import Screen from '../../Session/Screen';
import ProgramReport from '../../Session/ProgramReport';
import DataDivisionMap from '../../Session/DataDivisionMap';

const Content = (props) => {
    return (
        <div className="Content">
            <span class={props.activeWindow === "Session" ? "NotHiddenDiv" : "HiddenDiv"}>
                <Screen onkeyup={onkeyup} onkeydown={onkeydown}  />
            </span>
            <span class={props.activeWindow === "Report" ? "NotHiddenDiv" : "HiddenDiv"}>
                <div class="report">
                    <ProgramReport />
                    <DataDivisionMap />
                </div> 
            </span>
        </div>)
}

export default Content;