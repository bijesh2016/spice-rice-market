// Mock data for admin panel

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  price: number;
  salePrice?: number;
  stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  rating: number;
  reviews: number;
  image: string;
  weight: string;
  description: string;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  items: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'moderator' | 'customer';
  status: 'active' | 'inactive' | 'suspended';
  registeredAt: string;
  avatar: string;
  orders: number;
  totalSpent: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent?: string;
  productCount: number;
  status: 'active' | 'inactive';
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  productCount: number;
  featured: boolean;
}

export interface Discount {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'bogo' | 'free_shipping';
  value: number;
  usageCount: number;
  usageLimit: number;
  validFrom: string;
  validTo: string;
  status: 'active' | 'expired' | 'scheduled';
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customer: string;
  rating: number;
  comment: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Mock Products
export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'India Gate Basmati Rice',
    sku: 'RICE-IG-5KG',
    category: 'Rice',
    brand: 'India Gate',
    price: 24.99,
    salePrice: 19.99,
    stock: 150,
    status: 'in_stock',
    rating: 4.8,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop',
    weight: '5 KG',
    description: 'Premium aged basmati rice with long grains and aromatic flavor.'
  },
  {
    id: 'p2',
    name: 'Wai Wai Instant Noodles',
    sku: 'NOOD-WW-30',
    category: 'Noodles',
    brand: 'Wai Wai',
    price: 15.99,
    stock: 320,
    status: 'in_stock',
    rating: 4.5,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=200&h=200&fit=crop',
    weight: '30 Pack',
    description: 'Classic Nepali instant noodles, ready in 2 minutes.'
  },
  {
    id: 'p3',
    name: 'Fresh Goat Meat (Khasi)',
    sku: 'MEAT-GT-1KG',
    category: 'Dice',
    brand: 'KyoudaiMart Fresh',
    price: 18.99,
    stock: 25,
    status: 'low_stock',
    rating: 4.9,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=200&h=200&fit=crop',
    weight: '1 KG',
    description: 'Premium fresh goat meat, halal certified.'
  },
  {
    id: 'p4',
    name: 'Everest Meat Masala',
    sku: 'SPICE-EM-100',
    category: 'Spice',
    brand: 'Everest',
    price: 4.99,
    salePrice: 3.99,
    stock: 0,
    status: 'out_of_stock',
    rating: 4.7,
    reviews: 423,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop',
    weight: '100g',
    description: 'Perfect blend for meat dishes with authentic Indian flavors.'
  },
  {
    id: 'p5',
    name: 'Toor Dal (Arhar)',
    sku: 'DAL-TD-2KG',
    category: 'Lentils & Beans',
    brand: 'Tata Sampann',
    price: 12.99,
    stock: 89,
    status: 'in_stock',
    rating: 4.6,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1585996746155-25f3e549d7ea?w=200&h=200&fit=crop',
    weight: '2 KG',
    description: 'Premium quality yellow lentils, high protein content.'
  },
  {
    id: 'p6',
    name: 'Amul Pure Ghee',
    sku: 'DAIRY-AG-1L',
    category: 'Fridge & Freezers',
    brand: 'Amul',
    price: 22.99,
    salePrice: 19.99,
    stock: 67,
    status: 'in_stock',
    rating: 4.9,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=200&h=200&fit=crop',
    weight: '1 Litre',
    description: 'Pure cow ghee made from fresh cream.'
  },
  {
    id: 'p7',
    name: 'MDH Garam Masala',
    sku: 'SPICE-MDH-500',
    category: 'Spice',
    brand: 'MDH',
    price: 8.99,
    stock: 234,
    status: 'in_stock',
    rating: 4.8,
    reviews: 678,
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=200&h=200&fit=crop',
    weight: '500g',
    description: 'Aromatic blend of finest spices for authentic flavor.'
  },
  {
    id: 'p8',
    name: 'Fresh Chicken Drumsticks',
    sku: 'MEAT-CD-2KG',
    category: 'Dice',
    brand: 'KyoudaiMart Fresh',
    price: 14.99,
    stock: 45,
    status: 'in_stock',
    rating: 4.7,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=200&h=200&fit=crop',
    weight: '2 KG',
    description: 'Fresh halal chicken drumsticks, perfect for grilling.'
  }
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    customer: 'Nishrita Shrestha',
    email: 'nishrita@email.com',
    date: '2024-01-15T10:30:00',
    status: 'delivered',
    items: 5,
    total: 78.45,
    paymentMethod: 'Credit Card',
    paymentStatus: 'paid'
  },
  {
    id: 'ORD-2024-002',
    customer: 'Rajesh Kumar',
    email: 'rajesh.k@email.com',
    date: '2024-01-15T14:22:00',
    status: 'processing',
    items: 3,
    total: 45.99,
    paymentMethod: 'PayPal',
    paymentStatus: 'paid'
  },
  {
    id: 'ORD-2024-003',
    customer: 'Priya Patel',
    email: 'priya.p@email.com',
    date: '2024-01-15T16:45:00',
    status: 'pending',
    items: 8,
    total: 124.50,
    paymentMethod: 'Credit Card',
    paymentStatus: 'pending'
  },
  {
    id: 'ORD-2024-004',
    customer: 'Amit Sharma',
    email: 'amit.s@email.com',
    date: '2024-01-14T09:15:00',
    status: 'shipped',
    items: 2,
    total: 32.99,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'pending'
  },
  {
    id: 'ORD-2024-005',
    customer: 'Sunita Thapa',
    email: 'sunita.t@email.com',
    date: '2024-01-14T11:30:00',
    status: 'cancelled',
    items: 4,
    total: 56.75,
    paymentMethod: 'Credit Card',
    paymentStatus: 'refunded'
  },
  {
    id: 'ORD-2024-006',
    customer: 'Deepak Gurung',
    email: 'deepak.g@email.com',
    date: '2024-01-14T15:00:00',
    status: 'delivered',
    items: 6,
    total: 89.99,
    paymentMethod: 'PayPal',
    paymentStatus: 'paid'
  },
  {
    id: 'ORD-2024-007',
    customer: 'Maya Rai',
    email: 'maya.r@email.com',
    date: '2024-01-13T12:20:00',
    status: 'refunded',
    items: 1,
    total: 24.99,
    paymentMethod: 'Credit Card',
    paymentStatus: 'refunded'
  },
  {
    id: 'ORD-2024-008',
    customer: 'Bikash Tamang',
    email: 'bikash.t@email.com',
    date: '2024-01-13T17:45:00',
    status: 'processing',
    items: 7,
    total: 156.80,
    paymentMethod: 'Credit Card',
    paymentStatus: 'paid'
  }
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Nishrita Shrestha',
    email: 'nishrita@email.com',
    phone: '+1 234-567-8901',
    role: 'customer',
    status: 'active',
    registeredAt: '2023-06-15',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    orders: 12,
    totalSpent: 456.78
  },
  {
    id: 'u2',
    name: 'Rajesh Kumar',
    email: 'rajesh.k@email.com',
    phone: '+1 234-567-8902',
    role: 'customer',
    status: 'active',
    registeredAt: '2023-08-22',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    orders: 8,
    totalSpent: 234.50
  },
  {
    id: 'u3',
    name: 'Admin User',
    email: 'admin@kyoudaimart.com',
    phone: '+1 234-567-8900',
    role: 'admin',
    status: 'active',
    registeredAt: '2023-01-01',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    orders: 0,
    totalSpent: 0
  },
  {
    id: 'u4',
    name: 'Priya Patel',
    email: 'priya.p@email.com',
    phone: '+1 234-567-8903',
    role: 'customer',
    status: 'inactive',
    registeredAt: '2023-09-10',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    orders: 3,
    totalSpent: 89.99
  },
  {
    id: 'u5',
    name: 'Store Manager',
    email: 'manager@kyoudaimart.com',
    phone: '+1 234-567-8904',
    role: 'moderator',
    status: 'active',
    registeredAt: '2023-02-15',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    orders: 0,
    totalSpent: 0
  },
  {
    id: 'u6',
    name: 'Sunita Thapa',
    email: 'sunita.t@email.com',
    phone: '+1 234-567-8905',
    role: 'customer',
    status: 'suspended',
    registeredAt: '2023-11-20',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    orders: 5,
    totalSpent: 156.45
  }
];

