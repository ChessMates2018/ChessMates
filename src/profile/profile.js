import React, {Component} from 'react' 
import axios from 'axios'
import Arena from './components/Arena/Arena'
import UserInfo from './components/UserInfo/UserInfo'
import RecentGames from './components/RecentGames/RecentGames'
import Leaderboard from '../../src/landingpage/components/leaderboard'
import {connect} from 'react-redux'
import {setUsername} from '../ducks/Reducer'
import {login} from '../utils/SocketFunctions'
import king from '../images/default_king.jpg'
import queen from '../images/default_queen.jpg'
import bishop from '../images/default_bishop.jpg'
import knight from '../images/default_knight.jpg'
import rook from '../images/default_rook.jpg'



class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      onlineUsers: [],
      currentUser: [],
      showIcons: false
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

        
      })
      .catch(err => {
        console.log('dis is du err!',err)
        axios.post('/api/logout')
        this.props.history.push('/')
      })
    } else {
     
    }
  }

  showTheIcons = () => {
   let {showIcons} = this.state
   if (showIcons) {
     this.setState({
       showIcons: false
     })
   } else {
     this.setState({
       showIcons: true
     })
   }
  }

  changeIcon = (val) => {
    console.log('Change Icon Fired')
    axios.put(`/api/user/`, {val}).then(res => {
      console.log(res)
      this.showTheIcons()
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
    // console.log(this.props.username)
    let {currentUser} = this.state
    return (
      <div className="outerBlock">
        <div className="profile">
          <div className="profile_section">
            <div className="sun_profile_section">
              <UserInfo 
                showTheIcons = {this.showTheIcons}
                currentUser = {currentUser[0]}/>
              <div className = {(this.state.showIcons? 'imageOpps': 'hiding')}>
                <img onClick = {() => this.changeIcon(`../../../images/default_king.jpg`)} src={king} alt=""/>
                <img onClick = {() => this.changeIcon(`../../../images/default_queen.jpg`)}src={queen} alt=""/>
                <img onClick = {() => this.changeIcon(`../../../images/default_bishop.jpg`)}src={bishop} alt=""/>
                <img onClick = {() => this.changeIcon(`../../../images/default_knight.jpg`)}src={knight} alt=""/>
                <img onClick = {() => this.changeIcon(`../../../images/default_rook.jpg`)}src={rook} alt=""/>
              </div>
            </div>
            <Leaderboard/>
          </div>
          <div className="profile_section">
            <Arena/>
          </div>
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






