import React, { Component } from 'react';
import './App.css';
import LandingPage from './landingpage/landingpage'
import Nav from './routing/nav'
import Routes from './routing/routes'
import {HashRouter} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Nav />
          <Routes />
        </div>
      </HashRouter>
    );
  }
}

export default App;
