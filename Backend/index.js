const http = require("http");
const app = require('./src/config/express.config');
const { setupSwagger } = require('./src/config/swagger-setup');
require('dotenv').config();

// Setup Swagger documentation
setupSwagger(app);

// Import routes - with try-catch for missing dependencies
let authRouter;
try {
  authRouter = require('./src/modules/auth/auth.router');
  app.use('/api/auth', authRouter);
} catch (err) {
  console.warn('⚠️  Auth routes not available:', err.message);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running', timestamp: new Date() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found. Check /api-docs for available endpoints.' 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const httpServer = http.createServer(app);

httpServer.listen(PORT, HOST, () => {
    console.log(`\n🚀 Server is listening on http://${HOST}:${PORT}`);
    console.log(`📚 API Documentation: http://${HOST}:${PORT}/api-docs`);
    console.log("✅ Backend is running...");
    console.log("Press Ctrl+C to stop the server.\n");
});

