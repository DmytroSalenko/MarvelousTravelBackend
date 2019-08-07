exports.options = {
	routePrefix: '/documentation',
	exposeRoute: true,
	swagger: {
		info: {
		title: 'eCommerce API',
		description: 'Building fast REST API with Node.js, MongoDB, Fastify and Swagger',
		version: '1.0.0'
	},
	externalDocs: {
		url: 'https://swagger.io',
		description: 'Find more info here'
	},
	host: 'localhost:3000',
	schemes: ['http'],
	consumes: ['application/json'],
	produces: ['application/json']
	}
}