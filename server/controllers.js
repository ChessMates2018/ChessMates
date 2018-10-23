const bcrypt = require('bcryptjs')
var session_id_count = 1

module.exports = {
    registerUser: (req, res) => {
        console.log(req.body)
        const { Firstname, Lastname, Email, Username, Password } = req.body
        const defaultRank = 1000
        const db = req.app.get('db')
        db.checkUsername({Username}).then(user => {
            if (user.length !== 0) {
                res.status(200).send('Username Taken. Try another.')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(Password, salt)
                

                db.registerUser(Username, hash, defaultRank, Firstname, Lastname, Email).then((user) => {
                    req.session.user.session_id = session_id_count
                    session_id_count++
                    req.session.user.user_id = user[0].user_id
                    req.session.user.username = user[0].username
                    // console.log('registered: ', req.session)
                    res.status(200).send(user[0])
                })
            }
        })
    },
    loginUser: (req, res) => {
        const { Username, Password } = req.body
        const db = req.app.get('db')
        db.checkUsername({Username}).then(user => {
            if (user.length !== 0) {
                const validPassword = bcrypt.compareSync(Password, user[0].Password)
                if (validPassword) {
                    req.session.user.session_id = session_id_count
                    session_id_count++
                    req.session.user = user[0]
                    req.session.user.username = user[0].username
                    res.status(200).send()
                } else {
                    res.status(200).send('Invalid Password')
                }
            } else {
                res.status(200).send('Username does not exist')
            }
        })
    },
    getUser: (req, res) => {
        let {username} = req.body
        const db = req.app.get('db')
        db.get_user({username}).then(user => {
        res.status(200).send(user)
        .catch(err => {
        console.log(err)
        res.status(500).send(err)
        })
        })
    },
    getOnlineUsers: (req, res) => {
        const db = req.app.get('db')
        db.get_online_users().then(users => {
        res.status(200).send(users)
        .catch(err => {
        console.log(err)
        res.status(500).send(err)
        })
        })
        },
    Logout: (req,res,next) => {

    }

}