import React from 'react';

import './NavigationBar.css';

const TabItem = (props) => {
    return (
        <button id={props.id} 
                class={"button " + (props.isActive ? " active" : "")}  
                onClick={props.onclick}>{props.name}
        </button>
    )
}

export default TabItem;