import React, { Component } from 'react';
import axios                from 'axios';
import Position2            from './Position2';
import KeyDown              from "../KeyEvents/KeyDown";
import './Screen.css';

class Screen2 extends Component {
    
    constructor(props) {
        super();

        this.positionRef = [];
        for (let index = 0; index < 1920; index++) {
            this.positionRef.push(React.createRef());
        }

        this.refreshIndicator = 1;
        this.state = {
            "positions": [
                {"positionId":  0, "text": "C", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId":  1, "text": "o", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId":  2, "text": "n", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId":  3, "text": "n", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId":  4, "text": "e", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId":  5, "text": "c", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId":  6, "text": "t", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId":  7, "text": "i", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId":  8, "text": "n", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId":  9, "text": "g", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId": 10, "text": ".", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId": 11, "text": ".", "protected": false, "hidden": false, "highLight": false }
            ,   {"positionId": 12, "text": ".", "protected": false, "hidden": false, "highLight": false }]};
    }

    componentDidMount(){
        axios.get ("http://localhost:8080/getScreenType2", { crossdomain: true })
             .then ( response => {
                 this.refreshScreen(response);
            });
        this.positionRef[3].current.focusPositionRef();
    }

    refreshScreen = (response) => {
        console.log(response.data)
        if (this.state.positions.length < 1000) {
            this.refreshIndicator = -this.refreshIndicator;
            debugger;
            let localState = this.state;
            localState.positions = response.data.positions;
            this.setState(localState); 
        }
    }

    onkeydown = (event) => {
        
        let requestBody = KeyDown(event, this.state);
        if (!requestBody) {
            return false;
        }

        if (requestBody === "" || requestBody === undefined) {
            return true;
        } else {
            axios.post ("http://localhost:8080/userInput", requestBody, { crossdomain: true })
                    .then ( response => {
                        console.log(response.data);
                        this.refreshScreen(response);
                    });
        }
    }

    render() {
        console.log("render");

        let positions = [];
        let rows = []

        console.log("refresh: " + this.refreshIndicator);
        for (let index = 0; index < 1920; index++) {
            let position = (<Position2 key={index}
                            rowNumber={Math.floor(index / 80)} 
                            onkeydown={this.onkeydown}
                            position={this.state.positions[index]}
                            ref={this.positionRef[index]}
                            index={index * this.refreshIndicator} />);
            positions.push(position);

            if (Math.floor(index / 80 ) === index / 80 && index !== 0) {
                rows.push(
                    <p className="Row" key={"row" + index} >
                        {positions.map((position) => {return position})}
                    </p>);
                positions = [];
            }
        }

        return <div className="Screen" key="screen">
                    {rows.map((row) => {return row})}
               </div>;
    }
}

export default Screen2;