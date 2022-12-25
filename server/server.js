require('dotenv').config()
const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET,
    DEV_KEY,
    ENVIRONMENT,
    HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PW
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

app.use( express.static( `${__dirname}/../build` ) );

app.use(bodyParser.json())

app.use(session)

// User Endpoints
app.get(`/api/user`, ctrl.getUser)
app.get(`/api/guestLogin`, ctrl.guestLogin)
app.get('/api/leaderboard', ctrl.getLeaders)
app.get(`/api/loggedin`, ctrl.getOnlineUsers)
app.get('/api/myGames', ctrl.getMyGames)
app.get(`/api/checkuser`, ctrl.checkUser)
app.get(`/api/gameNumber`, ctrl.gameNumber)
app.get('/api/getPlayers/:roomId', ctrl.getPlayers)
app.get('/api/getRatings/:usernames', ctrl.getRatings)

app.post('/api/register', ctrl.registerUser)
app.post('/api/login', ctrl.loginUser)
app.post('/api/logout', ctrl.logout)
app.post('/api/gameMoves', ctrl.gameMoves)
app.post('/api/newGameHistory', ctrl.newGame)

app.put('/api/joinArena', ctrl.joinArena)
app.put(`/api/user/`, ctrl.updateIcon)
app.put(`/api/updateRating/`, ctrl.updateRating)
app.put(`/api/updateRatingsDraw/`, ctrl.updateRatingsDraw)

app.delete(`/api/order66/:roomId`, ctrl.order66)

// Sockets
io.on('connection', function(socket){
    socket.on("login", player => {
        io.sockets.emit('is online', player)
    })

    socket.on("logout", message => {
        io.sockets.emit('is offline', message)
    })

    socket.on("general-chat", data=>{
        io.sockets.emit("general-message", data)
    })

    socket.on('new-game', (data) => {
        socket.join(data.room)
        io.to(data.room).emit('game joined', data.room)
    })

    socket.on('resign', (resign) => {
        io.to(resign.room).emit('resign', resign.username)
    })

    socket.on('draw', (room) => {
        socket.broadcast.to(room).emit('draw')
    })

    socket.on('drawAccepted', (room) => {
        io.to(room).emit('drawAccept')
    })

    socket.on('drawDeclined', (room) => {
        socket.broadcast.to(room).emit('drawDecline')
    })

    socket.on('new player', function() {
        io.emit('player joined', {name: player.name, room: player.room})
    })

    socket.on('challenge initiated', (challenged, gameId, challenger) => {
        io.emit('push to board', {challenged, gameId, challenger})
    })

    socket.on('clickMove', (clickMove) => {
        socket.broadcast.to(clickMove.room).emit('update-history', clickMove)
    })

    socket.on('move', (newMove) => {
        socket.broadcast.to(newMove.room).emit('update-game', newMove)
    })
    
    socket.on('disconnect', (data) => {
        console.log('User has peaced out, yo!', socket.id)
    })

    socket.on('connect', (data) => {
        let roomId = socket.id
      })
})

server.listen(SERVER_PORT, () => console.log(`spellbound on port ${SERVER_PORT}`))

massive({
    host: HOST,
    port: DB_PORT,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PW,
    ssl: false,
    poolSize: 10
}).then(db => {
    app.set('db', db)
}).catch(e => {
    console.error(e)
})