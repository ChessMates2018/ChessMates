import React, {Component} from 'react' 
import defaultImage from '../../../images/default_profile.png'
import axios from 'axios'

class UserInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: {}
      
    }
  }

  componentDidMount() {
    this.getUser()
  }
  
  getUser = () => {
    axios.get(`/api/user`).then(res => {
      console.log('user', res.data)
      this.setState({
        currentUser: res.data[0]
      })
    })
  }

  render () {
  let {username, rating} = this.state.currentUser
    return (
      <div className ="userInfoBlock">
        <section className = 'UI_Content'>
          <img src={defaultImage} alt="default profile image"/>
        </section>
        <section className = 'UI_Content'>
          <h1 className="userName">{`${username}:`} <span className = 'sub_userName'>{` lv ${rating}`}</span> </h1>
          {/* <div className="stats_box"> */}
            {/* <h3 className="stats">{rating}</h3> */}
            {/* <h3 className="stats">Win:Loss ratio</h3> */}
            {/* <h3 className="stats">Most Frequent Opponent</h3>
            <h3 className="stats">Number of Games played</h3> */}
          {/* </div> */}
          <button id = 'updateBtn' onClick = {this.updateUserInfo}>Choose Image</button>
        </section>
      </div>
    )
  }
}

export default UserInfo 