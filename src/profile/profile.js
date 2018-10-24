import React, {Component} from 'react' 
import axios from 'axios'
import Arena from './components/Arena/Arena'
import UserInfo from './components/UserInfo/UserInfo'
import RecentGames from './components/RecentGames/RecentGames'
import Leaderboard from '../../src/landingpage/components/leaderboard'

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      onlineUsers: [],
      currentUser: []
    }

    this.getUser = this.getUser.bind(this)
    this.getAllOnline = this.getAllOnline.bind(this)
  }

  componentDidMount() {
    this.getUser()
    this.getAllOnline()
    // setTimeout(() => console.log('state',this.state), 3000)
  }

  getUser () {
    axios.get(`/api/user`, {username:'Rook'}).then(res => {
      console.log('user', res.data)
      this.setState({
        currentUser: res.data
      })
    })
  }

  getAllOnline () {
    axios.get(`/api/loggedin`).then(res => {
      console.log('all users online', res.data)
      this.setState({
        onlineUsers: res.data
      })
    })
  }

  render () {
    return (
      <div>
        <h1>Profile.JS</h1>
        <Arena
        Opponents = {this.state.onlineUsers}
        />
        <UserInfo/>
        <RecentGames/>
        <Leaderboard/>
      </div>
    )
  }
}

export default Profile 






