const swaggerAutogen = require('swagger-autogen')();
const path = require('path');

const doc = {
  info: {
    title: 'Spice Rice Market API',
    description: 'Complete E-Commerce API Documentation for Spice and Rice Market Platform',
    version: '1.0.0',
    contact: {
      name: 'API Support',
      email: 'support@spicericemarket.com'
    },
    license: {
      name: 'ISC'
    }
  },
  host: process.env.API_HOST || 'localhost:3000',
  basePath: '/api',
  schemes: ['http', 'https'],
  consumes: ['application/json', 'multipart/form-data'],
  produces: ['application/json'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'JWT Authorization header using the Bearer scheme. Example: Bearer {token}'
    },
    cookieAuth: {
      type: 'apiKey',
      in: 'cookie',
      name: 'token'
    }
  },
  definitions: {
    User: {
      type: 'object',
      properties: {
        _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
        firstName: { type: 'string', example: 'John' },
        lastName: { type: 'string', example: 'Doe' },
        email: { type: 'string', example: 'john@example.com' },
        phone: { type: 'string', example: '+1234567890' },
        role: { type: 'string', enum: ['user', 'admin', 'seller'], example: 'user' },
        isActive: { type: 'boolean', example: true },
        createdAt: { type: 'string', format: 'date-time' }
      }
    },
    Product: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        name: { type: 'string', example: 'Basmati Rice' },
        description: { type: 'string' },
        price: { type: 'number', example: 499.99 },
        stock: { type: 'integer', example: 100 },
        category: { type: 'string', example: 'Rice' },
        image: { type: 'string', format: 'url' },
        rating: { type: 'number', example: 4.5 },
        createdAt: { type: 'string', format: 'date-time' }
      }
    },
    Order: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        userId: { type: 'string' },
        items: { type: 'array', items: { type: 'object' } },
        totalAmount: { type: 'number', example: 1999.99 },
        status: { type: 'string', enum: ['pending', 'processing', 'shipped', 'delivered'], example: 'pending' },
        createdAt: { type: 'string', format: 'date-time' }
      }
    },
    ErrorResponse: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string' },
        error: { type: 'string' }
      }
    },
    SuccessResponse: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string' },
        data: { type: 'object' }
      }
    }
  }
};

const outputFile = path.join(__dirname, '../../swagger-output.json');
const routes = [
  path.join(__dirname, '../modules/auth/auth.router.js'),
  path.join(__dirname, '../modules/product/product.router.js'),
  path.join(__dirname, '../modules/order/order.router.js'),
  path.join(__dirname, '../modules/cart/cart.router.js'),
  path.join(__dirname, '../modules/category/category.router.js'),
  path.join(__dirname, '../modules/brand/brand.router.js'),
  path.join(__dirname, '../modules/banner/banner.router.js'),
  path.join(__dirname, '../modules/discount/discount.router.js'),
  path.join(__dirname, '../modules/payment/payment.router.js'),
  path.join(__dirname, '../modules/shipping/shipping.router.js'),
  path.join(__dirname, '../modules/review/review.router.js'),
  path.join(__dirname, '../modules/rating/rating.router.js'),
  path.join(__dirname, '../modules/blogs/blogs.router.js'),
  path.join(__dirname, '../modules/wishlist/wishlist.router.js'),
  path.join(__dirname, '../modules/checkout/checkout.router.js'),
  path.join(__dirname, '../modules/inventory/inventory.router.js'),
  path.join(__dirname, '../modules/notification/notification.router.js'),
  path.join(__dirname, '../modules/refund/refund.router.js'),
  path.join(__dirname, '../modules/search/search.router.js'),
  path.join(__dirname, '../modules/filter/filter.router.js')
];

swaggerAutogen(outputFile, routes, doc).then(() => {
  console.log('✅ Swagger documentation generated successfully!');
  process.exit(0);
}).catch((err) => {
  console.error('❌ Swagger generation failed:', err.message);
  process.exit(1);
});
