import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Nav extends Component{
    logout(){
        axios.post('/api/logout')
        .then(this.props.history.push('/'))
    }
    render(){
        if (this.props.location.pathname !== '/'){
            if(this.props.location.pathname === '/profile'){
                return(
                    <div>
                        <img src=''/>
                        <h1></h1>
                    </div>
                )
            }
        }
    }
}

export default withRouter(Nav)