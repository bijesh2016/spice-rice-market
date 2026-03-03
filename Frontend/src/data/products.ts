// Product data for customer-facing pages

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  categorySlug: string;
  brand: string;
  weight: string;
  badge?: string;
  description: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  tags: string[];
  isHalal?: boolean;
  isVegetarian?: boolean;
  isFeatured?: boolean;
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'India Gate Basmati Rice',
    slug: 'india-gate-basmati-rice-5kg',
    price: 19.99,
    originalPrice: 24.99,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&h=600&fit=crop'
    ],
    category: 'Rice',
    categorySlug: 'rice',
    brand: 'India Gate',
    weight: '5 KG',
    badge: 'Best Seller',
    description: 'Premium aged basmati rice with extra-long grains and aromatic flavor. Perfect for biryani and pulao.',
    rating: 4.8,
    reviewCount: 234,
    inStock: true,
    stockCount: 150,
    tags: ['basmati', 'premium', 'aged'],
    isVegetarian: true,
    isFeatured: true
  },
  {
    id: 'p2',
    name: 'Wai Wai Instant Noodles',
    slug: 'wai-wai-instant-noodles-30pack',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600&h=600&fit=crop'
    ],
    category: 'Noodles',
    categorySlug: 'noodles',
    brand: 'Wai Wai',
    weight: '30 Pack',
    badge: 'Popular',
    description: 'Classic Nepali instant noodles with authentic spice mix. Ready in 2 minutes.',
    rating: 4.5,
    reviewCount: 567,
    inStock: true,
    stockCount: 320,
    tags: ['instant', 'nepali', 'snack'],
    isVegetarian: true,
    isFeatured: true
  },
  {
    id: 'p3',
    name: 'Fresh Goat Meat (Khasi)',
    slug: 'fresh-goat-meat-khasi-1kg',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=600&h=600&fit=crop'
    ],
    category: 'Dice',
    categorySlug: 'dice',
    brand: 'KyoudaiMart Fresh',
    weight: '1 KG',
    badge: 'Fresh',
    description: 'Premium fresh goat meat, halal certified. Perfect for curry and stew.',
    rating: 4.9,
    reviewCount: 189,
    inStock: true,
    stockCount: 25,
    tags: ['fresh', 'halal', 'premium'],
    isHalal: true,
    isFeatured: true
  },
  {
    id: 'p4',
    name: 'Everest Meat Masala',
    slug: 'everest-meat-masala-100g',
    price: 3.99,
    originalPrice: 4.99,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=600&fit=crop'
    ],
    category: 'Spice',
    categorySlug: 'spice',
    brand: 'Everest',
    weight: '100g',
    description: 'Perfect blend for meat dishes with authentic Indian flavors.',
    rating: 4.7,
    reviewCount: 423,
    inStock: true,
    stockCount: 200,
    tags: ['masala', 'spice', 'meat'],
    isVegetarian: true
  },
  {
    id: 'p5',
    name: 'Toor Dal (Arhar)',
    slug: 'toor-dal-arhar-2kg',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1585996746155-25f3e549d7ea?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1585996746155-25f3e549d7ea?w=600&h=600&fit=crop'
    ],
    category: 'Lentils & Beans',
    categorySlug: 'lentils-beans',
    brand: 'Tata Sampann',
    weight: '2 KG',
    description: 'Premium quality yellow lentils with high protein content.',
    rating: 4.6,
    reviewCount: 156,
    inStock: true,
    stockCount: 89,
    tags: ['lentils', 'protein', 'dal'],
    isVegetarian: true
  },
  {
    id: 'p6',
    name: 'Amul Pure Ghee',
    slug: 'amul-pure-ghee-1l',
    price: 19.99,
    originalPrice: 22.99,
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&h=600&fit=crop'
    ],
    category: 'Fridge & Freezers',
    categorySlug: 'fridge-freezers',
    brand: 'Amul',
    weight: '1 Litre',
    badge: 'Best Seller',
    description: 'Pure cow ghee made from fresh cream. Rich aroma and taste.',
    rating: 4.9,
    reviewCount: 892,
    inStock: true,
    stockCount: 67,
    tags: ['ghee', 'dairy', 'pure'],
    isVegetarian: true,
    isFeatured: true
  },
  {
    id: 'p7',
    name: 'MDH Garam Masala',
    slug: 'mdh-garam-masala-500g',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&h=600&fit=crop'
    ],
    category: 'Spice',
    categorySlug: 'spice',
    brand: 'MDH',
    weight: '500g',
    description: 'Aromatic blend of finest spices for authentic flavor in all dishes.',
    rating: 4.8,
    reviewCount: 678,
    inStock: true,
    stockCount: 234,
    tags: ['masala', 'spice', 'aromatic'],
    isVegetarian: true
  },
  {
    id: 'p8',
    name: 'Fresh Chicken Drumsticks',
    slug: 'fresh-chicken-drumsticks-2kg',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=600&h=600&fit=crop'
    ],
    category: 'Dice',
    categorySlug: 'dice',
    brand: 'KyoudaiMart Fresh',
    weight: '2 KG',
    badge: 'Fresh',
    description: 'Fresh halal chicken drumsticks, perfect for grilling or curry.',
    rating: 4.7,
    reviewCount: 234,
    inStock: true,
    stockCount: 45,
    tags: ['chicken', 'fresh', 'halal'],
    isHalal: true
  },
  {
    id: 'p9',
    name: 'Sona Masoori Rice',
    slug: 'sona-masoori-rice-10kg',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=600&fit=crop'
    ],
    category: 'Rice',
    categorySlug: 'rice',
    brand: 'India Gate',
    weight: '10 KG',
    description: 'Light and aromatic Sona Masoori rice, perfect for everyday meals.',
    rating: 4.5,
    reviewCount: 312,
    inStock: true,
    stockCount: 78,
    tags: ['rice', 'everyday', 'aromatic'],
    isVegetarian: true
  },
  {
    id: 'p10',
    name: 'Cumin Seeds (Jeera)',
    slug: 'cumin-seeds-jeera-250g',
    price: 5.49,
    image: 'https://images.unsplash.com/photo-1599909533681-74084e1b1e51?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1599909533681-74084e1b1e51?w=600&h=600&fit=crop'
    ],
    category: 'Spice',
    categorySlug: 'spice',
    brand: 'Everest',
    weight: '250g',
    description: 'Whole cumin seeds with strong aroma. Essential for Indian cooking.',
    rating: 4.6,
    reviewCount: 189,
    inStock: true,
    stockCount: 156,
    tags: ['cumin', 'whole spice', 'essential'],
    isVegetarian: true
  },
  {
    id: 'p11',
    name: 'Chana Dal',
    slug: 'chana-dal-1kg',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1585996746155-25f3e549d7ea?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1585996746155-25f3e549d7ea?w=600&h=600&fit=crop'
    ],
    category: 'Lentils & Beans',
    categorySlug: 'lentils-beans',
    brand: 'Tata Sampann',
    weight: '1 KG',
    description: 'Split chickpeas, high in protein and fiber. Great for dal and snacks.',
    rating: 4.4,
    reviewCount: 98,
    inStock: true,
    stockCount: 120,
    tags: ['dal', 'protein', 'chickpeas'],
    isVegetarian: true
  },
  {
    id: 'p12',
    name: 'Frozen Momo (Chicken)',
    slug: 'frozen-momo-chicken-50pcs',
    price: 12.99,
    originalPrice: 15.99,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&h=600&fit=crop'
    ],
    category: 'Fridge & Freezers',
    categorySlug: 'fridge-freezers',
    brand: 'KyoudaiMart Fresh',
    weight: '50 Pieces',
    badge: 'Popular',
    description: 'Ready-to-steam Nepali chicken momos. Authentic taste, convenience at home.',
    rating: 4.8,
    reviewCount: 456,
    inStock: true,
    stockCount: 34,
    tags: ['momo', 'frozen', 'nepali'],
    isHalal: true
  },
  {
    id: 'p13',
    name: 'Mustard Oil (Kachi Ghani)',
    slug: 'mustard-oil-kachi-ghani-1l',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=600&fit=crop'],
    category: 'Pantry Items',
    categorySlug: 'pantry',
    brand: 'Fortune',
    weight: '1 Litre',
    description: 'Cold-pressed mustard oil with strong aroma. Essential for Bengali and North Indian cooking.',
    rating: 4.5,
    reviewCount: 145,
    inStock: true,
    stockCount: 90,
    tags: ['oil', 'cooking', 'mustard'],
    isVegetarian: true
  },
  {
    id: 'p14',
    name: 'Aashirvaad Whole Wheat Atta',
    slug: 'aashirvaad-atta-5kg',
    price: 11.99,
    originalPrice: 13.99,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=600&fit=crop'],
    category: 'Pantry Items',
    categorySlug: 'pantry',
    brand: 'Aashirvaad',
    weight: '5 KG',
    badge: 'Best Seller',
    description: 'Premium whole wheat flour for soft rotis. Made from the finest MP wheat.',
    rating: 4.7,
    reviewCount: 534,
    inStock: true,
    stockCount: 200,
    tags: ['flour', 'wheat', 'atta'],
    isVegetarian: true,
    isFeatured: true
  },
  {
    id: 'p15',
    name: 'Jaggery (Gud) Block',
    slug: 'jaggery-gud-block-1kg',
    price: 6.49,
    image: 'https://images.unsplash.com/photo-1604431696980-07e518647610?w=400&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1604431696980-07e518647610?w=600&h=600&fit=crop'],
    category: 'Pantry Items',
    categorySlug: 'pantry',
    brand: 'Patanjali',
    weight: '1 KG',
    description: 'Natural unrefined cane jaggery. Rich in iron and minerals.',
    rating: 4.3,
    reviewCount: 87,
    inStock: true,
    stockCount: 65,
    tags: ['sweetener', 'natural', 'jaggery'],
    isVegetarian: true
  }
];

