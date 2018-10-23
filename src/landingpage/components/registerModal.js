import React, {Component} from 'react'
import axios from 'axios';

class registerModal extends Component{
    constructor(){
        super()
            this.state={
                FirstName: '',
                LastName: '',
                Email: '',
                Username: '',
                Password: '',
                PasswordConfirm: ''
            }
    }

handleInput(e){
this.state({
[e.target.name]: e.target.value
})
}

createAccount(){
let {FirstName, LastName, Email, Username, Password, PasswordConfirm} = this.state
if (Password !== PasswordConfirm){
    return alert('Your password and password confirmation do not match.')
} else {
    axios.post('/api/register', {Username, Password, FirstName, LastName, Email})
}
}

render(){
    return(
        <div>
            <h2>Register Modal</h2>
            <h3>FirstName:</h3><input name='FirstName' placeholder="Your first name." value={this.state.FirstName} onChange={this.handleInput} ></input>

            <h3>LastName:</h3><input name='LastName' placeholder="Your last name." value={this.state.LastName} onChange={this.handleInput} ></input>

            <h3>Email:</h3><input name='Email' placeholder="Your email address." value={this.state.Email} onChange={this.handleInput} ></input>

            <h3>Username:</h3> <input name='Username' placeholder="Your username." value={this.state.Username} onChange={this.handleInput} ></input>

            <h3>Password:</h3><input name='Password' placeholder="Your password." value={this.state.Password} onChange={this.handleInput} ></input>

            <h3>PasswordConfirm:</h3><input name='PasswordConfirm' placeholder="Please confirm your password." value={this.state.PasswordConfirm} onChange={this.handleInput} ></input>

            <button onClick={}>Create Account</button>
            <button>Cancel</button>
        </div>
    )
}
}

export default registerModal