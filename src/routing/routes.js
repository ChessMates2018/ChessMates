import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Gameboard from '../gameboard/gameboard'
import Login from '../landingpage/landingpage'
import Profile from '../profile/profile'
import About from '../about/about'

export default function Nav(){
    return(
        <div>
            <Switch>
                <Route exact path='/' component={Login}/> 
                <Route path='/profile' component={Profile}/>
                <Route path='/gameboard/:roomId' component={Gameboard}/>
                <Route path='/about' component={About}/>
            </Switch>
        </div>
    )
}