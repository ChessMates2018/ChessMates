import React, {Component} from 'react'
import axios from 'axios'
import PotentialOpponents from './SubComponents/PotentialOpponents';


class Arena extends Component {
  constructor(props) {
    super(props)

    this.state = {
      onlineUsers: []
    }
  }

  componentDidMount() {
    axios.get(`/api/loggedin`).then(res => {
      this.setState({
        onlineUsers: res.data
      })
    })
  }


  render () {
    return (
      <div>
        <PotentialOpponents/>
        <button className="button">Join the Arena</button>
      </div>
    )
  }
}

export default Arena