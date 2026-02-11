 const USER_ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  VENDOR: "vendor",
  CUSTOMER: "customer",
};

 const AUTH_PROVIDERS = {
  LOCAL: "local",
  GOOGLE: "google",
  FACEBOOK: "facebook",
};

 const TOKEN_TYPES = {
  ACCESS: "access",
  REFRESH: "refresh",
};

 const PRODUCT_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  OUT_OF_STOCK: "out_of_stock",
  DISCONTINUED: "discontinued",
};

 const PRODUCT_TYPES = {
  SIMPLE: "simple",
  VARIABLE: "variable",
  DIGITAL: "digital",
};

 const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
};

 const CART_STATUS = {
  ACTIVE: "active",
  ABANDONED: "abandoned",
  CONVERTED: "converted",
};

 const CHECKOUT_STEPS = {
  ADDRESS: "address",
  SHIPPING: "shipping",
  PAYMENT: "payment",
  REVIEW: "review",
};

 const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  RETURNED: "returned",
  REFUNDED: "refunded",
};

 const PAYMENT_STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
  REFUNDED: "refunded",
};

 const PAYMENT_METHODS = {
  COD: "cod",
  KHALTI: "khalti",
  STRIPE: "stripe",
  PAYPAL: "paypal",
};

 const CURRENCY = {
  NPR: "NPR",
  USD: "USD",
  EUR: "EUR",
};

 const SHIPPING_STATUS = {
  PENDING: "pending",
  IN_TRANSIT: "in_transit",
  DELIVERED: "delivered",
  RETURNED: "returned",
};

 const SHIPPING_PROVIDERS = {
  FEDEX: "fedex",
  DHL: "dhl",
  UPS: "ups",
  LOCAL: "local_delivery",
};

 const DISCOUNT_TYPE = {
  FLAT: "flat",
  PERCENTAGE: "percentage",
};

 const COUPON_STATUS = {
  ACTIVE: "active",
  EXPIRED: "expired",
  DISABLED: "disabled",
};

 const REVIEW_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

 const NOTIFICATION_TYPE = {
  EMAIL: "email",
  SMS: "sms",
  PUSH: "push",
};

 const NOTIFICATION_EVENT = {
  ORDER_PLACED: "order_placed",
  ORDER_SHIPPED: "order_shipped",
  ORDER_DELIVERED: "order_delivered",
  PAYMENT_FAILED: "payment_failed",
};

 const RESPONSE_STATUS = {
  SUCCESS: "success",
  ERROR: "error",
};

 const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

 const FILE_TYPES = {
  IMAGE: ["image/jpeg", "image/png", "image/webp","image/jpg"],
  DOCUMENT: ["application/pdf"],
};

 const IMAGE_SIZES = {
  THUMBNAIL: "thumbnail",
  MEDIUM: "medium",
  LARGE: "large",
};

const STATUS={
    ACTIVE: "active",
    INACTIVE: "inactive",
    PENDING: "pending",
    SUSPENDED: "suspended",
};

module.exports = {
    USER_ROLES,
    AUTH_PROVIDERS,
    TOKEN_TYPES,
    PRODUCT_STATUS,
    PRODUCT_TYPES,
    SORT_ORDER,
    CART_STATUS,
    CHECKOUT_STEPS,
    ORDER_STATUS,
    PAYMENT_STATUS, 
    PAYMENT_METHODS,
    CURRENCY,
    SHIPPING_STATUS,
    SHIPPING_PROVIDERS,
    DISCOUNT_TYPE,
    COUPON_STATUS,
    REVIEW_STATUS,
    NOTIFICATION_TYPE,  
    NOTIFICATION_EVENT,
    RESPONSE_STATUS,
    PAGINATION,
    FILE_TYPES,
    IMAGE_SIZES,
    STATUS,
}

