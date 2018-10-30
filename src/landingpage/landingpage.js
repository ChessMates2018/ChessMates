import React, {Component} from 'react'
import Leaderboard from './components/leaderboard'
import RegisterModal from './components/registerModal'
import axios from 'axios';

class LandingPage extends Component {
constructor(){
    super()
        this.state={
            Username: '',
            Password: '',
            Div: false
        }
        this.handleInput = this.handleInput.bind(this)
        this.toggleDiv = this.toggleDiv.bind(this)
        this.login = this.login.bind(this)
}

login(){
let {Username, Password} = this.state
axios.post('/api/login', {Username, Password}).then((res) => {
    console.log(res.data)
if (res.data === 'Invalid Password'){
    alert(res.data)
} else if (res.data === 'Username does not exist') {
    alert(res.data)
} else{
    console.log(this.props)
    this.props.history.push('/profile')
}
})


}


toggleDiv(){
if (this.state.Div === false){
    this.setState({
        Div: true
    })} else {
        this.setState({
        Div: false
        })
    }
}

handleInput(e){
this.setState({
[e.target.name]: e.target.value
})
}


render(){
let WelcomeDiv;
if (this.state.Div === true){
WelcomeDiv =
<div>
<RegisterModal />
</div>
} else {
    WelcomeDiv = null
}

    return(
        <div className="landing-page">
            <div id="title">
                <h1>Checked</h1>
                <h3>
                A group of chess enthusiasts checked into a hotel and were standing in the lobby
                discussing their recent tournament victories. After about an hour, the manager 
                came out of the office and asked them to disperse. "But why?" they asked, as they 
                moved off. "Because," he said "I can't stand chess nuts boasting in an open foyer." 
                <p>~ Peter Kay </p>
                </h3>
            </div>

            <div className="login">
                <h2 id="login-welcome">Welcome</h2>
                <input className="input" placeholder="Username" name="Username" value={this.state.Username} onChange={this.handleInput} />
                <input className="input" placeholder="Password" name="Password" type = "password" value={this.state.Password}onChange={this.handleInput}/>
                <button className="btn"  onClick={this.login}>Login</button>
                <button className="btn"  onClick={this.toggleDiv}>Register</button>
            </div>

            <div id="WelcomeDiv">
            {WelcomeDiv}
            </div>

            <Leaderboard />

        </div>
    )
}




}

export default LandingPage