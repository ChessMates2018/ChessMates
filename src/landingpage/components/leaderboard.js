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
}).catch(e => {
    console.error(e)
})
}

render(){
const leaderBoard =  this.state.Leaders.map((element, index) => {
    let username = element.username
    let rating = element.rating
    let placing = index + 1
    return(
        <div className="person" key={index}>
            <p>{`${placing}. ${username} | ${rating}`} </p>
        </div>
    )
})

    return(
        <div  className="lb-wrapper">
            <h1>Leader Board</h1>
            <h2>Highest Rated Players</h2>
            <div className="Leaderboard">
                {/* <div className="blocker block_right"></div> */}
                {leaderBoard}
                {/* <div className="blocker block_left"></div> */}
            </div>
        </div>
    )
}
}

export default Leaderboard
