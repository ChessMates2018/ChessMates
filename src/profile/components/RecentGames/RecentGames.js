import React, { Component } from 'react'
import axios from 'axios';

class RecentGames extends Component {
  constructor(props) {
    super(props)
    this.state = {
      myGames: []
    }
  }

  componentDidMount() {
    axios.get('/api/myGames').then((res) => {
      console.log(res)
      this.setState({
        myGames: res.data
      })
    })
  }

  render() {
    console.log('myGames', this.state.myGames)
    let games = 0;
    if (this.state.myGames[0]) {
      games = this.state.myGames.map((element, index) => {
        let white = element.user_light
        let black = element.user_dark
        let winner = element.winner
        let loser = element.loser
        let timeCtrl = element.time_ctrl
        let numberOfMoves = element.moves
        let date = element.game_date
        return (
          <div key={index} className="gameRowInfo">
            <div className="col col_1">
              <p>Date: {date}</p>
              <p>Moves: {numberOfMoves}</p>
              <p>Time Control: {timeCtrl}</p>
              <p>White: {white}</p>
              <p>Black: {black}</p>
            </div>

            <div className="col col_2">
              <p>Winner</p>
              <p>{winner}</p>
            </div>

            <div className="col col_2">
              <p>Loser</p>
              <p>{loser}</p>
            </div>


            <div className="col 4">
              <span>View Game</span>
            </div>
          </div>
        )
      })
    } 
    // else {
    //   return null
    // }

    return (
      <div>
        <h2>Recent Games</h2>
        <section className="past_game_list">
          {games}
        </section>
      </div>
    )
  }
}

export default RecentGames 