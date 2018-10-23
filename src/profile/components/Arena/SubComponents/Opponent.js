import React from 'react'
import image from '../../../../images/default_profile.png'

export default function Opponent () {
  return (
    <div>
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
      <section>
        <button>CHALLENGE</button>
      </section>
    </div>
  )
}