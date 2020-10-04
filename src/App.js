import React, { Component } from 'react';
import './App.css';

import Screen2 from './Session/Screen2';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Screen2 
          onkeyup={onkeyup}
          onkeydown={onkeydown} />
      </div>
    );
  }
}
  
export default App;