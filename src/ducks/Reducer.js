const initialState = {
  username: '',
  light:{},
  dark: {}
}

const SET_USERNAME = 'SET_USERNAME',
      SET_LIGHT_PLAYER = `SET_LIGHT_PLAYER`,
      SET_DARK_PLAYER = `SET_DARK_PLAYER`
     



export function setUsername (username) {
  return {
    type: SET_USERNAME,
    payload: username

  }
}

export function setLightPlayer (userInfo_Light) {
  return {
    type: SET_LIGHT_PLAYER,
    payload: userInfo_Light
  }
}

export function setDarkPlayer (userInfo_Dark) {
  return {
    type: SET_DARK_PLAYER,
    payload: userInfo_Dark
  }
}

function Reducer (state = initialState, action) {
  switch(action.type) {
    case SET_USERNAME:
      return Object.assign({}, state, {username: action.payload})

    case SET_LIGHT_PLAYER:
      return Object.assign({}, state, {light: action.payload})
      
    case SET_DARK_PLAYER:
      return Object.assign({}, state, {dark: action.payload})
    
    default: return state
  }
}

export default Reducer