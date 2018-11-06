import axios from 'axios'

function randomizePlayerStart(challenger, challenged) {
    let randoCalrizian = Math.random()
    let lightPlayer = ''
    let darkPlayer = ''
    if (randoCalrizian >= .6) {
        lightPlayer = challenger
        darkPlayer = challenged
    } else {
        lightPlayer = challenged
        darkPlayer = challenger
    }

    return (lightPlayer, darkPlayer)
}


export function login(username, password){
    
    axios.post('/api/login', { username, password }).then((res) => {
        console.log('look here',res.data)
        if (res.data === 'Invalid Password') {
            return res.data
        } else if (res.data === 'Username does not exist') {
            return res.data
        } else {
            console.log(this.props)
            return "this.props.history.push('/profile')"
        }
    })
}


   

