import React, {Component} from 'react'
import PotentialOpponents from './SubComponents/PotentialOpponents';
import io from 'socket.io-client'
import axios from 'axios'
import {connect} from 'react-redux'


class Arena extends Component {
  constructor(props) {
    super(props)

    this.state = {
      players: []
    }
    this.joinArena = this.joinArena.bind(this)
  }

  joinArena(info){
    let {username} = this.props
    this.setState((prevState) => ({
      players: [...prevState.players, username]
    }))
  } 

  runSockets = () => {
    let socket = io.connect()
    socket.on('connect', function(){
      console.log('you have joined the arena')
       socket.emit('#')
     })
  }

  displayArena = () => {
    let {username}  =this.props
    let {players} = this.state
    if (players[0]) {
      players.map(player => {
        return (
          <div>
            <div className="challenger_info">
              <p>{username}</p>
            </div>
            <button
              onClick = {this.runSockets}
              className="challenge_btn">Come at me!</button>
          </div>
        )
      })
    } else {
      return (
        <p>There are no current challengers.</p>
      )
    }
  }

  render () {
    let {opponentsList} = this.props
    /** destructuer stull off of info.4 */
    return (
      <div>
        {this.displayArena()}
        {/* <PotentialOpponents
        opponentsList = {opponentsList}
        /> */}
        <button 
          onClick={this.joinArena} 
          className="button">Join the Arena</button>

      </div>
    )
  }
}

function mapStateToProps (state) {
  let {username} = state
  return {username}
}

export default connect(mapStateToProps)(Arena)