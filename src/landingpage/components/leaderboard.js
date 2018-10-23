import React, {Component} from 'react'
import axios from 'axios'

class LeaderBoard extends component{
    constructor(){
        super()
            this.state={
                Leaders: ["BradyDaBest", "JordanofTroy", "Michelle", "Scrub4", "Scrub5"]
            }
    }

componentDidMount(){
    //get from users and return usernames in order of 10 highest rated in desc order.
    //setState Leaders with res.data
}

render(){
    return(
        <div>
            <h1>LeaderBoard</h1>
            <h2>Highest Rated Players</h2>
            <div className="Leaderboard">
                <p>1. {this.state.Leaders[0]}</p>
                <p>2. {this.state.Leaders[1]}</p>
                <p>3. {this.state.Leaders[2]}</p>
                <p>4. {this.state.Leaders[3]}</p>
                <p>5. {this.state.Leaders[4]}</p>
            </div>
        </div>
    )
}
}