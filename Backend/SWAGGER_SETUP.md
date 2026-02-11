# API Documentation Setup Guide

## Overview
This document explains how the Swagger API documentation is configured and how to add documentation to your API endpoints.

## Quick Start

### 1. Generate Swagger Documentation
```bash
npm run swagger
```
This command generates the `swagger-output.json` file from your route files.

### 2. Start the Server
```bash
npm run dev
```
or
```bash
npm start
```

### 3. Access Documentation
- **API Docs UI**: http://localhost:3000/api-docs
- **Root Redirect**: http://localhost:3000/ (redirects to /api-docs)
- **Raw JSON**: http://localhost:3000/swagger.json

## File Structure

```
Backend/
├── src/
│   ├── config/
│   │   ├── swagger.js              # Swagger configuration and auto-generation
│   │   ├── swagger-setup.js        # Swagger UI setup and routes
│   │   ├── express.config.js       # Express app configuration
│   │   └── ...
│   ├── modules/
│   │   └── auth/
│   │       ├── auth.router.js      # Routes with JSDoc comments
│   │       ├── auth.controller.js
│   │       └── ...
│   └── ...
├── index.js                         # Main server file
├── package.json
└── .env.example
```

## How It Works

### Swagger Auto-Generation Process

1. **Configuration** (`src/config/swagger.js`):
   - Defines API metadata (title, version, host, base path)
   - Lists all route files to scan
   - Specifies security definitions (JWT, cookies)
   - Defines model schemas

2. **Route Documentation** (`src/modules/*/module.router.js`):
   - Uses JSDoc `@route`, `@desc`, `@access` comments
   - swagger-autogen parses these comments
   - Generates OpenAPI/Swagger specs

3. **UI Setup** (`src/config/swagger-setup.js`):
   - Serves Swagger UI at `/api-docs`
   - Serves raw swagger.json at `/swagger.json`
   - Redirects root `/` to `/api-docs`

## How to Document Your Endpoints

### Template for Route Documentation

```javascript
/**
 * @route   METHOD /api/module/path
 * @desc    Brief description of what this endpoint does
 * @access  Public or Private
 * @param   {Type} paramName - Description
 * @returns {Object} Response description
 */
router.method('/path', controller.action);
```

### Complete Example (Auth Module)

```javascript
/**
 * @route   POST /api/auth/register
 * @desc    Register a new user account
 * @access  Public
 * @param   {File} image - User profile image
 * @returns {Object} Success message with user data
 */
authRouter.post("/register", uploader().single('image'), bodyValidator(registerDataDTO), authCtrl.register);

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged-in user profile
 * @access  Private
 * @returns {Object} User profile data
 */
authRouter.get('/me', loginCheck(), authCtrl.getLoggedInUserProfile);
```

## Adding New Route Documentation

### Step 1: Add JSDoc Comments to Your Router
Update your route file (e.g., `src/modules/product/product.router.js`):

```javascript
/**
 * @route   GET /api/products
 * @desc    Get all products with pagination and filters
 * @access  Public
 * @param   {String} category - Filter by category (query)
 * @param   {Number} page - Page number (query)
 * @param   {Number} limit - Items per page (query)
 * @returns {Object} Array of products
 */
router.get('/', productCtrl.getAllProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Get product details by ID
 * @access  Public
 * @param   {String} id - Product ID (path)
 * @returns {Object} Product details
 */
router.get('/:id', productCtrl.getProductById);

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private (Admin only)
 * @param   {Object} data - Product data in request body
 * @returns {Object} Created product
 */
router.post('/', adminAuth(), bodyValidator(productDTO), productCtrl.createProduct);
```

### Step 2: Ensure Route is in Swagger Config
Check `src/config/swagger.js` includes your module:

```javascript
const routes = [
  './src/modules/auth/auth.router.js',
  './src/modules/product/product.router.js',  // ← Make sure it's listed
  './src/modules/order/order.router.js',
  // ... other routes
];
```

### Step 3: Regenerate Swagger Documentation
```bash
npm run swagger
```

### Step 4: Restart Server
```bash
npm run dev
```

Your new endpoints should now appear in the API documentation at http://localhost:3000/api-docs

## Security Setup in Swagger

### JWT Bearer Authentication
The Swagger config includes JWT security definition. To mark endpoints as requiring authentication:

In your route comments:
```javascript
/**
 * @route   GET /api/protected-endpoint
 * @desc    Protected endpoint requiring JWT
 * @access  Private
 * @security [{"bearerAuth": []}]
 */
router.get('/protected', authMiddleware, controller.action);
```

## Environment Variables

Create a `.env` file in the Backend directory:

```env
PORT=3000
HOST=localhost
NODE_ENV=development
API_HOST=localhost:3000
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
JWT_SECRET=your_jwt_secret_key_here
```

## Common Issues & Fixes

### Issue: swagger-output.json not found
**Solution**: Run `npm run swagger` to generate it

### Issue: Changes not showing in Swagger UI
**Solution**: 
1. Run `npm run swagger` to regenerate JSON
2. Restart the server
3. Clear browser cache or hard refresh (Ctrl+Shift+R)

### Issue: Routes not appearing in documentation
**Solution**: 
1. Verify route file is listed in `src/config/swagger.js` → `routes` array
2. Check JSDoc comments follow the correct format
3. Ensure route path starts with `/` (e.g., `/register` not `register`)

## Customizing Swagger UI

Edit `src/config/swagger-setup.js` to customize:

```javascript
// Customize UI options
const swaggerOptions = {
  displayOperationId: true,           // Show operation IDs
  defaultModelsExpandDepth: 1,        // Model expansion depth
  defaultModelExpandDepth: 1,         // Schema expansion depth
  filter: true,                       // Enable search filter
  showExtensions: true,               // Show extensions
  deepLinking: true,                  // Enable deep linking
};

// Customize layout
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  swaggerOptions,
  customCss: '.swagger-ui .topbar { display: none }',  // Hide Swagger logo
  customSiteTitle: 'Spice Rice Market API Documentation'
}));
```

## Production Deployment

For production, ensure:
1. Generate swagger-output.json before deploying
2. Set `API_HOST` environment variable to your production domain
3. Set `NODE_ENV=production`
4. Consider restricting `/api-docs` access if needed

## Resources

- [Swagger/OpenAPI Specification](https://spec.openapis.org/)
- [swagger-autogen Documentation](https://github.com/davibaltar/swagger-autogen)
- [swagger-ui-express Documentation](https://github.com/scottie1984/swagger-ui-express)
- [Express.js Documentation](https://expressjs.com/)
