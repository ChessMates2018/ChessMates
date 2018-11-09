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
            <h1 id="subtitle">Casual Chess for the Curmudgeon</h1>
            <p id="checked-description">Checked is a web-based chess application where users can create an account and casually play their friends, or other users, in real-time. This project was built in React and styled with SASS, uses BCrypt for authorization, and the backend was built with Express, Massive, PostgreSQL,and Socket.io. This application was built collaboratively by the developers listed below and submitted as a group assignment for Devmountain's final benchmark project. It was created in the Fall of 2018. </p>
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
                <p>I'm a full stack web developer, chess enthusiast, FAA certified drone pilot, and musician, who enjoys working collaboratively to tackle complex problems. Always looking for new skill sets to add to my skillstack, and to expand my knowledge base. </p>
                </div>
                <div className="portfolio">
                <a href="bradysnuggs.net"><p className="portfolio-text">My portfolio</p></a>
                </div>
                <div className="team-mate-email">
                <a href="mailto:bradyesnuggs@gmail.com?subject=We love your work, give us more!">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD1SURBVGhD7ZlBDoIwFAW79RQe0et4F8/jIVxpi/5EYLQFWu0j/yWT0AkknTXB5/P55HbZCeG+E1AqglIRlIqgVASlIuEcub0JNdLdU8OwY0QtyALS3WdTCPoaMF2PQdmAU+TwfJyth6BcQLp7ahhevr4OPQWVBqS7p/dHH/cQtDTAGB2MfwStDTBQGr8I2hpgoJzSIqhWgIHyEzWCagcYKHOsCWoVYKAspTSoZYCBcim5IFqtAAPlWkqCagcYKLdCQa0CDJS1sKCWAQZKRVAqglIRlIqgVASlIigVQakISkVQKoJSEZSKoFQEfywq4vP5fDIL4QFM/YS3ZgtmFQAAAABJRU5ErkJggg==" />
                </a>
                </div>
                <div className="team-mate-contact">

                <a href="https://github.com/Besnuggs">
                <img className="github-img" src={github} alt="Github link" />
                </a>

                <a href="https://www.linkedin.com/in/bradysnuggs/">
                <img className="linkedin-img" src={linkedin} alt="linkedin link" />
                </a>

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
                <p>One of the quotes I live by is: "Harder is better." I love tackling hard projects and creating beautiful things...Which makes web development just about the perfect field for me. Not to mention the endless chances to learn new things and grow my skill set. I can't wait to see what comes next.</p>
                </div>
                <div className="portfolio">
                <a href="https://michelleeditor2.wixsite.com/portfolio"><p className="portfolio-text">My portfolio</p></a>
                </div>
                <div className="team-mate-email">
                <a href="mailto:michelle.editor2@gmail.com?subject=Checked looks awesome, let's set up an interview.">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD1SURBVGhD7ZlBDoIwFAW79RQe0et4F8/jIVxpi/5EYLQFWu0j/yWT0AkknTXB5/P55HbZCeG+E1AqglIRlIqgVASlIuEcub0JNdLdU8OwY0QtyALS3WdTCPoaMF2PQdmAU+TwfJyth6BcQLp7ahhevr4OPQWVBqS7p/dHH/cQtDTAGB2MfwStDTBQGr8I2hpgoJzSIqhWgIHyEzWCagcYKHOsCWoVYKAspTSoZYCBcim5IFqtAAPlWkqCagcYKLdCQa0CDJS1sKCWAQZKRVAqglIRlIqgVASlIigVQakISkVQKoJSEZSKoFQEfywq4vP5fDIL4QFM/YS3ZgtmFQAAAABJRU5ErkJggg==" />
                </a>
                </div>
                
                <div className="team-mate-contact">

                <a href="https://github.com/FreedomChaser" style={{marginBottom: '25px'}}>
                <img className="github-img" src={github} alt="Github link" />
                </a>

                <a href="https://www.linkedin.com/in/michelle-jones-dev/" style={{marginBottom: '25px'}}>
                <img className="linkedin-img" src={linkedin} alt="linkedin link" />
                </a>

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
                <p> Full stack web developer who enjoys learning new skills and finding elegant solutions to complex problems. I have experience developing in React, Node, SQL, and JavaScript. Always looking to grow and expand my knowledge base. </p>
                </div>
                <div className="portfolio">
                <a href="#"><p className="portfolio-text">My portfolio</p></a>
                </div>
                <div className="team-mate-email">
                <a href="mailto:jordantroysmithson@gmail.com?subject=Nice work on Checked!&body=Hello Jordan, %0D%0A%0D%0A We would like to extend an amazing job offer to you! %0D%0A%0D%0A">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD1SURBVGhD7ZlBDoIwFAW79RQe0et4F8/jIVxpi/5EYLQFWu0j/yWT0AkknTXB5/P55HbZCeG+E1AqglIRlIqgVASlIuEcub0JNdLdU8OwY0QtyALS3WdTCPoaMF2PQdmAU+TwfJyth6BcQLp7ahhevr4OPQWVBqS7p/dHH/cQtDTAGB2MfwStDTBQGr8I2hpgoJzSIqhWgIHyEzWCagcYKHOsCWoVYKAspTSoZYCBcim5IFqtAAPlWkqCagcYKLdCQa0CDJS1sKCWAQZKRVAqglIRlIqgVASlIigVQakISkVQKoJSEZSKoFQEfywq4vP5fDIL4QFM/YS3ZgtmFQAAAABJRU5ErkJggg==" />
                </a>
                </div>
                <div className="team-mate-contact">

                <a href="https://github.com/JordanOfTroy">
                <img className="github-img" src={github} alt="Github link" />
                </a>

                <a href="https://www.linkedin.com/in/jordan-smithson/">
                <img className="linkedin-img" src={linkedin} alt="linkedin link" />
                </a>

                </div>
                </div>
                </div>
                </div>
                </section>
                
            </section>
        )
    }
}