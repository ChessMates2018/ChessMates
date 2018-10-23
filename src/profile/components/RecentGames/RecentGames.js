import React, {Component} from 'react' 

class RecentGames extends Component {
  constructor(props) {
    super(props)

    this.state = {
      
    }
  }

  render () {
    return (
      <div>
        <h2>Recent Games</h2>
        <section class="past_game_list">
          <div className="game_data">
            <p className="data">Date</p>
            <p className="data">Number of moves</p>
            <p className="data">Length of game</p>
          </div>
          <div className="outcome winner">
            <h4 className="win_lose">Winner</h4>
            <h6>username</h6>
          </div>
          <div className="outcome loser">
            <h5 className="win_lose">Loser</h5>
            <h5>username</h5>
          </div>
        </section>
      </div>
    )
  }
}

export default RecentGames 