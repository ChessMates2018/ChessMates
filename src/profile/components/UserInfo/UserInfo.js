import React, {Component} from 'react' 
import king from '../../../images/default_king.jpg'
import queen from '../../../images/default_queen.jpg'
import bishop from '../../../images/default_bishop.jpg'
import knight from '../../../images/default_knight.jpg'
import rook from '../../../images/default_rook.jpg'
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

  componentWillUpdate(prevProps, prevState){
    console.log(prevProps)
    if(prevProps.image !== this.state.currentUser.image){
      console.log('updating')
    }
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
  console.log(this.state)
  let {username, rating, image, wins, losses} = this.state.currentUser
  // let imageStr = JSON.stringify(image)
  console.log('current', image)
  let {showTheIcons} = this.props
    return (
      <div>
        <div className ="userInfoBlock">
          <section className = 'UI_Content'>
          {/* <img src={king} alt="default profile image"/> */}
          
          {image == king ?
             <img src={king} alt="default king icon"/>
            : image == queen ? 
             <img src={queen} alt="default queen icon"/>
            : image == bishop ?
             <img src={bishop} alt="default bishop icon"/>
            : image == knight ?
             <img src={knight} alt="default knight icon"/>
            : image == rook &&
             <img src={rook} alt="default rook icon"/>
          }
            </section>
          <section className = 'UI_Content'>
            <h1 className="userName">{`${username}:`} <span className = 'sub_userName'>{` lv ${rating}`}</span> </h1>
            <p>Wins: {wins}</p>
            <p>Losses: {losses}</p>
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