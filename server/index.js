import { createServer } from 'http';
import { Server } from 'socket.io';
import { api } from './api.js';

// Define constants
const PORT = 3000;
const httpServer = createServer(api);

// Create Socket.io server with
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let readyPlayerCount = 0;

//  Socket.io connection response
io.on('connection', socket => {
  console.log('a user connected', socket.id);

  // listening to "ready" event
  socket.on('ready', () => {
    console.log('Player ready', socket.id);

    readyPlayerCount++;

    // always start gane when two players are online
    if (readyPlayerCount % 2 === 0) {
      // broadcast start game event!
      io.emit('startGame', socket.id);
    }
  });

  // listening to "paddleMove" event
  socket.on('paddleMove', paddleData => {
    socket.broadcast.emit('paddleMove', paddleData);
  });

  // listening to "ballMove" event
  socket.on('ballMove', ballData => {
    socket.broadcast.emit('ballMove', ballData);
  });

  socket.on('disconnect', reason => {
    console.log(`Client ${socket.id} disconnected: ${reason}`);
  });
});

// Running server
httpServer.listen(PORT);
console.log(`Listening on port ${PORT}`);