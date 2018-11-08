const {login}  = require('./logic')

describe('testing Login method on Landing.js', () => {
  test('returns correct user info upon login', () => {
    expect(login('Rook', 'password')).toEqual("Rook")
  })
  test('does NOT return password', () => {
    expect(login('Rook', 'password').password).toBeFalsy()
  })
  test('will ask for correct login', () => {
    expect(login({},{})).toEqual('Please enter correct login info')
  })
  test('will ask for password', () => {
    expect(login('Rook', '')).toEqual('Please enter password.')
  })
  test('will ask for username', () => {
    expect(login('', 'password')).toEqual('Please enter username.')
  })
})