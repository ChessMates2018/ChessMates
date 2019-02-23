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
      let compResponse = [
        "Hello Human Overlord, I am your loyal servant. How may I assist you today?",
        "It looks like you are trying to play a game of chess. May I suggest Knight to E4?",
        "The creators of this app would really appreciate being considered for a job!",
      ]
      console.log(user)
      if (user === 'guest'){
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
          }
        const phraseNumber =  getRandomInt(0,compResponse.length)
        let gm = this.state.generalMessages.slice();
        gm.push(`${user}: ${message}`);
        this.setState({ generalMessages: gm}, () => {
            gm.push(`Computer: ${compResponse[phraseNumber]}`)
            this.setState({generalMessages: gm})
        });
      } else {
        let gm = this.state.generalMessages.slice();
        gm.push(`${user}: ${message}`);
        this.setState({ generalMessages: gm});
    }
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
            <textarea cols="30" rows="5"
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