// Mock Categories
export const mockCategories: Category[] = [
  { id: 'c1', name: 'Rice', slug: 'rice', productCount: 24, status: 'active' },
  { id: 'c2', name: 'Spice', slug: 'spice', productCount: 156, status: 'active' },
  { id: 'c3', name: 'Dice', slug: 'dice', productCount: 45, status: 'active' },
  { id: 'c4', name: 'Noodles', slug: 'noodles', productCount: 38, status: 'active' },
  { id: 'c5', name: 'Lentils & Beans', slug: 'lentils-beans', productCount: 67, status: 'active' },
  { id: 'c6', name: 'Fridge & Freezers', slug: 'fridge-freezers', productCount: 89, status: 'active' },
  { id: 'c7', name: 'Pantry Items', slug: 'pantry-items', productCount: 234, status: 'active' },
  { id: 'c8', name: 'Beverages', slug: 'beverages', productCount: 56, status: 'inactive' }
];

// Mock Brands
export const mockBrands: Brand[] = [
  { id: 'b1', name: 'India Gate', logo: '🌾', productCount: 12, featured: true },
  { id: 'b2', name: 'Wai Wai', logo: '🍜', productCount: 8, featured: true },
  { id: 'b3', name: 'Everest', logo: '🏔️', productCount: 34, featured: true },
  { id: 'b4', name: 'MDH', logo: '🌶️', productCount: 45, featured: true },
  { id: 'b5', name: 'Amul', logo: '🥛', productCount: 23, featured: false },
  { id: 'b6', name: 'Tata Sampann', logo: '🫘', productCount: 18, featured: false },
  { id: 'b7', name: 'KyoudaiMart Fresh', logo: '🥬', productCount: 56, featured: true }
];

