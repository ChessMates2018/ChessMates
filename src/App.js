import React, { Component } from 'react';
import './App.css';
import LandingPage from './landingpage/landingpage'
import Profile from './profile/profile'

class App extends Component {
  render() {
    return (
      <div className="App">
        <LandingPage />
        <Profile/>
      </div>
    );
  }
}

export default App;
