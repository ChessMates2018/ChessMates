import React, {Component} from 'react'


class MoveList extends Component{

  render(){
    let {username, resignation, draw} = this.props
    return(
        <div className='ML_rapper'>
            <h3>MoveList</h3>
            <div className="move_list">
                {this.props.move()}
            </div>
            <button
                className = "resign_btn"
                onClick = {() => resignation(username)}
            >Resign</button>
            <button
                className = "draw_btn"
                onClick = {() => draw(username)}
            >Offer Draw</button>
        </div>
    )
}
}

export default MoveList