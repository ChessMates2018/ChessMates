import React, {Component} from 'react' 
import Arena from './components/Arena/Arena'
import UserInfo from './components/UserInfo/UserInfo'
import RecentGames from './components/RecentGames/RecentGames'

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render () {
    return (
      <div>
        <h1>Profile.JS</h1>
        <Arena/>
        <UserInfo/>
        <RecentGames/>
        {/* leaaderboard */}
      </div>
    )
  }
}

export default Profile 






