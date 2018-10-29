import React, {Component} from 'react'
import axios from 'axios'

class Leaderboard extends Component{
    constructor(){
        super()
            this.state={
                Leaders: []
            }
    }

componentDidMount(){
axios.get('/api/leaderboard').then((res) => {
    // console.log(res.data)
    this.setState({
        Leaders: res.data
    })
})
}

render(){
const leaderBoard =  this.state.Leaders.map((element, index) => {
    let username = element.username
    let rating = element.rating
    let placing = index + 1
    return(
        <div key={index}>
            <p>{`${placing}. ${username} | ${rating}`} </p>
        </div>
    )
})

    return(
        <div>
            <h1>LeaderBoard</h1>
            <h2>Highest Rated Players</h2>
            <div className="Leaderboard">
              {leaderBoard}

            </div>
        </div>
    )
}
}

export default Leaderboard