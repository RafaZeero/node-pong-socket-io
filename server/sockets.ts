import { Server } from "socket.io";

let readyPlayerCount = 0

export function listen(io: Server) {
  //  Socket.io connection response
  io.on('connection', (socket: any) => {
    console.log('a user connected', socket.id);

    // listening to "ready" event
    socket.on('ready', () => {
      console.log('Player ready', socket.id)

      readyPlayerCount++

      // always start gane when two players are online
      if (readyPlayerCount % 2 === 0) {
        // broadcast start game event!
        io.emit('startGame', socket.id)
      }
    })

    // listening to "paddleMove" event
    socket.on('paddleMove', (paddleData: any) => {
      socket.broadcast.emit('paddleMove', paddleData)
    })

    // listening to "ballMove" event
    socket.on('ballMove', (ballData: any) => {
      socket.broadcast.emit('ballMove', ballData)
    })

    socket.on('disconnect', (reason: any) => {
      console.log(`Client ${socket.id} disconnected: ${reason}`)
    })
  });
}