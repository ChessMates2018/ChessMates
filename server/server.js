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
        console.log(player, 'is this firing')
        io.sockets.emit('is online', player)
    })

    socket.on("general-chat", data=>{
        io.sockets.emit("general-message", data)
    })

    socket.on('new-game', (data) => {
        socket.join(data.room)
        io.to(data.room).emit('game joined', data.room)
    })

    socket.on('resign', (resign) => {
        // console.log('resign', resign.room, resign.username) 
        //sends to all client in game1. Both parties are notified of who is resigning.
        io.to(resign.room).emit('resign', resign.username)
    })

    socket.on('draw', (room) => {
        //draw_offer is sent from sender client to receiving client to either be confirmed or rejected.
        socket.broadcast.to(room).emit('draw')
    })

    socket.on('drawAccepted', (room) => {
        //draw has been accepted.  Will trigger endGameModal for both clients with draw results.
        io.to(room).emit('drawAccept')
    })

    socket.on('drawDeclined', (room) => {
        //draw has been declined.  Will trigger response Modal for receiving client and reset state so draw can be sent again.
        socket.broadcast.to(room).emit('drawDecline')
    })

    socket.on('new player', function() {
        // console.log('message recieved')
        io.emit('player joined', {name: player.name, room: player.room})
    })

    socket.on('challenge initiated', (challenged, gameId, challenger) => {
        io.emit('push to board', {challenged, gameId, challenger})
    })


    socket.on('clickMove', (clickMove) => {
        // console.log('clickMove has fired', clickMove.room)
       // sends move via click function to receiving client side.
        socket.broadcast.to(clickMove.room).emit('update-history', clickMove)
    })

    socket.on('move', (newMove) => {
        // console.log(newMove.room)
      // sends move via onDrop function to receiving client side.
        socket.broadcast.to(newMove.room).emit('update-game', newMove)
    })

    // // 2/23/19 - I'm not sure this is doing anything. Probably could be removed.
    // socket.on('toggleTurn', (toggleTurn) => {
    //     console.log("toggleTurn")
    //     //add change turn to = true add to emit?
    //     socket.broadcast.to('game1').emit('update-turn', toggleTurn)
    // })
    
    socket.on('disconnect', () => console.log('User has peaced out, yo!', socket.id))

    socket.on('connect', () => {
        let roomId = socket.id
      })
})


server.listen(SERVER_PORT, () => console.log(`spellbound on port ${SERVER_PORT}`))

massive(CONNECTION_STRING).then(db => app.set('db', db))