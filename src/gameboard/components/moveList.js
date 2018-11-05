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
        
        <div>
        <div className="move_list">
            <h1>MoveList</h1>
            {this.props.move()}
            
            
        </div>
        <button
             onClick = {resignation}
            >Resign</button>
        </div>
    )
}
}

export default MoveList