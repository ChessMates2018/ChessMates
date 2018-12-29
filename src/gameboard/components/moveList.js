import React, {Component} from 'react'

class MoveList extends Component{
    constructor(){
    super()
        this.state={

        }
  }

  
  render(props){
      let {resignation, light, dark} = this.props
      console.log(`%c ${light}`, "color: red; font-size: 24px")
    return(
        <div className='ML_rapper'>
            <h3>MoveList</h3>
            <div className="move_list">
                {this.props.move()}
            </div>
            <button
                className = "resign_btn"
                 onClick = {(e) => resignation(e)}
            >Resign</button>
        </div>
    )
}
}

export default MoveList