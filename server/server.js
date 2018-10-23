require('dotenv').config()
const express = require('express')
const session = require('express-session')
const axios = require('axios')
const massive = require('massive')
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.json())

const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET,
    DEV_KEY,
    // PROTOCOL
} = process.env

// app.use(session({
//     secret: SESSION_SECRET,
//     saveUninitialized: false,
//     resave: false
// }))

// app.use((req,res,next) => {
//     if (ENVIRONMENT === 'dev') {
//         req.app.get('db').set_data()
//         .then(userData => {
//             req.session.user = userData[0]
//             next()
//         })
//     } else {
//         next()
//     }
// })

// massive(CONNECTION_STRING).then(db => {
//     app.set('db', db)
// })

// app.get('/api/logout', (req, res) => {
//     req.session.destroy()
// })


app.listen(SERVER_PORT, () => {
    console.log(`spellbound on port ${SERVER_PORT}`)
})