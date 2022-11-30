import http from 'http'
import { Server } from 'socket.io'

const io = new Server()

const PORT = 3000
const server = http.createServer()


server.on('request', (req, res) => {
  res.write(`
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pong Clone</title>
    <link rel="icon" type="image/png" href="https://s2.googleusercontent.com/s2/favicons?domain=www.jacinto.design">
</head>
<body>
  HELOO
    <!-- Script -->
</body>
</html>

  `)
})

server.listen(PORT)
console.log(`Listening on port ${PORT}`)

io.on('connection', (socket) => {
  console.log('a user connected')
})