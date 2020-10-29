import React, { Component } from 'react';
import './App.css';

import Screen from './Session/Screen';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Screen 
          onkeyup={onkeyup}
          onkeydown={onkeydown} />
      </div>
    );
  }
}
  
export default App;