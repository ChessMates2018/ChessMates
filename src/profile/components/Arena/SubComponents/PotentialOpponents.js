import React from 'react'

export default function PotentialOpponents (props) {

  let {opponentsList, newGame} = props
  let opponent = opponentsList.map((player, index) => {
    console.log(player)
    // let {player, rating, wins, losses, image} = player
    return (
      <div key = {index} className="potentialOpponent">
          <p>{player.username}</p>
              <button
              // onClick = {this.runSockets}
              className="challenge_btn" onClick={() => newGame()}>Come at me!</button>
      </div>
    )
  })

  return (
    <div>
      <h1>PotentialOpponents.js</h1>
      {opponent}
    </div>
  )
}