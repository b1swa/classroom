const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const PORT = process.env.PORT || 8000;

const router = require('./router');
const { addUser, removeUser, getUsersInRoom } = require('./user');
const { startClass, endClass, getClass } = require('./class');
const {addLog} = require('./log');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {

    socket.on('join', ({name, room, role}, callback)=>{

        if(role === 'student' && getClass(room) === 'end'){
            return callback('Class has not started')
        }

        addLog(room, `name(${role}) has joined`, new Date());

        const { error, user} = addUser({id : socket.id, name, room, role});

        if(error) return callback({staus: 'error', msg: error});
        
        socket.emit('message', { user: "admin", text: `${user.name} Welcome to ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined`});
        
        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        
    });

    socket.on('startClass', ({room})=>{
        addLog(room, "Class has started", new Date());
    });

    socket.on('endClass', ({room})=>{
        addLog(room, "Class has ended", new Date());
    });

    socket.on('disconnect', ()=>{
        console.log('disconnect');
        const user = removeUser(socket.id);
        if(user){
            addLog(user.room, `name(${user.role}) has left`, new Date());
        }
    });
    
})

app.use(router);
app.use(cors());

server.listen(PORT, ()=>{
    console.log(`Server has started on port ${PORT}`);
})