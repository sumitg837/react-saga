import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';

 


import Routes from './routes';
import {history} from './_helper/history';

import logo from './logo.svg';
import './App.css';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Routes />
        </Router>
      </div>
    );
  }
}

export default App;
