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
    console.log(this.state)
    return(
        <div>
            <h1>Header Span with Logo</h1>
            <Leaderboard />
            <span className="welcome-button" onClick={this.toggleDiv}>Welcome</span>
        

        <h2>Login</h2>
        <input placeholder="Username" name="Username" value={this.state.Username} onChange={this.handleInput} ></input>

        <input placeholder="Password" name="Password" value={this.state.Password}onChange={this.handleInput}></input>

        <button onClick={this.login}>Login</button>

        <RegisterModal />

        </div>
    )
}




}

export default LandingPage