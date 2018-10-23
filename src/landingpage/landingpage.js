import React, {Component} from 'react'

class LandingPage extends Component {
constructor(){
    super()
        this.state={
            userwame: '',
            password: '',
            Modal: false
        }
}

login(){}

register(){}

toggleDiv(){
    
}

render(){
    return(
        <div>
            <h1>Header Span with Logo</h1>
            <span className="welcome-button" onClick="toggleDiv">Welcome</span>
            
        </div>
    )
}




}

export default LandingPage