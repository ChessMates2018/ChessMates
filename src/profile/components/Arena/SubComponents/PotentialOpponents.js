import React from 'react'
import {connect} from 'react-redux'

 function PotentialOpponents (props) {

  let {opponentsList, newGame} = props
  let opponent = opponentsList.map((player, index) => {
    // let {player, rating, wins, losses, image} = player
    if(player.username !== props.currentPlayer){
    return (
      <div key = {index} className="potentialOpponent">
          <p>{player.username}</p>
              <button
              // onClick = {this.runSockets}
              className="challenge_btn" onClick={() => newGame(player.username)}>Come at me!</button>
      </div>
    )}
  })

  return (
    <div id = 'potOppsBlock'>
      {opponent}
    </div>
  )
}

function mapStateToProps(state){
let {username} = state
return{
  username
}
}

export default connect(mapStateToProps) (PotentialOpponents)