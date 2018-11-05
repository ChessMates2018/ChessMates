import React, {Component} from 'react'
import axios from 'axios';

class RegisterModal extends Component{
    constructor(props){
        super(props)
            this.state={
                firstName: '',
                lastName: '',
                email: '',
                username: '',
                password: '',
                passwordConfirm: ''
            }
            this.handleInput = this.handleInput.bind(this)
            this.createAccount = this.createAccount.bind(this)
    }

handleInput(e){
this.setState({
[e.target.name]: e.target.value
})
}

createAccount(){
let {firstName, lastName, email, username, password, passwordConfirm} = this.state
if (password !== passwordConfirm){
    return alert('Your password confirmation does not match.')
} else {
    axios.post('/api/register', {username, password, firstName, lastName, email}).then((res) => {
        if (res.data === 'Username taken. Please try again.') {
            alert(res.data)
        } 
})}}


render(props){
let {toggleDiv} = this.props

    return(
        <div className="register">
            <div className="toggled-view">
                <h2>Register Modal</h2>
                <h3>FirstName:</h3><input name='FirstName' placeholder="Your first name." value={this.state.FirstName} onChange={this.handleInput} ></input>

                <h3>LastName:</h3><input name='LastName' placeholder="Your last name." value={this.state.LastName} onChange={this.handleInput} ></input>

                <h3>Email:</h3><input name='Email' placeholder="Your email address." value={this.state.Email} onChange={this.handleInput} ></input>

                <h3>Username:</h3> <input name='Username' placeholder="Your username." value={this.state.Username} onChange={this.handleInput} ></input>

                <h3>Password:</h3><input name='Password' placeholder="Your password." value={this.state.Password} onChange={this.handleInput} ></input>

                <h3>PasswordConfirm:</h3><input name='PasswordConfirm' placeholder="Confirm your password." value={this.state.PasswordConfirm} onChange={this.handleInput} ></input>

                <button id="create-button" onClick={this.createAccount}>Create Account</button>
                <button id="cancel-button" onClick={toggleDiv}>Cancel</button>
            </div>
        </div>
    )
}
}

export default RegisterModal