import React, {Component} from 'react'
import PotentialOpponents from './SubComponents/PotentialOpponents';
import io from 'socket.io-client'
import axios from 'axios'
import {connect} from 'react-redux'
import {setLightPlayer, setDarkPlayer} from '../../../ducks/Reducer'



class Arena extends Component {
  constructor(props) {
    super(props)

    this.state = {
      players: [],
      inArenaToggle: true
    }
    this.joinArena = this.joinArena.bind(this)
  }

  joinArena(info){

    let {username} = this.props
    console.log(username)
    this.setState((prevState) => ({
      players: [...prevState.players, username], inArenaToggle: !this.state.inArenaToggle
    }), this.newGame)
  } 

  newGame = () => {
    let {setLightPlayer, setDarkPlayer, username} = this.props
    var randoCalrizian = Math.random();
    if(randoCalrizian >= .6){
      setLightPlayer(username)
    }
    const socket = io('http://localhost:3438')
    socket.on('connect', () => {
      let roomId = socket.id
      console.log(roomId)
    })
    console.log(this.roomId)
    // this.props.history.push(`/gameboard/${this.roomId}`)

    // axios.get(`/api/gameNumber`).then(res => {
    //   this.props.history.push(`/gameboard/${res.data.number}`)
    // })
  }

  leaveArena = () => {
    let {inArenaToggle} = this.state
    this.setState({
      inArenaToggle: !inArenaToggle
    })
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


    console.log(this.state.players)
    let {opponentsList} = this.props
    /** destructuer stull off of info.4 */
    return (
      <div>
        {this.displayArena()}
        {/* <PotentialOpponents
        opponentsList = {opponentsList}
        /> */}
        {
          this.state.inArenaToggle
          ?
          <button 
          onClick={this.joinArena} 
          className="button">Join the Arena</button>
          :
          <button
            onClick = {this.leaveArena} 
            className="button">Fly you fools!</button>
         
        }
        
        

      </div>
    )
  }
}

function mapStateToProps (state) {
  let {username, light, dark} = state
  return {username, light, dark}
}

export default connect(mapStateToProps, {setLightPlayer, setDarkPlayer})(Arena)