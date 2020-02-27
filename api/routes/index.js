const cityController = require('../controllers/cityController');
const userController = require('../controllers/userController');
const deliveryInfoController = require('../controllers/deliveryInfoController');
const commentController = require('../controllers/commentController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');
const countryController = require('../controllers/countryController');
const sightsController = require('../controllers/sightsController');
const chatController = require('../controllers/chatController');
const chatMessageController = require('../controllers/chatMessageController');
const tripController = require('../controllers/tripController');
const imagesController = require('../controllers/imagesController');

const documentation = require('./documentation/productApi');

const routes = [
	// trips
	// {
	// 	method: 'GET',
	// 	url: '/api/user.trips/:id',
	// 	handler: tripController.getUserTrips,
	// },
	// {
	// 	method: 'POST',
	// 	url: '/api/trips',
	// 	handler: tripController.createTrip,
	// },
	// {
	// 	method: 'DELETE',
	// 	url: '/api/trips',
	// 	handler: tripController.deleteTrip,
	// },
	// {
	// 	method: 'PUT',
	// 	url: '/api/trips/:tripId',
	// 	handler: tripController.updateTrip,
	// },
	// {
	// 	method: 'GET',
	// 	url: '/api/trips/:tripId',
	// 	handler: tripController.getSingleTrip,
	// },
	// {
	// 	method: 'GET',
	// 	url: '/api/trips',
	// 	handler: tripController.getTrips,
	// },
	// {
	// 	method: 'POST',
	// 	url: '/api/follow.trips/:tripId',
	// 	handler: tripController.followTrip,
	// },
	// {
	// 	method: 'POST',
	// 	url: '/api/unfollow.trips/:userId',
	// 	handler: tripController.unfollowTrip,
	// },
	// chats message
	// {
	// 	method: 'POST',
	// 	url: '/api/chatMessages',
	// 	handler: chatMessageController.addMessage,
	// },
	// chat
	// {
	// 	method: 'GET',
	// 	url: '/api/chats/:id',
	// 	handler: chatController.getSingleChat,
	// },
	// {
	// 	method: "GET",
	// 	url: '/api/user.chats/:id',
	// 	handler: chatController.getUserChats,
	// },
	// Cities
	// {
	// 	method: 'GET',
	// 	url: '/api/cities',
	// 	handler: cityController.getCities,
	// },
	// {
	// 	method: 'GET',
	// 	url: '/api/cities/:id',
	// 	handler: cityController.getSingleCity,
	// },
	// {
	// 	method: 'POST',
	// 	url: '/api/cities',
	// 	// preHandler: authController.authorizeRequest,
	// 	handler: cityController.addCity,
	// 	schema: documentation.addProductSchema
	// },
	// {
	// 	method: 'PUT',
	// 	url: '/api/cities/:id',
	// 	preHandler: authController.authorizeRequest,
	// 	handler: cityController.updateCity,
	// },
	// {
	// 	method: 'DELETE',
	// 	url: '/api/cities/:id',
	// 	preHandler: authController.authorizeRequest,
	// 	handler: cityController.deleteCity,
	// },
	// Contries
	// {
	// 	method: 'GET',
	// 	url: '/api/countries',
	// 	handler: countryController.getCountries,
	// // },
	// {
	// 	method: 'GET',
	// 	url: '/api/countries/:id',
	// 	handler: countryController.getSingleCountry,
	// },
	// {
	// 	method: 'POST',
	// 	url: '/api/countries',
	// 	handler: countryController.addCountry,
	// },
	// {
	// 	method: 'PUT',
	// 	url: '/api/countries/:id',
	// 	handler: countryController.updateCountry,
	// },
	// {
	// 	method: 'DELETE',
	// 	url: '/api/countries/:id',
	// 	handler: countryController.deleteCountry,
	// },
	//Sights
	// {
	// 	method: 'GET',
	// 	url: '/api/sights',
	// 	handler: sightsController.getSights,
	// },
	// {
	// 	method: 'GET',
	// 	url: '/api/sights/:id',
	// 	handler: sightsController.getSingleSight,
	// },
	// {
	// 	method: 'POST',
	// 	url: '/api/sights',
	// 	// preHandler: authController.authorizeRequest,
	// 	handler: sightsController.addSight,
	// 	schema: documentation.addProductSchema
	// },
	// {
	// 	method: 'PUT',
	// 	url: '/api/sights/:id',
	// 	preHandler: authController.authorizeRequest,
	// 	handler: sightsController.updateSight,
	// },
	// {
	// 	method: 'DELETE',
	// 	url: '/api/sights/:id',
	// 	preHandler: authController.authorizeRequest,
	// 	handler: sightsController.deleteSight,
	// },
	// Users
	{
		method: 'GET',
		url: '/api/users',
		preHandler: authController.authorizeRequest,
		handler: userController.getUsers,
	},
	{
		method: 'GET',
		url: '/api/users/:id',
		preHandler: authController.authorizeRequest,
		handler: userController.getSingleUser,
	},
	{
		method: 'POST',
		url: '/api/users',
		handler: userController.addUser,
		schema: documentation.addUserSchema
	},
	{
		method: 'PUT',
		url: '/api/users/:id',
		preHandler: authController.authorizeRequest,
		handler: userController.updateUser,
	},
	{
		method: 'DELETE',
		url: '/api/users/:id',
		preHandler: authController.authorizeRequest,
		handler: userController.deleteUser,
	},
	// deliveryInfos
	{
		method: 'GET',
		url: '/api/deliveryInfos',
		handler: deliveryInfoController.getDeliveryInfos,
	},
	{
		method: 'GET',
		url: '/api/deliveryInfos/:id',
		handler: deliveryInfoController.getSingleDeliveryInfo,
	},
	{
		method: 'POST',
		url: '/api/deliveryInfos',
		handler: deliveryInfoController.addDeliveryInfo,
		schema: documentation.addDeliveryInfoschema
	},
	{
		method: 'PUT',
		url: '/api/deliveryInfos/:id',
		preHandler: authController.authorizeRequest,
		handler: deliveryInfoController.updateDeliveryInfo,
	},
	{
		method: 'DELETE',
		url: '/api/deliveryInfos/:id',
		preHandler: authController.authorizeRequest,
		handler: deliveryInfoController.deleteDeliveryInfo,
	},
	// Comments
	{
		method: 'GET',
		url: '/api/comments',
		handler: commentController.getComments,
	},
	{
		method: 'GET',
		url: '/api/comments/:id',
		handler: commentController.getSingleComment,
	},
	{
		method: 'POST',
		url: '/api/comments',
		// preHandler: [authController.authorizeRequest, commentController.ensurePurchased],
		preHandler: authController.authorizeRequest,
		handler: commentController.addComment,
		schema: documentation.addCommentSchema
	},
	{
		method: 'PUT',
		url: '/api/comments/:id',
		preHandler: authController.authorizeRequest,
		handler: commentController.updateComment,
	},
	{
		method: 'DELETE',
		url: '/api/comments/:id',
		preHandler: authController.authorizeRequest,
		handler: commentController.deleteComment,
	},
	// Carts
	{
		method: 'GET',
		url: '/api/carts',
		preHandler: authController.authorizeRequest,
		handler: cartController.getCarts,
	},
	{
		method: 'POST',
		url: '/api/cartItems',
		preHandler: authController.authorizeRequest,
		handler: cartController.addToCart,
	},
	{
		method: 'PUT',
		url: '/api/cartItems/:id',
		preHandler: authController.authorizeRequest,
		handler: cartController.updateCartItem,
	},
	{
		method: 'DELETE',
		url: '/api/cartItems/:id',
		preHandler: authController.authorizeRequest,
		handler: cartController.deleteCartItem,
	},
	{
		method: 'GET',
		url: '/api/carts/:id',
		preHandler: authController.authorizeRequest,
		handler: cartController.getSingleCart,
	},
	{
		method: 'GET',
		url: '/api/users/carts',
		preHandler: authController.authorizeRequest,
		handler: cartController.getUserCart
	},
	{
		method: 'POST',
		url: '/api/carts',
		handler: cartController.addCart,
		preHandler: authController.authorizeRequest,
		schema: documentation.addCartSchema
	},
	{
		method: 'PUT',
		url: '/api/carts',
		preHandler: authController.authorizeRequest,
		handler: cartController.updateCart,
	},
	{
		method: 'DELETE',
		url: '/api/carts',
		preHandler: authController.authorizeRequest,
		handler: cartController.deleteCart,
	},
	// Orders
	{
		method: 'GET',
		url: '/api/orders',
		preHandler: authController.authorizeRequest,
		handler: orderController.getOrders,
	},
	{
		method: 'GET',
		url: '/api/orders/:id',
		preHandler: authController.authorizeRequest,
		handler: orderController.getSingleOrder,
	},
	{
		method: 'POST',
		url: '/api/orders',
		handler: orderController.addOrder,
		preHandler: authController.authorizeRequest,
		schema: documentation.addOrderSchema
	},
	{
		method: 'PUT',
		url: '/api/orders/:id',
		preHandler: authController.authorizeRequest,
		handler: orderController.updateOrder,
	},
	{
		method: 'DELETE',
		url: '/api/orders/:id',
		preHandler: authController.authorizeRequest,
		handler: orderController.deleteOrder,
	},

	//Authentication
	{
		method: 'POST',
		url: '/api/sign',
		handler: authController.signIn,
	},
	{
		method: 'PATCH',
		url: '/api/user',
		preHandler: authController.authorizeRequest,
		handler: userController.changePassword
	},
];

