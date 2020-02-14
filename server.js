// to switch back to fastify change reply.send back to return statement
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

app.use(bodyParser.json());


const MONGO_URI = 'mongodb+srv://dsalenko:hC8fxXdbJqGQ2n1f@cluster0-xoxyn.mongodb.net/test?retryWrites=true&w=majority';
if (!MONGO_URI) {
    throw new Error('You must provide a MongoLab URI');
}

// Connect to DB
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const set_routes = require('./api/routes');
set_routes(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
