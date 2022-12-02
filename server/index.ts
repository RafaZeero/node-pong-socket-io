import { createServer } from 'http';
import { Server } from 'socket.io';

// Define constants
const PORT = 3000 as const;
const httpServer = createServer();

// Create Socket.io server with
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let readyPlayerCount = 0

//  Socket.io connection response
io.on('connection', socket => {
  console.log('a user connected', socket.id);

  // listening to "ready" event
  socket.on('ready', () => {
    console.log('Player ready', socket.id)

    readyPlayerCount++

    if (readyPlayerCount === 2) {
      // broadcast start game event!
      io.emit('startGame', socket.id)
    }
  })

  // listening to "paddleMove" event
  socket.on('paddleMove', (paddleData) => {
    socket.broadcast.emit('paddleMove', paddleData)
  })
});

// Running server
httpServer.listen(PORT);
console.log(`Listening on port ${PORT}`);
