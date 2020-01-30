const productController = require('../controllers/cityController');
const userController = require('../controllers/userController');
const deliveryInfoController = require('../controllers/deliveryInfoController');
const commentController = require('../controllers/commentController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');
const countryController = require('../controllers/countryController');
const sightsController = require('../controllers/sightsController');

const documentation = require('./documentation/productApi');

const routes = [
	// Cities
	{
		method: 'GET',
		url: '/api/cities',
		handler: productController.getCities,
	},
	{
		method: 'GET',
		url: '/api/cities/:id',
		handler: productController.getSingleCity,
	},
	{
		method: 'POST',
		url: '/api/cities',
		// preHandler: authController.authenticateRequest,
		handler: productController.addCity,
		schema: documentation.addProductSchema
	},
	{
		method: 'PUT',
		url: '/api/cities/:id',
		preHandler: authController.authenticateRequest,
		handler: productController.updateCity,
	},
	{
		method: 'DELETE',
		url: '/api/cities/:id',
		preHandler: authController.authenticateRequest,
		handler: productController.deleteCity,
	},
	// Contries
	{
		method: 'GET',
		url: '/api/countries',
		handler: countryController.getCountries,
	},
	{
		method: 'GET',
		url: '/api/countries/:id',
		handler: countryController.getSingleCountry,
	},
	{
		method: 'POST',
		url: '/api/countries',
		handler: countryController.addCountry,
	},
	{
		method: 'PUT',
		url: '/api/countries/:id',
		handler: countryController.updateCountry,
	},
	{
		method: 'DELETE',
		url: '/api/countries/:id',
		handler: countryController.deleteCountry,
	},
	//Sights
	{
		method: 'GET',
		url: '/api/sights',
		handler: sightsController.getSights,
	},
	{
		method: 'GET',
		url: '/api/sights/:id',
		handler: sightsController.getSingleSight,
	},
	{
		method: 'POST',
		url: '/api/sights',
		// preHandler: authController.authenticateRequest,
		handler: sightsController.addSight,
		schema: documentation.addProductSchema
	},
	{
		method: 'PUT',
		url: '/api/sights/:id',
		preHandler: authController.authenticateRequest,
		handler: sightsController.updateSight,
	},
	{
		method: 'DELETE',
		url: '/api/sights/:id',
		preHandler: authController.authenticateRequest,
		handler: sightsController.deleteSight,
	},
	// Users
	{
		method: 'GET',
		url: '/api/users',
		preHandler: authController.authenticateRequest,
		handler: userController.getUsers,
	},
	{
		method: 'GET',
		url: '/api/users/:id',
		preHandler: authController.authenticateRequest,
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
		preHandler: authController.authenticateRequest,
		handler: userController.updateUser,
	},
	{
		method: 'DELETE',
		url: '/api/users/:id',
		preHandler: authController.authenticateRequest,
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
		preHandler: authController.authenticateRequest,
		handler: deliveryInfoController.updateDeliveryInfo,
	},
	{
		method: 'DELETE',
		url: '/api/deliveryInfos/:id',
		preHandler: authController.authenticateRequest,
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
		// preHandler: [authController.authenticateRequest, commentController.ensurePurchased],
		preHandler: authController.authenticateRequest,
		handler: commentController.addComment,
		schema: documentation.addCommentSchema
	},
	{
		method: 'PUT',
		url: '/api/comments/:id',
		preHandler: authController.authenticateRequest,
		handler: commentController.updateComment,
	},
	{
		method: 'DELETE',
		url: '/api/comments/:id',
		preHandler: authController.authenticateRequest,
		handler: commentController.deleteComment,
	},
	// Carts
	{
		method: 'GET',
		url: '/api/carts',
		preHandler: authController.authenticateRequest,
		handler: cartController.getCarts,
	},
	{
		method: 'POST',
		url: '/api/cartItems',
		preHandler: authController.authenticateRequest,
		handler: cartController.addToCart,
	},
	{
		method: 'PUT',
		url: '/api/cartItems/:id',
		preHandler: authController.authenticateRequest,
		handler: cartController.updateCartItem,
	},
	{
		method: 'DELETE',
		url: '/api/cartItems/:id',
		preHandler: authController.authenticateRequest,
		handler: cartController.deleteCartItem,
	},
	{
		method: 'GET',
		url: '/api/carts/:id',
		preHandler: authController.authenticateRequest,
		handler: cartController.getSingleCart,
	},
	{
		method: 'GET',
		url: '/api/users/carts',
		preHandler: authController.authenticateRequest,
		handler: cartController.getUserCart
	},
	{
		method: 'POST',
		url: '/api/carts',
		handler: cartController.addCart,
		preHandler: authController.authenticateRequest,
		schema: documentation.addCartSchema
	},
	{
		method: 'PUT',
		url: '/api/carts',
		preHandler: authController.authenticateRequest,
		handler: cartController.updateCart,
	},
	{
		method: 'DELETE',
		url: '/api/carts',
		preHandler: authController.authenticateRequest,
		handler: cartController.deleteCart,
	},
	// Orders
	{
		method: 'GET',
		url: '/api/orders',
		preHandler: authController.authenticateRequest,
		handler: orderController.getOrders,
	},
	{
		method: 'GET',
		url: '/api/orders/:id',
		preHandler: authController.authenticateRequest,
		handler: orderController.getSingleOrder,
	},
	{
		method: 'POST',
		url: '/api/orders',
		handler: orderController.addOrder,
		preHandler: authController.authenticateRequest,
		schema: documentation.addOrderSchema
	},
	{
		method: 'PUT',
		url: '/api/orders/:id',
		preHandler: authController.authenticateRequest,
		handler: orderController.updateOrder,
	},
	{
		method: 'DELETE',
		url: '/api/orders/:id',
		preHandler: authController.authenticateRequest,
		handler: orderController.deleteOrder,
	},

	//Authentication
	{
		method: 'POST',
		url: '/api/sign',
		handler: authController.signUp,
	},
	{
		method: 'PATCH',
		url: '/api/user',
		preHandler: authController.authenticateRequest,
		handler: userController.changePassword
	},
];

module.exports = routes;