import React, {Component} from 'react'
import PotentialOpponents from './SubComponents/PotentialOpponents';
import io from 'socket.io-client'


class Arena extends Component {
  constructor(props) {
    super(props)

    this.state = {
      players: []
    }
    this.joinArena = this.joinArena.bind(this)
  }

  joinArena(info){
    let subplayers = []
    subplayers.push(info)
    if(subplayers.length === 2){
      this.setState({players: subplayers})
      subplayers = []
     let joined = io.on('connection', function(socket){
        socket.join('new game')
      })
      io.to(this.props.history.push(`/gameboard/${joined}`))
    }
  } 

  render () {
    let {opponentsList} = this.props
    return (
      <div>
        <PotentialOpponents
        opponentsList = {opponentsList}
        />
        <button onClick={this.joinArena} className="button">Join the Arena</button>
      </div>
    )
  }
}

export default Arena