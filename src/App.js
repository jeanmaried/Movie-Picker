import React, { Component } from 'react';
import Layout from './components/Layout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './redux/store';
import { Provider } from 'react-redux';
import './flex.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <Layout />
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
