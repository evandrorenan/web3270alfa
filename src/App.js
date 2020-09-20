import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Screen from './Session/Screen';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fields: [
        { startRow: 1,
          startColumn: 1,
          text: 'Connecting...',
          length: 1920,
          protected: true,
          hidden: false,
          highLight: false
        }
      ],
      sessionId: ""
    };
  }

  componentDidMount(){
    axios.get("http://localhost:8080/getScreen", { crossdomain: true })
    .then( response => {
      console.log(response);
      this.setState(response.data);
    });
  }

  render() {
    return (
      <div className="App">
        <Screen 
          fieldList={this.state.fields}
          onkeyup={onkeyup}
          onkeydown={onkeydown} />
      </div>
    );
  }
}
  
export default App;