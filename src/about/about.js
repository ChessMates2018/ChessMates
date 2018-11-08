import React, {Component} from 'react'
import BradyPic from '../images/posingwithPoe.jpg'
import JordanPic from '../images/Jordan-headshot.jpg'
import MichellePic from '../images/Michelle_profile.jpg'

export default class About extends Component{
    render(){
        return(
            <section id="about-page">
            <div id="about-checked">
            <h1>About Checked</h1>
            <p>Checked is a web-based chess application where users can create an account and casually play their friends, or other users of the site, in real-time. This project was built in React and styled with SASS, uses BCrypt for authorization, and the backend was built with Express, Massive, PostgreSQL,and Socket.io. </p>
            </div>


            <section id="team-mate-section">
            <div class="card-container">
                <div class="card">
                <div class="side">
                <img className="team-mate-img" src={BradyPic} alt="Brady Snuggs" />
                <h2>Brady Snuggs</h2>
                <h3>Co-Developer</h3>
                </div>
                <div class="side back">
                <p>A full stack web developer, chess enthusiast, FAA certified drone pilot, and musician, who enjoys working collaboratively to tackle complex problems. </p>
                <p>Github</p>
                <p>Linkedin</p>
                <p>Email</p>
                </div>
                </div>
                </div>

                <div class="card-container">
                <div class="card">
                <div class="side">
                <img className="team-mate-img" src={MichellePic} alt="Michelle Jones" />
                <h2>Michelle Jones</h2>
                <h3>Co-Developer</h3>
                </div>
                <div class="side back">
                <p>A full stack web developer and many other things! data data data data data data data data data data data data data data data data data data data data data. </p>
                <p>Github</p>
                <p>Linkedin</p>
                <p>Email</p>
                </div>
                </div>
                </div>

                <div class="card-container">
                <div class="card">
                <div class="side">
                <img className="team-mate-img" src={JordanPic} alt="Jordan Smithson" />
                <h2>Jordan Smithson</h2>
                <h3>Co-Developer</h3>
                </div>
                <div class="side back">
                <p>A full stack web developer and many other things! data data data data data data data data data data data data data data data data data data data data data. </p>
                <p>Github</p>
                <p>Linkedin</p>
                <p>Email</p>
                </div>
                </div>
                </div>



                {/* <div className="team-mate-div" ontouchstart="this.classList.toggle('hover');">
                    <div className="flipper">
                        <div className="front">
                    <img className="team-mate-img" src={BradyPic} alt='Brady posing with Edgar Allen Poe cutout'/>
                    <h2 className="team-mate-name">Brady Snuggs</h2>
                    <h4 className="team-mate-title">Co-Developer</h4>
                        </div>

                        <div className="back">
                            <div className="team-mate-bio">
                    <p>A full stack web developer, chess enthusiast, FAA certified drone pilot, and musician, who enjoys working collaboratively to tackle complex problems. </p>
                            </div>
                        <div className="team-mate-contact">
                        <p>github</p>
                        <p>linkedin</p>
                        <p>email</p>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="team-mate-div">
                    <img className="team-mate-img" src='' alt=''/>
                    <h2 className="team-mate-name">Michelle Jones</h2>
                    <p>This is some dummy data. sdofijsodfijsdfsdofij sdfoisjdfosidjf.s sdofijsdofijsdfoisjdf. sdofijosidfjosdi. sdofisodifjsoidfjsodifjsdf. sdofisdjfoijoijsoidfj.</p>
                </div>


                <div className="team-mate-div">
                    <img className="team-mate-img" src='' alt=''/>
                    <h2 className="team-mate-name">Jordan Smithson</h2>
                    <p>This is dummy data. sdfoijsdfoisjdfoi,k sdflisjdflisdfj lkjdsflskdf. sdfijosidfjsdf. wefwoeifjsdf,. wefihsoifosdifsdf. wefiojoijsdf.</p>
                </div> */}
                </section>

                
                
            </section>
        )
    }
}