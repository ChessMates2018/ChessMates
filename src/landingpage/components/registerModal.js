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
        } else {
            this.props.history.push('/profile')
        }
})}}


render(props){
    console.log(this.state)
let {toggleDiv} = this.props

    return(
        <div className="register">
            <div className="toggled-view">
                <input name='firstName' placeholder="Your first name." value={this.state.FirstName} onChange={this.handleInput} ></input>

                <input name='lastName' placeholder="Your last name." value={this.state.LastName} onChange={this.handleInput} ></input>

                <input name='email' placeholder="Your email address." value={this.state.Email} onChange={this.handleInput} ></input>

                <input name='username' placeholder="Your username." value={this.state.Username} onChange={this.handleInput} ></input>

                <input name='password' placeholder="Your password." value={this.state.Password} onChange={this.handleInput} ></input>

                <input name='passwordConfirm' placeholder="Confirm your password." value={this.state.PasswordConfirm} onChange={this.handleInput} ></input>

                <button  onClick={this.createAccount}>Create Account</button>
                <button  onClick={toggleDiv}>Cancel</button>
            </div>
        </div>
    )
}
}

export default RegisterModal


