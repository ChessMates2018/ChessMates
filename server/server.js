require('dotenv').config()

const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET,
    DEV_KEY,
    ENVIRONMENT
    // PROTOCOL
} = process.env

const express = require('express')
const session = require('express-session')({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
})
const axios = require('axios')
const massive = require('massive')
const bodyParser = require('body-parser')
const ctrl = require('./controllers')
const app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)
var sharedSession = require('express-socket.io-session')
// var cookieParser = require('cookie-parser')

app.use(bodyParser.json())

app.use(session)

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
app.post('/api/newGameHistory', ctrl.newGame)
app.put('/api/joinArena', ctrl.joinArena)

io.use(sharedSession(session,{
    autoSave: true
}))

io.on('connection', function(socket){
    console.log('user connected', socket.id)

    socket.on('login', (user) => {
        let socket_id = socket.id
        socket.handshake.session.socket_id = socket_id
        socket.handshake.session.user = user
        socket.handshake.session.save() 
    })

    socket.on('new-game', () => {
        socket.join('game1')
        console.log('joined game1')
        // .clients((error, clients) => {
        //     if (error) throw error
        //     console.log(clients)
        // }) 
    })
    //io.to(uniqueid).emit()
    socket.on('back end test', () => {
        // console.log('back end has been hit!')
        io.emit('test')
    })

    socket.on('new player', function() {
        // console.log('message recieved')
        io.emit('player joined', {name: player.name, room: player.room})
    })

    socket.on('challenge initiated', (challenged, gameId, challenger) => {
        console.log('challenge accepted')
        io.emit('push to board', {challenged, gameId, challenger})
    })

    // socket.on('move', (msg) => this.socket.broadcast.emit('move', msg))
    socket.on('move', (newMove) => {
        console.log('you made a move')
        //add change turn to = true add to emit?
        io.to('game1').emit('update-game',newMove)
        console.log('messange sent game1', newMove)
    })
    
    socket.on('disconnect', () => console.log('User has peaced out, yo!', socket.id))

    socket.on('connect', () => {
        let roomId = socket.id
        console.log("LOOK HERE", roomId)
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