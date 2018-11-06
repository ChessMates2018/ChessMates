import React, {Component} from 'react'
import PotentialOpponents from './SubComponents/PotentialOpponents';
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {setLightPlayer, setDarkPlayer, setRoomId} from '../../../ducks/Reducer'
// import io from 'socket.io-client'
import {socket} from '../../../utils/SocketFunctions'
import {withRouter} from 'react-router-dom'




class Arena extends Component {
  constructor(props) {
    super(props)

    this.state = {
      players: [],
      inArenaToggle: false
    }
    this.joinArena = this.joinArena.bind(this)
  }

  componentDidMount(){
    axios.get(`/api/loggedin`).then(res => {
      this.setState({
        players: res.data
      })
    })
    console.log(this.props)
    socket.on('push to board', (challenged, gameId, challenger) => {
      let light = challenged.challenged.challenger
      let dark = challenged.challenged.challenged
      console.log('challenge made', challenged.challenged.challenged, this.props.username, challenged.challenged.gameId)
      if(this.props.username === challenged.challenged.challenged){
        alert('You have been challenged! Would you like to accept?')
        axios.post('/api/newGameHistory', {dark, light})
        this.props.history.push(`/gameboard/${challenged.challenged.gameId}/${dark}/${light}`)
      }else{
        console.log('else town')
      }
    })
  }

  joinArena(info){
    let {username} = this.props
    console.log(username)
    this.setState((prevState) => ({
      players: [...prevState.players, {username}], inArenaToggle: !this.state.inArenaToggle
    }))
    axios.put('/api/joinArena', {username: username}).then()
  } 

  newGame = (challenged) => {
    let challenger = this.props.username
    //MAD LOGIC
    //generate gameid
    axios.get(`/api/gameNumber`)
    //push challenger to board
    .then(res => {
      // console.log('gameId res', res)
      let {gameId} = res.data
      socket.emit(`challenge initiated`, {challenged, gameId, challenger})
      this.props.history.push(`/gameboard/${gameId}/${challenged}/${challenger}`)
    })
    //grab username of challenged off button click and emit to socket along with gameId (this may cause timing issues, will need to see)
    //set up an io.on if username === the username cooming back from socket push to board  
  
  }
    // console.log('PROPS',this.props)
    // let {setLightPlayer, setDarkPlayer, username} = this.props
    // var randoCalrizian = Math.random();
    // console.log(randoCalrizian)
    // if(randoCalrizian >= .6){
    //   setLightPlayer(username)
    // } else {
    //   setDarkPlayer(username)
    // }

    // serverside
    // const socket = io('http://localhost:3438')
    // socket.on('connect', () => {
    //   let roomId = socket.id
    //   console.log(roomId)
    //   this.props.setRoomId(roomId)
    // })
    // console.log(this.roomId)
    // axios.get(`/api/gameNumber`).then(res => {
    //   this.props.history.push(`/gameboard/${res.data.number}`)
    // })
  

  // displayButton = () => {
  //   setTimeout(function() {
  //     return(
  //       <Link to={`/gameboard/${this.props.roomId}`}> <button 
  //         onClick={this.joinArena} 
  //         className="button">Join the Arena</button></Link>
  //     )
  //   }, 500)
  // }

  leaveArena = () => {
    let {players} = this.state
    let {username} = this.props
    let newPlayers = players
    for (let i = 0; i < newPlayers.length; i++){
      if (newPlayers[i] === username){
       newPlayers.splice(i,1)
      }
    }
    let {inArenaToggle} = this.state
    this.setState({
      inArenaToggle: !inArenaToggle, players: newPlayers
    })
  }

  // runSockets = () => {
  //   let socket = io.connect()
  //   socket.on('connect', function(){
  //     console.log('you have joined the arena')
  //      socket.emit('#')
  //    })
  // }

  displayArena = () => {
    console.log(this.state.players[0])
    let {username}  = this.props
    let {players} = this.state
    console.log(players)
    if (players[0]) {
      players.map(player => {
        return (
            <div>
               <p>{player}</p>
              <button
              // onClick = {this.runSockets}
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
    console.log(this.props)
    console.log(this.state.players)
    let {opponentsList} = this.props
    
    /** destructuer stull off of info.4 */
    return (
      <div>
        <h2>Arena</h2>
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
        {/* {this.displayButton()} */}
       <Link to='/Stockfish'><button>Play against Stockfish!</button></Link> 

       <PotentialOpponents 
        opponentsList={this.state.players}
        newGame={this.newGame} 
       />


      </div>
    )
  }
}

function mapStateToProps (state) {
  let {username, light, dark, roomId} = state
  return {username, light, dark, roomId}
}

export default withRouter(connect(mapStateToProps, {setLightPlayer, setDarkPlayer, setRoomId})(Arena))