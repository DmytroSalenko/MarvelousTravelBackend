const productController = require('../controllers/productController');
const userController = require('../controllers/userController');
const deliveryInfoController = require('../controllers/deliveryInfoController');
const commentController = require('../controllers/commentController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const documentation = require('./documentation/productApi');

const routes = [
	// Products
	{
		method: 'GET',
		url: '/api/products',
		handler: productController.getProducts,
	},
	{
		method: 'GET',
		url: '/api/products/:id',
		handler: productController.getSingleProduct,
	},
	{
		method: 'POST',
		url: '/api/products',
		handler: productController.addProduct,
		schema: documentation.addProductSchema
	},
	{
		method: 'PUT',
		url: '/api/products/:id',
		handler: productController.updateProduct,
	},
	{
		method: 'DELETE',
		url: '/api/products/:id',
		handler: productController.deleteProduct,
	},
	// Users
	{
		method: 'GET',
		url: '/api/users',
		preHandler: async (request, reply, next) => {
			try {
				await request.jwtVerify()
			} catch (err) {
				reply.send(err)
			}
		},
		handler: userController.getUsers,
	},
	{
		method: 'GET',
		url: '/api/users/:id',
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
		handler: userController.updateUser,
	},
	{
		method: 'DELETE',
		url: '/api/users/:id',
		handler: userController.deleteUser,
	},
	// DeliveryInfos
	{
		method: 'GET',
		url: '/api/deliveryinfos',
		handler: deliveryInfoController.getDeliveryInfos,
	},
	{
		method: 'GET',
		url: '/api/deliveryinfos/:id',
		handler: deliveryInfoController.getSingleDeliveryInfo,
	},
	{
		method: 'POST',
		url: '/api/deliveryinfos',
		handler: deliveryInfoController.addDeliveryInfo,
		schema: documentation.addDeliveryInfoSchema
	},
	{
		method: 'PUT',
		url: '/api/deliveryinfos/:id',
		handler: deliveryInfoController.updateDeliveryInfo,
	},
	{
		method: 'DELETE',
		url: '/api/deliveryinfos/:id',
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
		handler: commentController.addComment,
		schema: documentation.addCommentSchema
	},
	{
		method: 'PUT',
		url: '/api/comments/:id',
		handler: commentController.updateComment,
	},
	{
		method: 'DELETE',
		url: '/api/comments/:id',
		handler: commentController.deleteComment,
	},
	// Carts
	{
		method: 'GET',
		url: '/api/carts',
		handler: cartController.getCarts,
	},
	{
		method: 'GET',
		url: '/api/carts/:id',
		handler: cartController.getSingleCart,
	},
	{
		method: 'POST',
		url: '/api/carts',
		handler: cartController.addCart,
		schema: documentation.addCartSchema
	},
	{
		method: 'PUT',
		url: '/api/carts/:id',
		handler: cartController.updateCart,
	},
	{
		method: 'DELETE',
		url: '/api/carts/:id',
		handler: cartController.deleteCart,
	},
	// Orders
	{
		method: 'GET',
		url: '/api/orders',
		handler: orderController.getOrders,
	},
	{
		method: 'GET',
		url: '/api/orders/:id',
		handler: orderController.getSingleOrder,
	},
	{
		method: 'POST',
		url: '/api/orders',
		handler: orderController.addOrder,
		schema: documentation.addOrderSchema
	},
	{
		method: 'PUT',
		url: '/api/orders/:id',
		handler: orderController.updateOrder,
	},
	{
		method: 'DELETE',
		url: '/api/orders/:id',
		handler: orderController.deleteOrder,
	},

	//Authentication
	{
		method: 'POST',
		url: '/sign',
		handler: authController.signUp,
	}
];

module.exports = routes;