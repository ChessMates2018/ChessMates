import React from 'react'

const MoveList = (props) => {
// console.log('props',props)
let {resignation} = props

    return(
        <div className="move_list">
            <h1>MoveList</h1>
            {props.move()}
            <button
                onClick = {resignation}
            >Resign</button>

        </div>
    )
}

export default MoveList