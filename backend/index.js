
const express = require('express')
const app = express();
const http = require('http');
const path = require('path')

const httpserver = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpserver);


app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
  });

io.on('connection',(socket)=>{
    console.log('a user is connected ',socket.id)

    socket.on('chatroom',(msg)=>{
        console.log('typing '+msg)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
})

httpserver.listen(5100,()=>{
    console.log('server active on 5100')
})