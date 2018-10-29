require('dotenv').config()
const express = require('express')
const session = require('express-session')
const axios = require('axios')
const massive = require('massive')
const bodyParser = require('body-parser')
const ctrl = require('./controllers')
const app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)


app.use(bodyParser.json())


const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET,
    DEV_KEY,
    ENVIRONMENT
    // PROTOCOL
} = process.env

app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}))

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






// User Endpoints
app.get(`/api/user`, ctrl.getUser)
app.get('/api/leaderboard', ctrl.getLeaders)
app.get(`/api/loggedin`, ctrl.getOnlineUsers)
app.get('/api/myGames', ctrl.getMyGames)
app.get(`/api/checkuser`, ctrl.checkUser)
app.get(`/api/gameNumber`, ctrl.gameNumber)

app.post('/api/register', ctrl.registerUser)
app.post('/api/login', ctrl.loginUser)
app.post('/api/logout', ctrl.logout)
app.post('/api/gameMoves', ctrl.gameMoves)


io.on('connection', function(socket){
    console.log('user connected')

    socket.on('back end test', () => {
        console.log('back end has been hit!')
        io.emit('test')
    })

    socket.on('new player', function() {
        console.log('message recieved')
        io.emit('player joined', {name: player.name, room: player.room})
    })

    socket.on('disconnect', () => console.log('User has peaced out, yo!'))

    // socket.on('move', (msg) => this.socket.broadcast.emit('move', msg))
    socket.on('move', (newMove) => {
        console.log('you made a move')
        io.emit('update-game',newMove)
    })
})

// io = io.listen(server)

// io.sockets.on("connection", function(socket) {
//     socket.on("room", function (room) {
//         socket.join(room)
//     })
// })


server.listen(SERVER_PORT, () => console.log(`spellbound on port ${SERVER_PORT}`))

// app.listen(SERVER_PORT, () => {
//     console.log(`spellbound on port ${SERVER_PORT}`)
// })

massive(CONNECTION_STRING).then(db => app.set('db', db))