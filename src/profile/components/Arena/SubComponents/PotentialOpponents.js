import React from 'react'

export default function PotentialOpponents (props) {

  let {opponentsList} = props

  let opponent = opponentsList.map((player, index) => {
    let {username, rating, wins, losses, image} = player
    return (
      <div key = {index} className="potentialOpponent">
        <section>
        <img src={image} alt="default profile image"/>
      </section>
      <section>
        <div>
          <h3>Username</h3>
        </div>
        <div>
          <h4>Win:Lose ratio</h4>
          <h4>Rating</h4>
        </div>
      </section>
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