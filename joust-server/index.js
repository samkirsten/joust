let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {
    socket.on('disconnect', function () {
        io.emit('users-changed', {user: socket.nickname, event: 'left'});
    });

    socket.on('set-nickname', (nickname) => {
        socket.nickname = nickname;
        io.emit('users-changed', {user: nickname, event: 'joined'});
    });

    socket.on('add-message', (message) => {
        io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});
    });

    socket.on('start-game', (command) => {
        io.emit('');
    });

    socket.on('join-game', function (data) {
        socket.join(data.room);
        //socket.broadcast.to(data.room).emit('player-joined', data.user);
        io.to(data.room).emit('player-joined', data.user);
        console.log('game-joined' + data.room + data.user);
    });

    socket.on('create-game', function (data) {
        socket.join(data.room);
        console.log('game-created' + data.room);
    });

    socket.on('start-game', function (data) {
       io.to(data.room).emit('game-started');
    });

    socket.on('user-moved', function (data) {
       io.to(data.room).emit('player-out', data.user);
    });

    socket.on('game-end', function (data) {
        io.to(data.room).emit('game-over', data.results);
    });

});




var port = process.env.PORT || 3001;

http.listen(port, function () {
    console.log('listening in http://localhost:' + port);
});