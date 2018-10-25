import React, {Component} from 'react' 
import axios from 'axios'
import Arena from './components/Arena/Arena'
import UserInfo from './components/UserInfo/UserInfo'
import RecentGames from './components/RecentGames/RecentGames'
import Leaderboard from '../../src/landingpage/components/leaderboard'
import {connect} from 'react-redux'
import {setUsername} from '../ducks/Reducer'

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

  async componentDidMount() {
    if (!this.props.username) {
      axios.get(`/api/checkuser`).then(res => {
        this.props.setUsername()
        let user = await this.getUser()
        let onlineUsers = await this.getAllOnline()
      })
      .catch(err => {
        this.props.history.push('/')
      })
    } else {
      let user = await this.getUser()
      let onlineUsers = await this.getAllOnline()
    }
  }

  getUser () {
    axios.get(`/api/user`).then(res => {
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
        opponentsList = {this.state.onlineUsers}
        />
        <UserInfo/>
        <RecentGames/>
        <Leaderboard/>
      </div>
    )
  }
}

function setStateToProps (state) {
  let {username} = state
  return(
    username
  )
}

export default connect(setStateToProps, {setUsername})(Profile)






