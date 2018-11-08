import React, {Component} from 'react' 
import king from '../../../images/default_king.jpg'
// import queen from '../../../images/default_queen.jpg'
// import bishop from '../../../images/default_bishop.jpg'
// import knight from '../../../images/default_knight.jpg'
// import rook from '../../../images/default_rook.jpg'
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
        currentUser: res.data[0],
      })
    })
  }

  render () {
  let {username, rating, image} = this.state.currentUser
  console.log(this.state.currentUser)
  let {showTheIcons} = this.props
    return (
      <div>
        <div className ="userInfoBlock">
          <section className = 'UI_Content'>
          {/* {this.state.currentUser ? */}
             {/* <img src={require(image)} alt="default profile image"/> */}
             <img src={require('../../../images/default_king.jpg')} alt="default profile image"/>
          {/* } */}
            </section>
          <section className = 'UI_Content'>
            <h1 className="userName">{`${username}:`} <span className = 'sub_userName'>{` lv ${rating}`}</span> </h1>
            {/* <div className="stats_box"> */}
              {/* <h3 className="stats">{rating}</h3> */}
              {/* <h3 className="stats">Win:Loss ratio</h3> */}
              {/* <h3 className="stats">Most Frequent Opponent</h3>
              <h3 className="stats">Number of Games played</h3> */}
            {/* </div> */}
            <button id = 'updateBtn' onClick = {showTheIcons}>Choose Image</button>
          </section >
        </div>
          {/* <section className="imgOpts">
            <img src={king} alt=""/>
            <img src={queen} alt=""/>
            <img src={bishop} alt=""/>
            <img src={knight} alt=""/>
            <img src={rook} alt=""/>
          </section> */}
      </div>
    )
  }
}

export default UserInfo