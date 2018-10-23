import React, {Component} from 'react'
import PotentialOpponents from './SubComponents/PotentialOpponents';


class Arena extends Component {
  constructor(props) {
    super(props)

    this.state = {
      
    }
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