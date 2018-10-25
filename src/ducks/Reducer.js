const initialState = {
  username: ''
}

const SET_USERNAME = 'SET_USERNAME'


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