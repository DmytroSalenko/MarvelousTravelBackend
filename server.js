// to switch back to fastify change reply.send back to return statement
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(bodyParser.json());

// SET STORAGE for file upload
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let user_id = req.params.id;
        let images_path = path.join(__dirname, 'api/resources/image');
        let destionation_path = path.join(images_path, user_id);
        if (!fs.existsSync(destionation_path)) {
            fs.mkdirSync(destionation_path)
        }
        cb(null, destionation_path);
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
set_routes(app, upload);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
