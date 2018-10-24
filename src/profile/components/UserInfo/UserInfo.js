import React, {Component} from 'react' 
import defaultImage from '../../../images/default_profile.png'

class UserInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      
    }
  }

  render () {
    return (
      <div className ="wrapper">
        <section>
          <img src={defaultImage} alt="default profile image"/>
        </section>
        <section>
          <h1 className="userName">Username</h1>
          <div className="stats_box">
            <h3 className="stats">Rating</h3>
            <h3 className="stats">Win:Loss ratio</h3>
            <h3 className="stats">Most Frequent Opponent</h3>
            <h3 className="stats">Number of Games played</h3>
          </div>
          <button>Update Profile</button>
        </section>
      </div>
    )
  }
}

export default UserInfo 