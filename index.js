const mongoose = require('mongoose');
const routes = require('./api/routes');
// Import Swagger Options
const swagger = require('./api/config/swagger');

// Require the framework and instantiate it
const fastify = require('fastify')({
	logger: true
});

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options);

// Declare a route
fastify.get('/', async (request, reply) => {
	return { hello: 'world' }
});

routes.forEach((route, index) => {
	fastify.route(route);
});

const MONGO_URI = 'mongodb+srv://dsalenko:DeAtHeR32@cluster0-xoxyn.mongodb.net/test?retryWrites=true&w=majority';
if (!MONGO_URI) {
    throw new Error('You must provide a MongoLab URI');
}

// Connect to DB
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

// Run the server!
const start = async () => {
	try {
		await fastify.listen(3000);
		fastify.swagger();  
	  	fastify.log.info(`server listening on ${fastify.server.address().port}`);
	} catch (err) {
	  	fastify.log.error(err);
	  	process.exit(1);
	}
}
start()

