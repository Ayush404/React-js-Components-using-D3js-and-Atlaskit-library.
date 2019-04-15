import React, { Component } from 'react';

import './App.css';

import Donutchart from './components/Donutchart';

import a from './components/a';
import '@atlaskit/css-reset';


class App extends Component {
  render() {
    return (
      <div className="App">
      
        <Donutchart/>
        <div >
        {a}
        </div>
        
        
        
      </div>
    );
  }
}

export default App;
