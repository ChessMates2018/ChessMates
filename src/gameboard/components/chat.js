import React, {Component} from 'react'
import io from 'socket.io-client'

export default class Chat extends Component{
    constructor(){
        super()

        this.socket = io.connect('/')
    }
    render(){
        // var socket = io()
        return(
            <div  className="chat">
                <h1>I iz the chat box. LOVE ME!!!</h1>
            </div>
        )
    }
}