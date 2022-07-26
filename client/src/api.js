import io from 'socket.io-client'

export const api = 'http://0.0.0.0:8001'

export const socket = io.connect(api)
