const {randomizePlayerStart} = require('./logic')

describe('randomizes which player plays light or dark', () => {
    test('challenged, and challenger are truthy', () => {
        expect(randomizePlayerStart('harry', 'bob')).toBeTruthy()
    })
//     test('challenger is truthy', () => {
//         expect(randomizePlayerStart('harry', challenger)).toBeTruthy()
//     })
//     test('randoCalrizian is correctly assigned a value between 0 and 1', () => {
//         expect(randoCalrizian > 0 && randoCalrizian < 1).toBe(true)
//     })
//     test('challenged gets assigned dark if challenger is light', () => {
//         expect(randomizePlayerStart('harry', 'bob')
//         )}).toEql(lightPlayer === challenger && darkPlayer === challenged)
//     // test('challenged gets assigned light if challenger is dark', () => {
//     //     expect(light === challenged && dark === challenger)
//     // }).toBe(true)
   
//     test('challenger is assigned as dark if value is less than .6', (randoCalrizian) => {
//         randoCalrizian < .6 ? dark === challenger: light === challenger
//     }).toBe(true)
// //     test('challenger is assigned as light if value is greater than .6', () => {})
})