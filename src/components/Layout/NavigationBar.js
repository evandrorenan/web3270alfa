import React, { Component } from 'react';

import TabItem from './TabItem';

class NavigationBar extends Component {

    constructor() {
        super();
        this.state = { 
            items:[{ id:"SessionItem", name:"Session", isActive: true } ,
                   { id:"Report", name:"Abend Report", isActive: false }]};
    }

    onclick = (event) => {
        const localstate = Object.assign({}, this.state);

        for (let index = 0; index < localstate.items.length; index++) {
            if (localstate.items[index].id === event.target.id) {
                localstate.items[index].isActive = true;
            } else {
                localstate.items[index].isActive = false;
            }
        }
        this.setState(localstate);
    }

    render() {
        return (
            <div className="NavigationBar">
                {this.state.items.map((item) => {
                    return <TabItem id={item.id} name={item.name} isActive={item.isActive} onclick={this.onclick} />
                })}
            </div>
        );
    }
}

export default NavigationBar;