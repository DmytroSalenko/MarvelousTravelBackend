exports.addProductSchema = {
	description: 'Create a new product',
  	tags: ['products'],
	summary: 'Creates new product with given values',
  	body: {
    	type: 'object',
    	properties: {
      		brand: { type: 'string' },
      		name: { type: 'string' },
      		price: { type: 'number' },
      		tag: { type: 'string' },
			imagePath: { type: 'array', items: { type: 'string' } },
			sizes: { type: 'array', items: { 
					type: 'object', properties: {
						size: { type: 'string' },
						isAvailable: { type: 'boolean' }
					} 
				} 
			}  
    	}
	},
  	response: {
	  	200: {
      		description: 'Successful response',
      		type: 'object',
      		properties: {
        		_id: { type: 'string' },
        		brand: { type: 'string' },
      			name: { type: 'string' },
      			price: { type: 'number' },
      			tag: { type: 'string' },
				imagePath: { type: 'array', items: { type: 'string' } },
				sizes: { type: 'array', items: { 
						type: 'object', properties: {
							size: { type: 'string' },
							isAvailable: { type: 'boolean' }
						} 
					} 
				},
        		__v: { type: 'number' }
      		}
    	}
  	}
};

exports.addUserSchema = {
	description: 'Create a new user',
  	tags: ['users'],
	summary: 'Creates new user with given values',
  	body: {
    	type: 'object',
    	properties: {
      		email: { type: 'string' },
      		password_hash: { type: 'string' },
      		deliveryinfo_id: { type: 'string' }
    	}
	},
  	response: {
	  	200: {
      		description: 'Successful response',
      		type: 'object',
      		properties: {
        		_id: { type: 'string' },
        		email: { type: 'string' },
      			password_hash: { type: 'string' },
      			deliveryinfo_id: { type: 'string' },
        		__v: { type: 'number' }
      		}
    	}
  	}
};

exports.addDeliveryInfoSchema = {
	description: 'Create a new delivery info',
  	tags: ['deliveryinfos'],
	summary: 'Creates new deliveryinfo with given values',
  	body: {
    	type: 'object',
    	properties: {
      		userName: { type: 'string' },
      		addressLine: { type: 'string' },
			city: { type: 'string' },
			postalCode: { type: 'string' },
			province: { type: 'string' }
    	}
	},
  	response: {
	  	200: {
      		description: 'Successful response',
      		type: 'object',
      		properties: {
        		_id: { type: 'string' },
        		userName: { type: 'string' },
      			addressLine: { type: 'string' },
				city: { type: 'string' },
				postalCode: { type: 'string' },
				province: { type: 'string' },
        		__v: { type: 'number' }
      		}
    	}
  	}
};

exports.addCommentSchema = {
	description: 'Create a new comment',
  	tags: ['comments'],
	summary: 'Creates new comment with given values',
  	body: {
    	type: 'object',
    	properties: {
      		userName: { type: 'string' },
      		product_id: { type: 'string' },
			user_id: { type: 'string' },
			rating: { type: 'string' },
			description: { type: 'string' },
			date: { type: 'string' },
			attachmentUrls: { type: 'array', items: { type: 'string' } }
    	}
	},
  	response: {
	  	200: {
      		description: 'Successful response',
      		type: 'object',
      		properties: {
        		_id: { type: 'string' },
        		userName: { type: 'string' },
      			product_id: { type: 'string' },
				user_id: { type: 'string' },
				rating: { type: 'string' },
				description: { type: 'string' },
				date: { type: 'string' },
				attachmentUrls: { type: 'array', items: { type: 'string' } },
        		__v: { type: 'number' }
      		}
    	}
  	}
};

exports.addCartSchema = {
	description: 'Create a new cart',
  	tags: ['carts'],
	summary: 'Creates new cart with given values',
  	body: {
    	type: 'object',
    	properties: {
      		user_id: { type: 'string' },
			cartItems: { type: 'array', items: { 
					type: 'object', properties: {
						product_id: { type: 'string' },
						size_id: { type: 'string' },
						quantity: { type: 'number' }
					} 
				} 
			}  
    	}
	},
  	response: {
	  	200: {
      		description: 'Successful response',
      		type: 'object',
      		properties: {
        		_id: { type: 'string' },
        		user_id: { type: 'string' },
				cartItems: { type: 'array', items: { 
						type: 'object', properties: {
							product_id: { type: 'string' },
							size_id: { type: 'string' },
							quantity: { type: 'number' }
						} 
					} 
				},
        		__v: { type: 'number' }
      		}
    	}
  	}
};

exports.addOrderSchema = {
	description: 'Create a new order',
  	tags: ['orders'],
	summary: 'Creates new order with given values',
  	body: {
    	type: 'object',
    	properties: {
      		user_id: { type: 'string' },
      		deliveryinfo_id: { type: 'string' },
      		isPaid: { type: 'boolean' },
      		date: { type: 'string' },
			orderItems: { type: 'array', items: { 
					type: 'object', properties: {
						product_id: { type: 'string' },
						size_id: { type: 'string' },
						quantity: { type: 'number' }
					} 
				} 
			}  
    	}
	},
  	response: {
	  	200: {
      		description: 'Successful response',
      		type: 'object',
      		properties: {
        		_id: { type: 'string' },
        		user_id: { type: 'string' },
      			deliveryinfo_id: { type: 'string' },
      			isPaid: { type: 'boolean' },
      			date: { type: 'string' },
				orderItems: { type: 'array', items: { 
						type: 'object', properties: {
							product_id: { type: 'string' },
							size_id: { type: 'string' },
							quantity: { type: 'number' }
						} 
					} 
				},
        		__v: { type: 'number' }
      		}
    	}
  	}
};