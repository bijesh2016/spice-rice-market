/**
 * eSewa Payment Integration
 * 
 * eSewa Configuration and utilities for payment processing
 * 
 * Docs: https://developer.esewa.com.np/
 */

// eSewa Merchant Configuration
export const ESEWA_CONFIG = {
  // Merchant Code - Get this from eSewa Merchant Dashboard
  MERCHANT_CODE: "EPAYTEST",
  
  // eSewa Endpoint URLs
  ENDPOINTS: {
    // Production: https://esewa.com.np/epay/main
    // Test: https://uat.esewa.com.np/epay/main
    PAYMENT: "https://uat.esewa.com.np/epay/main",
    VERIFICATION: "https://uat.esewa.com.np/epay/transaction/status/",
  },

  // Redirect URLs - Configure these in your deployment
  REDIRECT_URL: {
    SUCCESS: `${window.location.origin}/checkout-success`,
    FAILED: `${window.location.origin}/checkout-failed`,
  },
};

/**
 * Generate unique transaction ID
 */
export const generateTransactionId = (): string => {
  return `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Basic signature generation for eSewa
 * In production, this should be done server-side
 */
export const generateSignature = (data: {
  amount: string;
  txnId: string;
  productCode: string;
}): string => {
  // This is a simplified example
  // Production implementations should use proper HMAC-SHA256 with secret key on backend
  const str = `${data.amount}${data.productCode}${data.txnId}`;
  return btoa(str); // Using btoa for base64 encoding in browser
};

/**
 * Create eSewa payment form data
 */
export const createESewaPaymentData = (
  amount: string,
  txnId: string,
  productCode: string = ESEWA_CONFIG.MERCHANT_CODE
) => {
  return {
    amt: amount,
    psc: "0", // Tax/Product Service Charge
    prid: productCode,
    scd: ESEWA_CONFIG.MERCHANT_CODE,
    su: ESEWA_CONFIG.REDIRECT_URL.SUCCESS,
    fu: ESEWA_CONFIG.REDIRECT_URL.FAILED,
  };
};

/**
 * Redirect to eSewa payment gateway
 */
export const redirectToESewaPayment = (
  amount: string,
  txnId: string,
  productCode?: string
) => {
  const paymentData = createESewaPaymentData(amount, txnId, productCode);
  
  const params = new URLSearchParams(paymentData).toString();
  const esewaURL = `${ESEWA_CONFIG.ENDPOINTS.PAYMENT}?${params}`;
  
  window.location.href = esewaURL;
};

/**
 * Verify eSewa payment (should be called from backend)
 * 
 * Backend implementation example:
 * 
 * async function verifyESewaPayment(transactionId: string) {
 *   const response = await fetch(
 *     `${ESEWA_CONFIG.ENDPOINTS.VERIFICATION}${transactionId}?total=${amount}&status=COMPLETE`,
 *     { headers: { Authorization: `Bearer ${SECRET_KEY}` } }
 *   );
 *   return response.json();
 * }
 */
export const verifyESewaPayment = async (
  transactionId: string
): Promise<Record<string, unknown>> => {
  // This should be implemented on your backend for security
  // Never verify payments on the frontend
  throw new Error(
    "Payment verification must be done on the backend for security reasons"
  );
};

// Export all for convenience
export default {
  ESEWA_CONFIG,
  generateTransactionId,
  generateSignature,
  createESewaPaymentData,
  redirectToESewaPayment,
  verifyESewaPayment,
};
