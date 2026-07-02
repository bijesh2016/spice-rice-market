# eSewa Payment Integration Guide

This document provides instructions for integrating eSewa payment gateway with your KyoudaiMart application.

## Overview

eSewa is a popular Digital Wallet and Payment Gateway service in Nepal. This integration handles:
- Payment form generation
- Transaction initiation
- Payment verification (backend)
- Success/Failure handling

## Frontend Implementation (Already Implemented ✓)

The frontend includes:
- **Checkout Page** (`src/pages/Checkout.tsx`) - Collects customer and order information
- **Payment Service** (`src/services/esewa.service.ts`) - eSewa configuration and utilities
- **Success Page** (`src/pages/CheckoutSuccess.tsx`) - Displays after successful payment
- **Failed Page** (`src/pages/CheckoutFailed.tsx`) - Displays after failed payment

## Backend Implementation (TODO)

### 1. Install Dependencies

```bash
npm install esewa --save
# or
yarn add esewa
```

### 2. Create Payment Routes

Create `routes/payment.js` in your Backend directory:

```javascript
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Create payment
router.post('/create-payment', authMiddleware, paymentController.createPayment);

// Verify payment (called by eSewa)
router.get('/verify-payment', paymentController.verifyPayment);

// Get payment status
router.get('/payment-status/:txnId', authMiddleware, paymentController.getPaymentStatus);

module.exports = router;
```

### 3. Create Payment Controller

Create `controllers/payment.controller.js`:

```javascript
const axios = require('axios');

// eSewa Configuration
const ESEWA_CONFIG = {
  merchantCode: process.env.ESEWA_MERCHANT_CODE || 'EPAYTEST',
  secretKey: process.env.ESEWA_SECRET_KEY,
  serviceCode: process.env.ESEWA_SERVICE_CODE || 'EPAYTEST',
  testUrl: 'https://uat.esewa.com.np/epay/transaction/status/',
  productionUrl: 'https://esewa.com.np/epay/transaction/status/',
};

const isProduction = process.env.NODE_ENV === 'production';
const statusUrl = isProduction ? ESEWA_CONFIG.productionUrl : ESEWA_CONFIG.testUrl;

/**
 * Create a payment order
 */
exports.createPayment = async (req, res) => {
  try {
    const { amount, txnId, productCode, customerDetails } = req.body;
    const userId = req.user.id;

    // Validate inputs
    if (!amount || !txnId) {
      return res.status(400).json({
        success: false,
        message: 'Amount and transaction ID are required',
      });
    }

    // Save order to database
    const order = await Order.create({
      userId,
      txnId,
      amount: parseFloat(amount),
      productCode: productCode || ESEWA_CONFIG.merchantCode,
      customerName: customerDetails?.customerName,
      customerEmail: customerDetails?.customerEmail,
      customerPhone: customerDetails?.customerPhone,
      address: customerDetails?.address,
      city: customerDetails?.city,
      zipCode: customerDetails?.zipCode,
      items: customerDetails?.items || [],
      status: 'PENDING',
    });

    res.json({
      success: true,
      message: 'Order created successfully',
      orderId: order._id,
      txnId: order.txnId,
    });
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating payment',
      error: error.message,
    });
  }
};

/**
 * Verify payment from eSewa
 */
exports.verifyPayment = async (req, res) => {
  try {
    const { oid, refId } = req.query;

    if (!oid || !refId) {
      return res.status(400).json({
        success: false,
        message: 'Order ID and Reference ID are required',
      });
    }

    // Verify with eSewa
    const esewaResponse = await verifyWithEsewa(refId, oid);

    if (esewaResponse.status === '100' || esewaResponse.status === 100) {
      // Payment successful
      const order = await Order.findOneAndUpdate(
        { txnId: oid },
        {
          status: 'COMPLETED',
          refId: refId,
          verifiedAt: new Date(),
        },
        { new: true }
      );

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }

      // Optionally: Send confirmation email
      // await sendOrderConfirmationEmail(order);

      return res.json({
        success: true,
        message: 'Payment verified successfully',
        orderId: order._id,
        refId: refId,
      });
    } else {
      // Payment failed
      await Order.findOneAndUpdate(
        { txnId: oid },
        { status: 'FAILED' }
      );

      return res.status(400).json({
        success: false,
        message: 'Payment verification failed',
        esewaStatus: esewaResponse.status,
      });
    }
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.message,
    });
  }
};

/**
 * Get payment status
 */
exports.getPaymentStatus = async (req, res) => {
  try {
    const { txnId } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({
      txnId,
      userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.json({
      success: true,
      data: {
        txnId: order.txnId,
        status: order.status,
        amount: order.amount,
        createdAt: order.createdAt,
        verifiedAt: order.verifiedAt,
      },
    });
  } catch (error) {
    console.error('Get payment status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting payment status',
      error: error.message,
    });
  }
};

/**
 * Verify payment with eSewa
 */
async function verifyWithEsewa(refId, oid) {
  try {
    const response = await axios.get(`${statusUrl}${refId}?total=${oid}&status=COMPLETE`, {
      headers: {
        Authorization: `Bearer ${ESEWA_CONFIG.secretKey}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('eSewa verification error:', error);
    throw error;
  }
}

