require('dotenv').config()
const express = require('express')
const session = require('express-session')
const axios = require('axios')
const massive = require('massive')
const bodyParser = require('body-parser')
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_TEST_SECRET)

const app = express()
app.use(bodyParser.json())

const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET,
    DEV_KEY,
    // PROTOCOL
} = process.env

app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
})

// app.get('/api/logout', (req, res) => {
//     req.session.destroy()
// })


app.listen(SERVER_PORT, () => {
    console.log(`spellbound on port ${SERVER_PORT}`)
})