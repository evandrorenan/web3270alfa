import React, { Component } from 'react';
import axios                from 'axios';
import Row2                 from './Row2';
import keyDown              from "../KeyEvents/KeyDown";
import SessionContext       from "../context/sessionContext";
import './Screen.css';

class Screen2 extends Component {
    
    constructor(props) {
        super();
        
        this.screenPositions = {
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
    }

    refreshScreen = (response) => {
        // console.log(response.data);
        this.positions = response.data;
    }

    onkeydown = (event) => {
        
        let requestBody = keyDown(event, this.screenPositions);
        if (requestBody === false) {
            return false;
        } else {
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
    }
    
    render() {
        return (
            <div className="Screen" key="screen">
                <SessionContext.Provider value={{ 
                    onkeydown : this.onkeydown,
                    positions : this.screenPositions}}>
                    {Array(24).fill().map((row, index) => {
                        return <Row2 
                            key={index}
                            onkeydown={this.onkeydown}
                            rowNumber={index} />
                    })}
                </SessionContext.Provider>
            </div>
        )
    }
}

export default Screen2;