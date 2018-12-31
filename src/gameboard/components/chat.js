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
            user: ""
        }
        this.socket = io.connect('/')
    }

componentDidMount(){
    this.socket = io();
    this.socket.on("general-message", data => {
    //   this.setState({user: data.user})
      console.log('got general mesage');
      let gm = this.state.generalMessages.slice();
      gm.push(data);
      this.setState({ generalMessages: gm });
    });
}

submitMessage = (message, roomName) => {
    // let {light,dark} = this.props
    // let {username} = this.props
    console.log(roomName)
    // if(light === username){
    //     let user = light
    //     this.socket.emit(`${roomName}-chat`, {message});
    // } else {
        // let user = dark
        this.socket.emit(`${roomName}-chat`, message);
// }
}

handleKeyUp = e => {
    if (e.key === "Enter") {
      this.submitMessage(this.state[e.target.name+'UserInput'], e.target.name);
      this.setState({ [e.target.name+'UserInput']: "" });
    }
  };


    render(){
        // console.log('CHAT PROPS', this.props)
        // console.log('look at me', username)
        return(
            <section className="chat-container">
            <h3>Insult box</h3>
            <div className="messages-window">
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