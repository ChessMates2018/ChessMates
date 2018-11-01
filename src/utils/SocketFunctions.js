import io from 'socket.io-client'

export const socket = io()
  
   export function login(username) {
    socket.emit(`login`, username)
  }

