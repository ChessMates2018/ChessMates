import React, {Component} from 'react'

class MoveList extends Component{
    constructor(){
    super()
        this.state={

        }
  }

  
  render(props){
      let {resignation} = this.props
      
    return(
        
        <div className='ML_rapper'>
            <h3>MoveList</h3>
            <div className="move_list">
                {this.props.move()}
            </div>
            <button
                className = "resign_btn"
                 onClick = {resignation}
            >Resign</button>
        </div>
    )
}
}

export default MoveList