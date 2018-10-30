const initialState = {
  username: '',
  light:{},
  dark: {},
  roomId: ''
}

const SET_USERNAME = 'SET_USERNAME',
      SET_LIGHT_PLAYER = `SET_LIGHT_PLAYER`,
      SET_DARK_PLAYER = `SET_DARK_PLAYER`,
      SET_ROOMID = 'SET_ROOMID'
     



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

export function setRoomId (roomId) {
  return {
    type: SET_ROOMID,
    payload: roomId
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

    case SET_ROOMID:
      return Object.assign({}, state, {roomId: action.payload})
    
    default: return state
  }
}

export default Reducer