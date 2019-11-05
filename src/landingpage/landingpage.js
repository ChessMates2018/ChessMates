import React, {Component} from 'react'
import Leaderboard from './components/leaderboard'
import RegisterModal from './components/registerModal'
import axios from 'axios';

class LandingPage extends Component {
constructor(props){
    super(props)
        this.state={
            Username: '',
            Password: '',
            Div: false
        }
        this.handleInput = this.handleInput.bind(this)
        this.toggleDiv = this.toggleDiv.bind(this)
        this.login = this.login.bind(this)
        this.guest = this.guest.bind(this)
}

login(){
let {Username, Password} = this.state
axios.post('/api/login', {Username, Password}).then((res) => {
if (res.data === 'Invalid Password'){
    alert(res.data)
} else if (res.data === 'Username does not exist') {
    alert(res.data)
} else{
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

async guest(){
// Axios call to sign in as guest on session - id?
const guest = await axios.get('/api/guestLogin/')
console.log(guest)
// Redirects to profile
this.props.history.push('/profile')
}

render(){
let WelcomeDiv;
if (this.state.Div === true){
WelcomeDiv =
<div>
<RegisterModal history = {this.props.history} toggleDiv={this.toggleDiv} />
</div>
} else {
    WelcomeDiv = 
    <div className="login">
        <input className="input" placeholder="Username" name="Username" value={this.state.Username} onChange={this.handleInput} />
        <input className="input" placeholder="Password" name="Password" type = "password" value={this.state.Password}onChange={this.handleInput}/>
        <button className="btn"  onClick={this.login}>Login</button>
        <button className="btn"  onClick={this.toggleDiv}>Register</button>
        {/* <button className="btn"  onClick={this.guest}>Guest</button> */}
    </div>
}
let {Div} = this.state
    return(
        <div className="landing-page">
            <div className="rapper">
                <div id="title">
                    <div className="logo-img logo-right"></div>
                    <h1>Checked</h1>
                    <div className="logo-img logo-left"></div>
                </div>
                {WelcomeDiv}
                <Leaderboard />
            </div>
        </div>
    )
}




}

export default LandingPage