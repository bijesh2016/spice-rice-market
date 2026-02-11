const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');

/**
 * Setup Swagger UI for API documentation
 * @param {Express} app - Express application instance
 */
const setupSwagger = (app) => {
  // Load swagger document with error handling
  let swaggerDocument;
  const swaggerPath = path.join(__dirname, '../../swagger-output.json');
  
  try {
    if (fs.existsSync(swaggerPath)) {
      swaggerDocument = require(swaggerPath);
    } else {
      // Fallback to a basic swagger definition if file doesn't exist
      swaggerDocument = {
        swagger: '2.0',
        info: {
          title: 'Spice Rice Market API',
          version: '1.0.0',
          description: 'E-Commerce API Documentation'
        },
        host: 'localhost:3000',
        basePath: '/api',
        schemes: ['http', 'https'],
        paths: {}
      };
    }
  } catch (err) {
    console.warn('⚠️  Could not load swagger-output.json, using fallback configuration');
    swaggerDocument = {
      swagger: '2.0',
      info: {
        title: 'Spice Rice Market API',
        version: '1.0.0',
        description: 'E-Commerce API Documentation'
      },
      host: 'localhost:3000',
      basePath: '/api',
      schemes: ['http', 'https'],
      paths: {}
    };
  }

  // Serve Swagger documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      url: '/swagger.json',
      displayOperationId: true,
      defaultModelsExpandDepth: 1,
      defaultModelExpandDepth: 1
    },
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Spice Rice Market API Documentation',
  }));

  // Redirect root to API docs
  app.get('/', (req, res) => {
    res.redirect('/api-docs');
  });

  // Serve raw swagger.json
  app.get('/swagger.json', (req, res) => {
    res.json(swaggerDocument);
  });

  console.log('✅ Swagger UI is available at http://localhost:3000/api-docs');
};

module.exports = { setupSwagger };
