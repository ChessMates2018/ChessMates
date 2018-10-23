import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Nav extends Component {
    logout() {
        axios.post('/api/logout')
            .then(this.props.history.push('/'))
    }
    render() {
        if (this.props.location.pathname !== '/') {
            if (this.props.location.pathname !== '/gameboard/id') {
                if (this.props.location.pathname === '/profile') {
                    return (
                        <div>
                            <div>
                                <img src='' />
                                <h2>Checked</h2>
                            </div>
                            <h1>Profile</h1>
                            <Link to='/about'>
                                <p>About</p>
                            </Link>
                            <button onClick={() => this.logout()}>Logout</button>
                        </div>
                    )
                } else{
                    return (
                        <div>
                            <div>
                                <img src='' />
                                <h2>Checked</h2>
                            </div>
                            <h1>Profile</h1>
                            <Link to='/profile'>
                                <p>Profile</p>
                            </Link>
                        </div>
                    )
                }
            }
        }else{
            return null
        }
    }
}

export default withRouter(Nav)