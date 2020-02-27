// to switch back to fastify change reply.send back to return statement
const mongoose = require('mongoose');
const express = require('express'); //
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(bodyParser.json());
//
const http = require('http').createServer(app);
const io = require('socket.io')(http);
// index.html
app.use(express.static(__dirname + '/api'));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(clientSocket) {
    console.log('a user is connected');

    clientSocket.on('join', function(data) {
        clientSocket.emit('messages', 'Hello from server join emit');
    });

    clientSocket.on('messages', function(data) {
        clientSocket.emit('broad', data);
        clientSocket.broadcast.emit('broad',data);
    });

});


const MONGO_URI = 'mongodb+srv://dsalenko:hC8fxXdbJqGQ2n1f@cluster0-xoxyn.mongodb.net/test?retryWrites=true&w=majority';
if (!MONGO_URI) {
    throw new Error('You must provide a MongoLab URI');
}

// Connect to DB
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const set_routes = require('./api/routes');
set_routes(app, io);

//app.listen(port, () => console.log(`Example app listening on port ${port}!`));
http.listen(3000);