import React, {Component} from 'react' 
import axios from 'axios'
import Arena from './components/Arena/Arena'
import UserInfo from './components/UserInfo/UserInfo'
import RecentGames from './components/RecentGames/RecentGames'
import Leaderboard from '../../src/landingpage/components/leaderboard'
import {connect} from 'react-redux'
import {setUsername} from '../ducks/Reducer'
import {login} from '../utils/SocketFunctions'



class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      onlineUsers: [],
      currentUser: []
    }

    // this.getUser = this.getUser.bind(this)
    // this.getAllOnline = this.getAllOnline.bind(this)
  }

  componentDidMount() {
    if (!this.props.username) {
      // console.log('FIRE FIRE FIRE')
      axios.get(`/api/checkuser`).then(res => {
        console.log('dis is du RES', res)
        this.props.setUsername(res.data)
        login(res.data)

        // this.getUser()
      })
      .catch(err => {
        console.log('dis is du err!',err)
        axios.post('/api/logout')
        this.props.history.push('/')
      })
    } else {
      // this.getUser()
    }
  }

  // async getInitialInfo () {
  //   // let user = await this.getUser()
  //   let onlineUsers = await this.getAllOnline()
  // }

  // getUser () {
  //   axios.get(`/api/user`).then(res => {
  //     console.log('user', res.data)
  //     this.setState({
  //       currentUser: res.data
  //     })
  //   })
  // }

  getAllOnline () {
    axios.get(`/api/loggedin`).then(res => {
      console.log('all users online', res.data)
      this.setState({
        onlineUsers: res.data
      })
    })
  }

  render () {
    console.log(this.props.username)
    let {currentUser} = this.state
    return (
      <div className="outerBlock">
        <div className="profile">
        {/* <div className="emptySpace"></div> */}
          <div className="profile_section">
            <UserInfo currentUser = {currentUser[0]}/>
            <Leaderboard/>
          </div>
          <div className="profile_section">
            <Arena/>
          </div>
          {/* <h1>Profile.JS</h1> */}
          {/* <UserInfo/> */}
          {/* <RecentGames/> */}
        {/* <div className="emptySpace"></div> */}
        </div>
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






