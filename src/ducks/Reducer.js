const initialState = {
  username: '',
  SAN: []
}

const SET_USERNAME = 'SET_USERNAME',
      SET_SAN = 'SET_SAN'



export function setUsername (username) {
  return {
    type: SET_USERNAME,
    payload: username

  }
}

function Reducer (state = initialState, action) {
  switch(action.type) {

    case SET_USERNAME:
      return Object.assign({}, state, {username: action.payload})
    
    
    default: return state
  }
}

export default Reducer