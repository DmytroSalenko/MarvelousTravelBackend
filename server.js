// to switch back to fastify change reply.send back to return statement
const mongoose = require('mongoose');
const express = require('express'); //
const bodyParser = require('body-parser');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;



process.env.serverAddress = 'localhost';
process.env.serverPort = 3000;

const app = express();

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

// SET STORAGE for file upload
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let user_id = req.params.id;
        // let images_path = path.join(__dirname, 'api/resources/image');
        // let destination_path = path.join(images_path, user_id);
        let destination_path = path.join('api/resources/image', user_id);
        if (!fs.existsSync(destination_path)) {
            fs.mkdirSync(destination_path)
        }
        cb(null, destination_path);
    },
    filename: function (req, file, cb) {
        let extension = path.extname(file.originalname);
        let user_id = req.params.id;
        cb(null, user_id + '_' + Date.now() + extension)
    }
});
const upload = multer({ storage: storage });

const MONGO_URI = 'mongodb+srv://dsalenko:hC8fxXdbJqGQ2n1f@cluster0-xoxyn.mongodb.net/test?retryWrites=true&w=majority';
if (!MONGO_URI) {
    throw new Error('You must provide a MongoLab URI');
}

// Connect to DB
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const set_routes = require('./api/routes');

set_routes(app, upload, io);

//app.listen(port, () => console.log(`Example app listening on port ${port}!`));
http.listen(process.env.serverPort, process.env.serverAddress);