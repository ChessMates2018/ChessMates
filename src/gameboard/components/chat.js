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
            <div>

            </div>
        )
    }
}