const bcrypt = require('bcryptjs')
var session_id_count = 1

let {
DEVKEY
}= process.env

module.exports = {
    registerUser: (req, res) => {
        const { firstName, lastName, email, username, password } = req.body
        const defaultRank = 1000
        const defaultImg = null
        const defaultFriend = false
        const defaultOnline = false
        const defaultWins = 0
        const defaultLosses = 0
        const db = req.app.get('db')
        db.checkUsername([username]).then(user => {
            if (user[0]) {
                res.status(200).send('Username Taken. Try another.')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)
                db.registerUser(username, hash, defaultRank, defaultImg, email, firstName, lastName, defaultFriend, defaultOnline, defaultWins, defaultLosses).then((user) => {
                    req.session.user
                    req.session.user = user[0].username
                    req.session.user.session_id = session_id_count
                    session_id_count++
                    db.toggle_online(req.session.user)
                    res.status(200).send(user[0])
                })
            }
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },
    loginUser: (req, res) => {
        const { Username, Password } = req.body
        const db = req.app.get('db')
        db.checkUsername(Username).then(user => {
            if (user.length) { 
                const validPassword = bcrypt.compareSync(Password, user[0].password)
                if (validPassword) {
                    req.session.user = user[0].username
                    req.session.session_id = session_id_count
                    session_id_count++
                    db.toggle_online([Username])
                    res.sendStatus(200)
                } else {
                    res.status(200).send('Invalid Password')
                }
            } else {
                res.status(200).send('Username does not exist')
            }
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },
    guestLogin: (req,res) => {
        req.session.user = 'guest'
        res.sendStatus(200)
    },
    getUser: (req, res) => {
        let {user} = req.session
        if (user === 'guest'){
            res.status(200).send('guest')
        } else {
            const db = req.app.get('db')
            db.get_user({user}).then(currentUser => {
                res.status(200).send(currentUser)
            }).catch(err => {
                console.log(err)
                res.status(500).send(err)
            })
        }
    },
    getOnlineUsers: (req, res) => {
        const db = req.app.get('db')
        db.get_online_users().then(users => {
            res.status(200).send(users)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
            })
        },
    getLeaders: async (req, res) => {
        const db = req.app.get('db')
        let leaders = await db.leaderboard()
        res.status(200).send(leaders)
    },
    getMyGames: async (req, res) => {
        const db = req.app.get('db')
        let {user} = req.session
        let hardCode = 'Brady'
        let myGames = await db.my_games(hardCode)
        res.status(200).send(myGames)
    },
    logout: async (req, res) => {
        const {user} = req.session
        const db = req.app.get('db')
        let toggle = await db.toggle_offline([user])
        let order66 = await req.session.destroy()
        res.sendStatus(200)
    },
    checkUser: async (req, res) => {
        const db = req.app.get('db')
        let {user} = req.session
            if (user) {
                res.status(200).send(user)
            }
            else {
                res.sendStatus(401)
            }
    },
    gameMoves: (req, res) => {
        let {history} = req.body
        const db = req.app.get('db')
        db.update_moves([history]).then(
            res.sendStatus(200)
        )
    },

    gameNumber: async (req, res) => {
        const db = req.app.get('db')
        let number = await db.game_count()
        let gameId = Number(number[0].count)
        gameId++
        res.status(200).send({gameId})
    },

    joinArena: (req, res) => {
        let {username} = req.body
        const db = req.app.get('db')
        db.toggle_online(username).then(
        res.sendStatus(200)
        )
    },
    
    newGame: (req, res) => {
        const db = req.app.get('db')
        let {light, dark} = req.body
        db.new_game(light, dark).then(res.sendStatus(200))    
    },

    getPlayers: async (req, res) => {
        const db = req.app.get('db')
        let {roomId} = req.params
        let players = await db.player(roomId)
        res.status(200).send(players)
    },

    updateIcon: (req, res) => {
        let {val} = req.body
        const db = req.app.get('db'),
              username = req.session.user
        if(username === 'guest'){
            res.status(200).send('guest')
        } else {
        db.update_icon({val, username}).then(
            res.sendStatus(200)
        ).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
        }
    },
    order66: (req, res) => {
        let {roomId} = req.params
        const db = req.app.get('db')
        db.order66({roomId}).then(() => {
            res.sendStatus(200)
        }).catch(err => {
            console.log(err)
            res.status(200).send(err)
        })
    },

    getRatings: async (req,res) => {
        let playerRatingArray = [];
        const db = req.app.get('db')
        let {usernames} = req.params
        let usernameArray = usernames.split(',')
        let light = usernameArray[0]
        let dark = usernameArray[1]
        let lightRating = await db.getLightRating([light])
        let darkRating = await db.getDarkRating([dark])
        let playerLightRating = lightRating[0].rating
        let playerDarkRating = darkRating[0].rating
        playerRatingArray[0] = playerLightRating
        playerRatingArray[1] = playerDarkRating
        res.status(200).send(playerRatingArray) 
    },
    updateRating: (req, res) => {
        const db = req.app.get('db')
        let {eloGain, eloLost, winner, loser, win, loss} = req.body
        let username = req.session.user
        if (winner === username) {
            db.update_rating([eloGain, eloLost, winner, loser, win, loss]).then(() => {
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        })} else if (winner === "Computer"){
            db.update_rating([eloGain, eloLost, winner, loser, win, loss]).then(() => {
                res.sendStatus(200)
            })
            .catch(err => {
                console.log(err)
                res.status(500).send(err)
        })}
    },
    updateRatingsDraw: (req,res) => {
        const db = req.app.get('db')
        let{lightEloDraw, darkEloDraw, light, dark} = req.body
        db.update_rating_draw([lightEloDraw, darkEloDraw, light, dark]).then(() => {
            res.sendStatus(200)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    }
}