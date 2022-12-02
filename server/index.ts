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

//  Socket.io connection response
io.on('connection', socket => {
  console.log('a user connected', socket.id);
});

// Running server
httpServer.listen(PORT);
console.log(`Listening on port ${PORT}`);
