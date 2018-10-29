const bcrypt = require('bcryptjs')
var session_id_count = 1

let {
DEVKEY
}= process.env

module.exports = {
    registerUser: (req, res) => {
        const { FirstName, LastName, Email, Username, Password } = req.body
        const defaultRank = 1000
        const defaultImg = null
        const defaultFriend = false
        const defaultOnline = false
        const defaultWins = 0
        const defaultLosses = 0
        const db = req.app.get('db')
        db.checkUsername({Username}).then(user => {
            if (user.length !== 0) {
                res.status(200).send('Username Taken. Try another.')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(Password, salt)

                db.registerUser(Username, hash, defaultRank, defaultImg, Email, FirstName, LastName, defaultFriend, defaultOnline, defaultWins, defaultLosses).then((user) => {
                    req.session.user
                    req.session.user = user[0].username
                    req.session.user.session_id = session_id_count
                    session_id_count++
                    db.toggle_online()
                    res.status(200).send(user[0])
                })
            }
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
                    req.session.user.session_id = session_id_count
                    session_id_count++
                    db.toggle_online([Username])
                    res.sendStatus(200)
                } else {
                    res.status(200).send('Invalid Password')
                }
            } else {
                res.status(200).send('Username does not exist')
            }
        })
    },
    getUser: (req, res) => {
        // console.log('IVE BEEN HIT!')
        let {user} = req.session
        // console.log('session user', req.session)
        const db = req.app.get('db')
        db.get_user({user}).then(currentUser => {
        // console.log('currentUser', currentUser)
        res.status(200).send(currentUser)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
            })
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
        // console.log('look here stupit!',user)
        let myGames = await db.my_games(user)
        res.status(200).send(myGames)
    },
    logout: async (req, res) => {
        const {user} = req.session
        const db = req.app.get('db')
        let toggle = await db.toggle_online([user])
        let order66 = await req.session.destroy()
        res.sendStatus(200)
    },
    checkUser: async (req, res) => {
        console.log('checkUser has Fired!')
        const db = req.app.get('db')
        let {user} = req.session

        // if (DEVKEY === 'true') {
        //     let user = await db.get_user('Knight')
        //     req.session.user = user[0].username
        //     res.status(200).send(user)
        // }
        // else {
            if (req.session.user) {
                res.status(200).send(user)
            }
            else {
                res.sendStatus(401)
            }
        // }
    },
    gameMoves: (req, res) => {
        let {history} = req.body
        const db = req.app.get('db')
        // console.log('movesFire', history)

        db.update_moves([history]).then(
            res.sendStatus(200)
        )
    },

    gameNumber: async (req, res) => {
        const db = req.app.get('db')
        let number = await db.game_count()
        number ++
        res.status(200).send({number})
    }
}