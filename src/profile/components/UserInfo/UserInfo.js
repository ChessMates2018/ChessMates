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
      currentUser: {},
      updateImage: ''
    }

    
  }

  componentDidMount(props) {
    this.getUser()
  }

  componentWillReceiveProps(nextprops){
    this.getUser()
  }


  getUser = () => {
    axios.get(`/api/user`).then(res => {
      console.log(res.data)
      if (res.data === "guest"){
      const guest = {
        image: "/static/media/default_king.4177e9c0.jpg",
        losses: 0,
        rating: 1000,
        username: "guest",
        wins: 0
      }
        this.setState({
          currentUser: guest
        })
      } else {
      this.setState({
        currentUser: res.data[0],
      })
    }
    })
  }

 


  render () {
  let {username, rating, image, wins, losses} = this.state.currentUser
  let {showTheIcons, pleaseLogIn} = this.props
    return (
      <div>
        <div className ="userInfoBlock">
          <section className = 'UI_Content'>
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
          {
            username === "guest" ?
            <button id = 'updateBtn' onClick = {pleaseLogIn}>Please Login</button>
            :
            <button id = 'updateBtn' onClick = {showTheIcons}>Choose Image</button>
          }
          </section >
        </div>
        
      </div>
    )
  }
}


export default (UserInfo)