
    export function randomizePlayerStart(challenger, challenged){
        let randoCalrizian = .7
        // let randoCalrizian = Math.random()
        let lightPlayer = ''
        let darkPlayer = ''
        if(randoCalrizian >= .6){
            lightPlayer = challenger
            darkPlayer = challenged
        }else{
            lightPlayer = challenged
            darkPlayer = challenger
        }
return ({lightPlayer, darkPlayer, randoCalrizian})
// return true
}


export function login(username, password){
    
    axios.post('/api/login', { Username, Password }).then((res) => {
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


   

