import React, { Component } from 'react';
import Nav from './routing/nav'
import Routes from './routing/routes'
import {HashRouter} from 'react-router-dom'
import {ModalProvider} from 'styled-react-modal'

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
