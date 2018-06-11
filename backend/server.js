const express = require('express');
const app = express();
const PORT = 8083;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }); 

app.use(express.static('public'));
app.use(express.static('/node_modules/bootstrap/dist'));

let connectedUsers = []; // This array will store the list of connected users.
let manager = {}; // this is the speaker variable
let pageTitle = 'Pollz for Teamz';
console.log(pageTitle)

const server = app.listen(PORT, () => {
    console.log(`server alive on ${PORT}`)
});

const io = require('socket.io').listen(server); //socket.io listens at the express server port

io.on('connection', (socket) => {
    socket.once('disconnected', () => {
       connectedUsers.splice(connectedUsers.indexOf(socket), 1);
       //This gives us the index of the current socket and then will remove it.
       // So the disconnected user is no longer part of list?
        socket.on('start', (data) => {
            manager.name = data.name;
            manager.id = this.id;
            this.emit('joined', manager);
            console.log(`Poll started by ${manager.name}`)
        })

       socket.emit('welcome', () => { // emit is used to send a message to the client
           title: pageTitle
       });

       socket.disconnect();
       console.log(`You've been disconnected!`)
    })

    connectedUsers.push(socket) // When a connection happens on the front-end, I want to add them into my list of arrays.
    console.log(`Connected:`, connectedUsers.length);
    // console.log(connectedUsers)
}); // when a socket connection happens,  log the id.