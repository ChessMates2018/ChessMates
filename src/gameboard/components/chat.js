import React, {Component} from 'react'
import io from 'socket.io-client'

export default class Chat extends Component{
    constructor(){
        super()
        this.state={
            generalUserInput: "", 
            generalMessages: [],
            white: "",
            black: ""
        }
        this.socket = io.connect('/')
    }

componentDidMount(){
    this.socket = io();
    this.socket.on("general-message", data => {
      console.log('got general mesage');
      let gm = this.state.generalMessages.slice();
      gm.push(data);
      this.setState({ generalMessages: gm });
    });
}

submitMessage = (message, roomName) => {
    console.log(roomName)
    this.socket.emit(`${roomName}-chat`, message);
}

handleKeyUp = e => {
    if (e.key === "Enter") {
      this.submitMessage(this.state[e.target.name+'UserInput'], e.target.name);
      this.setState({ [e.target.name+'UserInput']: "" });
    }
  };


    render(){
        return(
            <section className="chat-container">
            <div className="messages-window">
            {
                this.state.generalMessages.map((gm,i)=>{
                  return (<p key={i}>{gm}</p>)
                })
              }
            </div>
            <div className="input-container">
            <input
            className="input-field"
                type="text"
                value={this.state.generalUserInput}
                onChange={e => this.setState({ generalUserInput: e.target.value })}
                name="general"
                onKeyUp={this.handleKeyUp}
            />
            </div>
            
            </section>
        )
    }
}