// module.exports = routes;

function set_routes(app, upload) {
	// trips
	app.get('/api/user/trips/:id', tripController.getUserTrips);
	app.post('/api/trips', tripController.createTrip);
	app.delete('/api/trips', tripController.deleteTrip);
	app.put('/api/trips/:tripId', tripController.updateTrip);
	app.get('/api/trips/:tripId', tripController.getSingleTrip);
	app.get('/api/trips', tripController.getTrips);
	app.post('/api/follow/trips/:tripId', tripController.followTrip);
	app.post('/api/unfollow/trips/:userId', tripController.unfollowTrip);

	// chat messages
	app.post('/api/chatMessages', chatMessageController.addMessage);
	app.get('/api/chats/:id', chatController.getSingleChat);
	app.get('/api/user/chats/:id', chatController.getUserChats);

	// cities
	app.get('/api/cities', cityController.getCities);
	app.get('/api/cities/:id', cityController.getSingleCity);
	app.post('/api/cities',cityController.addCity); //auth
	app.put('/api/cities/:id', cityController.updateCity); //auth
	app.delete('/api/cities/:id', cityController.deleteCity); //auth

	// countries
	app.get('/api/countries', countryController.getCountries);
	app.get('/api/countries/:id', countryController.getSingleCountry);
	app.post('/api/countries', countryController.addCountry); //auth
	app.put('/api/countries/:id', countryController.updateCountry); //auth
	app.delete('/api/countries/:id', countryController.deleteCountry); //auth

	// sights
	app.get('/api/sights', sightsController.getSights);
	app.get('/api/sights/:id', sightsController.getSingleSight);
	app.post('/api/sights', sightsController.addSight);
	app.put('/api/sights/:id', sightsController.updateSight); // auth
	app.delete('/api/sights/:id', sightsController.deleteSight); // auth

	// users
	app.get('/api/users', userController.getUsers); // auth
	app.get('/api/users/:id', userController.getSingleUser); // auth
	app.post('/api/users', userController.addUser);
	app.put('/api/users/:id', userController.updateUser); // auth
	app.delete('/api/users/:id', userController.deleteUser); // auth

	// authentication
	app.post('/api/check_email', authController.checkEmailAvailability);
	app.post('/api/sign', authController.signIn);

	// images
	app.post('/api/upload/icon/:id', upload.single("file"), imagesController.uploadProfileIcon);
	app.get('/api/users/icon/:id', imagesController.getProfileIcon);
	app.get('/api/users/mini/icon/:id', imagesController.getProfileMiniIcon);
}

module.exports = set_routes;