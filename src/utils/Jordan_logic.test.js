const {login}  = require('./logic')

RTCSessionDescription('user can login and is routed to their profile page', () => {
  test('returns correct user info upon login', () => {
    expect(login('Rook', 'password')).toBe()
  })
  test('Only returns one user upon login', () => {
    expect(login('Rook', 'password').length).toBe(1)
  })
  test('returns message if wrong password entered', () => {
    expect(login('Rook', 'oops wrong password')).toBe('Invalid Password')
  })
  test('returns message if wrong username entered', () => {
    expect(login('oops wrong username', 'password')).toBe('Username does not exist')
  })
  test('does not return password', () => {
    expect(login('Rook', 'password').password).toNotBe(true)
  })  
})