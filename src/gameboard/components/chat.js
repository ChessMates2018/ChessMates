import React, {Component} from 'react'
import io from 'socket.io-client'
import {connect} from 'react-redux'
  
class Chat extends Component{
    constructor(props){
        super(props)
        this.state={
            generalUserInput: "", 
            generalMessages: [],
            white: "",
            black: "",
            user: "",
            userOpponent: ""
        }
        this.socket = io.connect('/')
    }

componentDidMount(){
    this.setState({
        user: this.props.username
    })
    this.socket = io();
    this.socket.on("general-message", data => {
      let {user, message} = data
      let gm = this.state.generalMessages.slice();
      gm.push(`${user}: ${message}`);
      this.setState({ generalMessages: gm});
    });
}

componentWillUnmount(){
    this.socket.close()
  }

submitMessage = (user, message, roomName) => {
        let messageObj = {user, message}
        this.socket.emit(`${roomName}-chat`, messageObj);
}

handleKeyUp = e => {
    let {user} = this.state
    if (e.key === "Enter") {
      this.submitMessage(user, this.state[e.target.name+'UserInput'], e.target.name);
      this.setState({ [e.target.name+'UserInput']: "" });
    }
  };

    render(){
        return(
            <section className="chat-container">
            <h3>Insult box</h3>
            <div 
            className="messages-window"
            >
            {
                this.state.generalMessages.map((gm,i)=>{
                  return (<p key={i} className = 'gm'>{gm}</p>)
                })
            }
            </div>
            <div className="input-container">
            <textarea name="" id="" cols="30" rows="5"
                className="input-field"
                type="text"
                value={this.state.generalUserInput}
                onChange={e => this.setState({ generalUserInput: e.target.value })}
                name="general"
                onKeyUp={this.handleKeyUp}
            ></textarea>
            </div>
            </section>
        )
    }
}

function mapStateToProps(reduxState){
    let {username} = reduxState
    return{
        username
    }
}

export default connect(mapStateToProps)(Chat)