module.exports.verifyWithEsewa = verifyWithEsewa;
```

### 4. Create Order Model

Add to your `models/order.model.js`:

```javascript
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    txnId: {
      type: String,
      unique: true,
      required: true,
    },
    refId: String,
    amount: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      default: 0,
    },
    productCode: String,
    customerName: String,
    customerEmail: String,
    customerPhone: String,
    address: String,
    city: String,
    zipCode: String,
    notes: String,
    items: [
      {
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    status: {
      type: String,
      enum: ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'],
      default: 'PENDING',
    },
    verifiedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
```

### 5. Environment Variables

Add to your `.env` file:

```env
# eSewa Configuration
ESEWA_MERCHANT_CODE=EPAYTEST
ESEWA_SECRET_KEY=your_secret_key_here
ESEWA_SERVICE_CODE=EPAYTEST

# Callback URLs (for production, update to your domain)
ESEWA_SUCCESS_URL=http://localhost:5173/checkout-success
ESEWA_FAILED_URL=http://localhost:5173/checkout-failed
```

### 6. Register Payment Routes

In your `src/config/router.config.js`:

```javascript
const paymentRoutes = require('../modules/payment/payment.router');

// Add this to your router configuration
app.use('/api/payments', paymentRoutes);
```

## Frontend Integration Steps

### 1. Update Checkout Component

Modify `src/pages/Checkout.tsx` to use the actual eSewa payment redirect:

```typescript
import { redirectToESewaPayment } from '@/services/esewa.service';

const handleESewaPayment = async () => {
  // ... validation code ...
  
  try {
    // Create order via backend API
    const response = await fetch('/api/payments/create-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: finalTotal, txnId, productCode, customerDetails: formData }),
    });

    const data = await response.json();
    
    if (data.success) {
      // Redirect to eSewa
      redirectToESewaPayment(finalTotal.toString(), txnId);
    }
  } catch (error) {
    toast({ title: 'Error', description: 'Failed to initiate payment' });
  }
};
```

## Testing

### Test Credentials (eSewa UAT)
- **Merchant Code**: EPAYTEST
- **URL**: https://uat.esewa.com.np/epay/main
- **Test Mobile**: 9841600000 / 98401600001

### Test Payment Flow
1. Go to `/checkout`
2. Fill in customer details
3. Click "Pay with eSewa"
4. You'll be redirected to eSewa test page
5. Use test credentials to complete payment
6. You'll be redirected to success page

## Production Deployment

Before going live:

1. Get production merchant code from eSewa
2. Update environment variables with production values
3. Update API endpoints (remove `/uat` from URLs)
4. Update callback URLs to production domain
5. Test with real transactions (small amounts)
6. Implement proper error handling and logging
7. Set up monitoring for payment failures

## Security Considerations

1. **Never** store secret keys in frontend code
2. **Always** verify payments on the backend
3. Validate all amounts and transaction IDs
4. Use HTTPS for all payment-related communications
5. Implement proper logging and monitoring
6. Hash transaction IDs before storing
7. Implement rate limiting on payment endpoints

## Troubleshooting

### Payment verification fails
- Check eSewa merchant code and secret key
- Verify transaction ID matches
- Check that order exists in your database
- Review eSewa documentation for latest API changes

### Redirect not working
- Ensure callback URLs are correctly configured
- Check browser's popup blocker settings
- Verify eSewa endpoint URL is correct
- Check network tab for any blocked requests

### Payment shows as pending indefinitely
- Implement a webhook to receive payment notifications
- Add a scheduled job to verify old pending transactions
- Send reminder emails to customers with pending payments

## Resources

- [eSewa Developer Documentation](https://developer.esewa.com.np/)
- [eSewa Integration Guide](https://esewa.com.np/)
- [eSewa Test Credentials](https://dev.esewa.com.np/)

## Support

For issues with eSewa integration:
- Contact eSewa support: support@esewa.com.np
- Check eSewa developer forum
- Review API documentation for latest changes
