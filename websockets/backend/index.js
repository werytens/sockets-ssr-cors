const express = require('express')
const port = 4000
const cors = require('cors')
const { Server } = require('socket.io')
const { createServer } = require('node:http')

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
})

app.use(cors({ origin: true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//* Минусы сокетов
// Необходимо оптимизировать в больших приложениях
// WebSockets не оптимизированы для потоковой передачи аудио-и видеоданных (но можно переделать в блоб)
// Если сокетов несколько - работать с ними сложно
// Использование вебсокетов требует от разработчиков более глубокого понимания 
// асинхронного программирования и работы с сетевыми протоколами.
// Вебсокеты открывают новые возможности для атак, таких как атаки типа DOS через открытые соединения.
io.on('connection', (socket) => {
    console.log('a user connected')

    io.emit(
        'clientsData',
        JSON.stringify(Object.keys(io.sockets.server.eio.clients))
    )

    io.emit('chat message', socket.client.id + ' connected')

    socket.on('disconnect', () => {
        console.log('user disconnected')
        io.emit(
            'clientsData',
            JSON.stringify(Object.keys(io.sockets.server.eio.clients))
        )
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })
})

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
