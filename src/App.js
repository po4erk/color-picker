import React, { Component } from 'react';
import './App.css';
import ColorPicker from './components/ColorPicker'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Color Picker</h1>
        </header>
        <ColorPicker />
      </div>
    );
  }
}

export default App;
