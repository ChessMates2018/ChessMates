import React, { Component } from 'react';
import LandingPage from './landingpage/landingpage'
import Nav from './routing/nav'
import Routes from './routing/routes'
import {HashRouter} from 'react-router-dom'
import {ModalProvider} from 'styled-react-modal'

import io from 'socket.io-client'

class App extends Component {



  render() {
    return (
      <HashRouter>
        <ModalProvider>
          <div className="App">
            <Nav />
            <Routes />
          </div>
        </ModalProvider>
      </HashRouter>
    );
  }
}

export default App;