export const categories = [
  { name: 'All', slug: 'all', count: products.length },
  { name: 'Rice', slug: 'rice', count: products.filter(p => p.categorySlug === 'rice').length },
  { name: 'Spice', slug: 'spice', count: products.filter(p => p.categorySlug === 'spice').length },
  { name: 'Dice', slug: 'dice', count: products.filter(p => p.categorySlug === 'dice').length },
  { name: 'Noodles', slug: 'noodles', count: products.filter(p => p.categorySlug === 'noodles').length },
  { name: 'Lentils & Beans', slug: 'lentils-beans', count: products.filter(p => p.categorySlug === 'lentils-beans').length },
  { name: 'Fridge & Freezers', slug: 'fridge-freezers', count: products.filter(p => p.categorySlug === 'fridge-freezers').length },
  { name: 'Pantry Items', slug: 'pantry', count: products.filter(p => p.categorySlug === 'pantry').length },
];

export const brands = [
  'India Gate',
  'Wai Wai',
  'Everest',
  'MDH',
  'Amul',
  'Tata Sampann',
  'KyoudaiMart Fresh'
];

export const priceRanges = [
  { label: 'Under $5', min: 0, max: 5 },
  { label: '$5 - $10', min: 5, max: 10 },
  { label: '$10 - $20', min: 10, max: 20 },
  { label: 'Over $20', min: 20, max: Infinity },
];
