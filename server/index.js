import { createServer } from 'http';
import { Server } from 'socket.io';
import { api } from './api.js';
import { listen } from './sockets.js';

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

// Running server
httpServer.listen(PORT);
console.log(`Listening on port ${PORT}`);

listen(io);
