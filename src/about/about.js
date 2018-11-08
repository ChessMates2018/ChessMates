import React, {Component} from 'react'

export default class About extends Component{
    render(){
        return(
            <section id="about-page">
                <div className="team-mate-div">
                    <img src='../images/posingWithPoe.jpg' alt='Brady posing with Edgar Allen Poe cutout'/>
                    <h2>Brady Snuggs</h2>
                    <p>A full stack web developer, chess enthusiast, FAA certified drone pilot, and musician, who enjoys working collaboratively to tackle complex problems. </p>
                </div>
                <div className="team-mate-div">
                    <img src='' alt=''/>
                    <h2>Name</h2>
                    <p>Bio</p>
                </div>
                <div className="team-mate-div">
                    <img src='' alt=''/>
                    <h2>Name</h2>
                    <p>Bio</p>
                </div>
            </section>
        )
    }
}