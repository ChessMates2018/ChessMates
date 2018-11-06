const JordanTestData = require('./Jordan_mocks.json')

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
    let data = JordanTestData[0]
    if (data.username === username && data.password === password) {
        return data.username
    } else if (typeof username !== 'string' || typeof password !== 'string') {
        return 'Please enter correct login info'
    } else if (data.username === username && password === '') {
        return 'Please enter password.'
    } else if (username === '' && data.password === password) {
        return 'Please enter username.'
    }

}
    
    


   

