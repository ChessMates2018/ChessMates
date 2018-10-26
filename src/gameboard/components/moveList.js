import React from 'react'

const MoveList = (props) => {
// console.log('props',props)

    return(
        <div className="move_list">
            <h1>MoveList</h1>
            {props.move()}
        </div>
    )
}

export default MoveList