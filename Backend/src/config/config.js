const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });


const serverConfig = {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'http://localhost',
};

const mongoConfig = {
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/spice-rice-market',
};

const SMTPConfig = {
  provider: process.env.SMTP_PROVIDER,
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER,
  password: process.env.SMTP_PASSWORD,
  from: process.env.SMTP_FORM_ADDRESS,
};

const cloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
};

const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your_jwt_secret',
  expiresIn: process.env.JWT_EXPIRES_IN || '1h',
};

const stripeConfig = {
  secretKey: process.env.STRIPE_SECRET_KEY,
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
};

const paypalConfig = {
  clientId: process.env.PAYPAL_CLIENT_ID,
  clientSecret: process.env.PAYPAL_CLIENT_SECRET,
};

const khaltiConfig = {
  publicKey: process.env.KHALTI_PUBLIC_KEY,
  secretKey: process.env.KHALTI_SECRET_KEY,
};

const otpConfig = {
  length: parseInt(process.env.OTP_LENGTH) || 6,
  expiryMinutes: parseInt(process.env.OTP_EXPIRY_MINUTES) || 10,
};

const eSewaConfig = {
  merchantCode: process.env.ESEWA_MERCHANT_CODE,
  secretKey: process.env.ESEWA_SECRET_KEY,
};

const meiliConfig = {
  host: process.env.MEILI_HOST || 'http://127.0.0.1:7700',
    apiKey: process.env.MEILI_API_KEY || '',
};  

const redisConfig = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
};

const uploadConfig = {
  cloudinary: cloudinaryConfig,
  s3: s3Config,
};

const paymentConfig = {
  stripe: stripeConfig,
  paypal: paypalConfig,
  khalti: khaltiConfig,
  eSewa: eSewaConfig,
};  





module.exports = {
    serverConfig,
    mongoConfig,
    SMTPConfig,
    uploadConfig,
    jwtConfig,
    paymentConfig,
    otpConfig,
    meiliConfig,
    redisConfig,
}