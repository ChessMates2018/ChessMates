  import React, {Component} from 'react' 
import axios from 'axios'
import Arena from './components/Arena/Arena'
import UserInfo from './components/UserInfo/UserInfo'
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
      showIcons: false,
    }

    
  }

  componentDidMount() {
    if (!this.props.username) {
      // console.log('FIRE FIRE FIRE')
      axios.get(`/api/checkuser`).then(res => {
        console.log(res.data)
        this.props.setUsername(res.data)
        login(res.data)
      })
      .catch(err => {
        axios.post('/api/logout')
        this.props.history.push('/')
      })
    } else return
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
    axios.put(`/api/user/`, {val}).then(res => {
      this.showTheIcons()
    })
  }

  getAllOnline () {
    axios.get(`/api/loggedin`).then(res => {
      this.setState({
        onlineUsers: res.data
      })
    })
  }

  render () {
    let {currentUser} = this.state
    console.log(currentUser)
    return (
      <div className="outerBlock">
        <div className="profile">
          <div className="profile_section">
            <div className="sun_profile_section">
              <UserInfo 
                showTheIcons = {this.showTheIcons}
                currentUser = {currentUser[0]}/>
              <div className = {(this.state.showIcons? 'imageOpps': 'hiding')}>
                <img onClick = {() => this.changeIcon(king)} src={king} alt=""/>
                <img onClick = {() => this.changeIcon(queen)} src={queen} alt=""/>
                <img onClick = {() => this.changeIcon(bishop)} src={bishop} alt=""/>
                <img onClick = {() => this.changeIcon(knight)} src={knight} alt=""/>
                <img onClick = {() => this.changeIcon(rook)} src={rook} alt=""/>
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