const JordanTestData = require('./Jordan_mocks.json')

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
    
    


   