// Mock Discounts
export const mockDiscounts: Discount[] = [
  {
    id: 'd1',
    code: 'TAZZA20',
    type: 'percentage',
    value: 20,
    usageCount: 145,
    usageLimit: 500,
    validFrom: '2024-01-01',
    validTo: '2024-01-31',
    status: 'active'
  },
  {
    id: 'd2',
    code: 'FREESHIP',
    type: 'free_shipping',
    value: 0,
    usageCount: 89,
    usageLimit: 200,
    validFrom: '2024-01-01',
    validTo: '2024-02-28',
    status: 'active'
  },
  {
    id: 'd3',
    code: 'SAVE10',
    type: 'fixed',
    value: 10,
    usageCount: 200,
    usageLimit: 200,
    validFrom: '2023-12-01',
    validTo: '2023-12-31',
    status: 'expired'
  },
  {
    id: 'd4',
    code: 'SPRING25',
    type: 'percentage',
    value: 25,
    usageCount: 0,
    usageLimit: 300,
    validFrom: '2024-03-01',
    validTo: '2024-03-31',
    status: 'scheduled'
  }
];

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: 'r1',
    productId: 'p1',
    productName: 'India Gate Basmati Rice',
    customer: 'Nishrita Shrestha',
    rating: 5,
    comment: 'Best basmati rice I have ever had! Long grains and amazing aroma.',
    date: '2024-01-15',
    status: 'approved'
  },
  {
    id: 'r2',
    productId: 'p2',
    productName: 'Wai Wai Instant Noodles',
    customer: 'Rajesh Kumar',
    rating: 4,
    comment: 'Tastes just like home! Perfect for a quick snack.',
    date: '2024-01-14',
    status: 'approved'
  },
  {
    id: 'r3',
    productId: 'p3',
    productName: 'Fresh Goat Meat (Khasi)',
    customer: 'Priya Patel',
    rating: 5,
    comment: 'Very fresh and properly cut. Will order again!',
    date: '2024-01-13',
    status: 'pending'
  },
  {
    id: 'r4',
    productId: 'p4',
    productName: 'Everest Meat Masala',
    customer: 'Amit Sharma',
    rating: 2,
    comment: 'Package was damaged. Product leaked inside.',
    date: '2024-01-12',
    status: 'pending'
  },
  {
    id: 'r5',
    productId: 'p6',
    productName: 'Amul Pure Ghee',
    customer: 'Maya Rai',
    rating: 5,
    comment: 'Authentic taste and quality. My family loves it!',
    date: '2024-01-11',
    status: 'approved'
  }
];

// Dashboard Stats
export const dashboardStats = {
  revenue: {
    total: 45678.90,
    change: 12.5,
    period: 'vs last month'
  },
  orders: {
    total: 342,
    pending: 28,
    processing: 15,
    completed: 299
  },
  users: {
    total: 1256,
    active: 892,
    new: 45
  },
  inventory: {
    total: 8,
    lowStock: 2,
    outOfStock: 1
  },
  payments: {
    healthy: 94,
    failed: 6
  }
};

// Sales data for charts
export const salesData = [
  { name: 'Mon', sales: 4200, orders: 42 },
  { name: 'Tue', sales: 3800, orders: 38 },
  { name: 'Wed', sales: 5100, orders: 51 },
  { name: 'Thu', sales: 4800, orders: 48 },
  { name: 'Fri', sales: 6200, orders: 62 },
  { name: 'Sat', sales: 7500, orders: 75 },
  { name: 'Sun', sales: 5400, orders: 54 }
];

// Order status distribution
export const orderStatusData = [
  { name: 'Delivered', value: 65, color: 'hsl(142, 70%, 40%)' },
  { name: 'Processing', value: 15, color: 'hsl(35, 85%, 55%)' },
  { name: 'Pending', value: 12, color: 'hsl(217, 91%, 60%)' },
  { name: 'Cancelled', value: 8, color: 'hsl(0, 84%, 60%)' }
];

// Top selling products
export const topProducts = [
  { name: 'India Gate Basmati Rice', sales: 234, revenue: 4678.50 },
  { name: 'Wai Wai Instant Noodles', sales: 567, revenue: 9067.33 },
  { name: 'Fresh Goat Meat (Khasi)', sales: 189, revenue: 3590.11 },
  { name: 'Amul Pure Ghee', sales: 156, revenue: 3118.44 },
  { name: 'MDH Garam Masala', sales: 234, revenue: 2103.66 }
];
