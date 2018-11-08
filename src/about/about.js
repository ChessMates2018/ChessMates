import React, {Component} from 'react'
import BradyPic from '../images/posingwithPoe.jpg'
import JordanPic from '../images/Jordan-headshot.jpg'
import MichellePic from '../images/Michelle_profile.jpg'
import github from '../images/github.png'
import linkedin from '../images/linkedin.png'

export default class About extends Component{
    render(){
        return(
            <section id="about-page">
            <div id="about-checked">
            <h1>About Checked</h1>
            <p>Checked is a web-based chess application where users can create an account and casually play their friends, or other users of the site, in real-time. This project was built in React and styled with SASS, uses BCrypt for authorization, and the backend was built with Express, Massive, PostgreSQL,and Socket.io. </p>
            </div>


            <section id="team-mate-section">
            <div className="card-container">
                <div className="card">
                <div className="side front">
                <div className="img-container">
                <img className="team-mate-img" src={BradyPic} alt="Brady Snuggs" />
                </div>
                <h2>Brady Snuggs</h2>
                <h3>Co-Developer</h3>
                </div>
                <div className="side back">
                <div className="team-mate-bio">
                <p>A full stack web developer, chess enthusiast, FAA certified drone pilot, and musician, who enjoys working collaboratively to tackle complex problems. </p>
                </div>
                <div className="team-mate-email">
                <p>what?</p>
                <i className="fas fa-envelope"></i>
                </div>
                <div className="team-mate-contact">
                <p>Portfolio</p>
                <img className="contact-img" src={github} alt="Github link" />
                <img className="contact-img" src={linkedin} alt="Github link" />
                </div>
                </div>
                </div>
                </div>
               

                <div className="card-container">
                <div className="card">
                <div className="side front">
                <div className="img-container">
                <img className="team-mate-img" src={MichellePic} alt="Michelle Jones" />
                </div>
                <h2>Michelle Jones</h2>
                <h3>Co-Developer</h3>
                </div>
                <div className="side back">
                <div className="team-mate-bio">
                <p>A full stack web developer, chess enthusiast, FAA certified drone pilot, and musician, who enjoys working collaboratively to tackle complex problems. </p>
                </div>
                <div className="team-mate-email">
                <p>what?</p>
                <i className="fas fa-envelope"></i>
                </div>
                <div className="team-mate-contact">
                <p>Portfolio</p>
                <img className="contact-img" src={github} alt="Github link" />
                <img className="contact-img" src={linkedin} alt="Github link" />
                </div>
                </div>
                </div>
                </div>

                <div className="card-container">
                <div className="card">
                <div className="side front">
                <div className="img-container">
                <img className="team-mate-img" src={JordanPic} alt="Jordan Smithson" />
                </div>
                <h2>Jordan Smithson</h2>
                <h3>Co-Developer</h3>
                </div>
                <div className="side back">
                <div className="team-mate-bio">
                <p>A full stack web developer, chess enthusiast, FAA certified drone pilot, and musician, who enjoys working collaboratively to tackle complex problems. </p>
                </div>
                <div className="team-mate-email">
                <p>what?</p>
                <i className="fas fa-envelope"></i>
                </div>
                <div className="team-mate-contact">
                <p>Portfolio</p>
                <img className="contact-img" src={github} alt="Github link" />
                <img className="contact-img" src={linkedin} alt="Github link" />
                </div>
                </div>
                </div>
                </div>
                </section>
                
            </section>
        )
    }
}