// Mock order data for admin dashboard

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'card' | 'cod' | 'esewa' | 'khalti';
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
}

export const mockOrders: Order[] = [
  {
    id: 'ord-001',
    orderNumber: 'KM-2024-001',
    customerName: 'Rajan Sharma',
    customerEmail: 'rajan@example.com',
    items: [
      { productId: 'p1', name: 'India Gate Basmati Rice', quantity: 2, price: 19.99 },
      { productId: 'p4', name: 'Everest Meat Masala', quantity: 3, price: 3.99 },
    ],
    total: 51.95,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    shippingAddress: '123 Main St, Kathmandu, Nepal',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-18T14:20:00Z',
  },
  {
    id: 'ord-002',
    orderNumber: 'KM-2024-002',
    customerName: 'Priya Patel',
    customerEmail: 'priya@example.com',
    items: [
      { productId: 'p3', name: 'Fresh Goat Meat (Khasi)', quantity: 1, price: 18.99 },
      { productId: 'p6', name: 'Amul Pure Ghee', quantity: 1, price: 19.99 },
    ],
    total: 38.98,
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'esewa',
    shippingAddress: '456 Oak Ave, Lalitpur, Nepal',
    createdAt: '2024-01-16T09:15:00Z',
    updatedAt: '2024-01-17T11:45:00Z',
  },
  {
    id: 'ord-003',
    orderNumber: 'KM-2024-003',
    customerName: 'Amit Thapa',
    customerEmail: 'amit@example.com',
    items: [
      { productId: 'p2', name: 'Wai Wai Instant Noodles', quantity: 5, price: 15.99 },
      { productId: 'p12', name: 'Frozen Momo (Chicken)', quantity: 2, price: 12.99 },
    ],
    total: 105.93,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'khalti',
    shippingAddress: '789 Pine St, Bhaktapur, Nepal',
    createdAt: '2024-01-17T14:00:00Z',
    updatedAt: '2024-01-17T14:00:00Z',
  },
  {
    id: 'ord-004',
    orderNumber: 'KM-2024-004',
    customerName: 'Sunita Rai',
    customerEmail: 'sunita@example.com',
    items: [
      { productId: 'p7', name: 'MDH Garam Masala', quantity: 2, price: 8.99 },
      { productId: 'p10', name: 'Cumin Seeds (Jeera)', quantity: 1, price: 5.49 },
    ],
    total: 23.47,
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    shippingAddress: '321 Elm Rd, Pokhara, Nepal',
    createdAt: '2024-01-18T08:30:00Z',
    updatedAt: '2024-01-18T09:00:00Z',
  },
  {
    id: 'ord-005',
    orderNumber: 'KM-2024-005',
    customerName: 'Bikash Gurung',
    customerEmail: 'bikash@example.com',
    items: [
      { productId: 'p8', name: 'Fresh Chicken Drumsticks', quantity: 2, price: 14.99 },
    ],
    total: 29.98,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'cod',
    shippingAddress: '555 River Dr, Chitwan, Nepal',
    createdAt: '2024-01-18T16:45:00Z',
    updatedAt: '2024-01-18T16:45:00Z',
  },
  {
    id: 'ord-006',
    orderNumber: 'KM-2024-006',
    customerName: 'Anita Shrestha',
    customerEmail: 'anita@example.com',
    items: [
      { productId: 'p5', name: 'Toor Dal (Arhar)', quantity: 3, price: 12.99 },
      { productId: 'p11', name: 'Chana Dal', quantity: 2, price: 6.99 },
    ],
    total: 52.95,
    status: 'cancelled',
    paymentStatus: 'refunded',
    paymentMethod: 'card',
    shippingAddress: '777 Hill St, Biratnagar, Nepal',
    createdAt: '2024-01-14T12:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
];
