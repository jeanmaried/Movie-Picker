import React, { Component } from 'react';
import ParamsPicker from './components/ParamsPicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './flex.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <ParamsPicker />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
