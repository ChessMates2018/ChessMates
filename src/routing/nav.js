import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import king from '../images/new_crown.png'

class Nav extends Component {
    logout() {
        axios.post('/api/logout')
            .then(this.props.history.push('/'))
    }
    render() {
        if (this.props.location.pathname !== '/') {
                if (this.props.location.pathname === '/profile') {
                    //profile
                    return (
                        <div className='navBod'>
                            <div className='leftNav'>
                                <img className='navImg' src={king} />
                                <h2 className='navH2'>Checked</h2>
                            </div>
                            <h1 className='navH1'>Profile</h1>
                            <div className='navMenu'>
                                <Link style={{textDecoration: 'none'}} to='/about'>
                                    <p className='aboutLink'>About</p>
                                </Link>
                                <span className='logoutBtn' onClick={() => this.logout()}>Logout</span>
                            </div>
                        </div>
                    )
                } else if (this.props.location.pathname === '/about') {
                    // about
                    return (
                        <div className='navBod'>
                            <div className='leftNav'>
                                <img className='navImg' src={king} />
                                <h2 className='navH2'>Checked</h2>
                            </div>
                            <h1 className='navH1'>About</h1>
                            <div className='navMenu'>
                                <Link style={{textDecoration: 'none'}} to='/profile'>
                                    <p className='aboutLink'>Profile</p>
                                </Link>
                                <span className='logoutBtn' onClick={() => this.logout()}>Logout</span>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className='navBod'>
                            <div className='leftNav'>
                                <img className='navImg' src={king} />
                                <h2 className='navH2'>Checked</h2>
                            </div>
                            <h1 className='navH1'>Game Board</h1>
                            <div className='navMenu'>
                                <Link style={{textDecoration: 'none'}} to='/profile'>
                                    <p className='aboutLink'>Profile</p>
                                </Link>
                                <button className='logoutBtn' onClick={() => this.logout()}>Logout</button>
                            </div>
                        </div>
                    )
            }
        } else {
            return null
        }
    }
}

export default withRouter(Nav)