const http = require("http");
require("dotenv").config();

const app = require("./src/config/express.config");
const connectMongo = require("./src/config/mongo.config");
const { setupSwagger } = require("./src/config/swagger-setup");

setupSwagger(app);

const routes = [
  ["auth", "/api/auth"],
  ["banner", "/api/banners"],
  ["blogs", "/api/blogs"],
  ["brand", "/api/brands"],
  ["category", "/api/categories"],
  ["product", "/api/products"],
];

routes.forEach(([moduleName, apiPath]) => {
  try {
    const router = require(`./src/modules/${moduleName}/${moduleName}.router`);
    app.use(apiPath, router);
  } catch (err) {
    console.warn(`Route ${apiPath} not available: ${err.message}`);
  }
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date(),
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found. Check /api-docs for available endpoints.",
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.code || err.status || 500;

  console.error("Error:", err);
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    status: err.status || "ERROR",
    error: process.env.NODE_ENV === "production" ? {} : err,
  });
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
const httpServer = http.createServer(app);

connectMongo()
  .then(() => {
    httpServer.listen(PORT, HOST, () => {
      console.log(`Server is listening on http://${HOST}:${PORT}`);
      console.log(`API Documentation: http://${HOST}:${PORT}/api-docs`);
      console.log("Backend is running.");
      console.log("Press Ctrl+C to stop the server.");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
