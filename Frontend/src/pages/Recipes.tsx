import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Users, ChefHat, ShoppingCart, ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

interface Recipe {
  id: string;
  title: string;
  slug: string;
  image: string;
  description: string;
  cookTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  ingredients: { name: string; amount: string; productSlug?: string }[];
  steps: string[];
  tags: string[];
}

const recipes: Recipe[] = [
  {
    id: 'r1',
    title: 'Classic Chicken Biryani',
    slug: 'classic-chicken-biryani',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop',
    description: 'Aromatic basmati rice layered with tender spiced chicken, saffron, and caramelized onions.',
    cookTime: '1 hr 30 min',
    servings: 6,
    difficulty: 'Medium',
    category: 'Main Course',
    ingredients: [
      { name: 'Basmati Rice', amount: '500g', productSlug: 'india-gate-basmati-rice-5kg' },
      { name: 'Chicken Drumsticks', amount: '1 kg', productSlug: 'fresh-chicken-drumsticks-2kg' },
      { name: 'Garam Masala', amount: '2 tbsp', productSlug: 'mdh-garam-masala-500g' },
      { name: 'Cumin Seeds', amount: '1 tsp', productSlug: 'cumin-seeds-jeera-250g' },
      { name: 'Yogurt', amount: '1 cup' },
      { name: 'Onions', amount: '3 large' },
      { name: 'Saffron', amount: 'a pinch' },
    ],
    steps: [
      'Marinate chicken with yogurt, garam masala, and salt for 1 hour.',
      'Soak basmati rice for 30 minutes, then parboil until 70% cooked.',
      'Fry sliced onions until deep golden brown. Set aside.',
      'Layer marinated chicken, rice, fried onions, and saffron milk in a heavy pot.',
      'Seal the pot and cook on low heat (dum) for 25-30 minutes.',
      'Gently mix and serve with raita.',
    ],
    tags: ['biryani', 'chicken', 'rice', 'indian'],
  },
  {
    id: 'r2',
    title: 'Nepali Chicken Momo',
    slug: 'nepali-chicken-momo',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&h=400&fit=crop',
    description: 'Juicy steamed dumplings filled with spiced chicken, served with fiery tomato chutney.',
    cookTime: '1 hr',
    servings: 4,
    difficulty: 'Medium',
    category: 'Appetizer',
    ingredients: [
      { name: 'All-purpose Flour', amount: '2 cups' },
      { name: 'Chicken Mince', amount: '500g' },
      { name: 'Cumin Seeds', amount: '1 tsp', productSlug: 'cumin-seeds-jeera-250g' },
      { name: 'Ginger-Garlic Paste', amount: '1 tbsp' },
      { name: 'Onions', amount: '2 medium' },
      { name: 'Cilantro', amount: 'a handful' },
    ],
    steps: [
      'Knead flour with water into a smooth dough. Rest for 20 minutes.',
      'Mix chicken mince with finely chopped onions, cumin, ginger-garlic paste, and cilantro.',
      'Roll small dough circles and fill with the chicken mixture.',
      'Pleat and seal each momo into crescent shapes.',
      'Steam for 12-15 minutes until cooked through.',
      'Serve hot with spicy tomato achar (chutney).',
    ],
    tags: ['momo', 'nepali', 'dumpling', 'steamed'],
  },
  {
    id: 'r3',
    title: 'Dal Tadka',
    slug: 'dal-tadka',
    image: 'https://images.unsplash.com/photo-1585996746155-25f3e549d7ea?w=600&h=400&fit=crop',
    description: 'Creamy yellow lentils tempered with aromatic spices — the ultimate comfort food.',
    cookTime: '40 min',
    servings: 4,
    difficulty: 'Easy',
    category: 'Main Course',
    ingredients: [
      { name: 'Toor Dal', amount: '1 cup', productSlug: 'toor-dal-arhar-2kg' },
      { name: 'Cumin Seeds', amount: '1 tsp', productSlug: 'cumin-seeds-jeera-250g' },
      { name: 'Ghee', amount: '2 tbsp', productSlug: 'amul-pure-ghee-1l' },
      { name: 'Turmeric', amount: '½ tsp' },
      { name: 'Tomatoes', amount: '2 medium' },
      { name: 'Green Chilies', amount: '2' },
    ],
    steps: [
      'Wash and pressure cook toor dal with turmeric until soft.',
      'Heat ghee in a pan. Add cumin seeds and let them splutter.',
      'Add chopped tomatoes, green chilies, and cook until soft.',
      'Pour the tempering over the cooked dal and mix well.',
      'Simmer for 5 minutes. Garnish with fresh cilantro.',
      'Serve hot with steamed rice or roti.',
    ],
    tags: ['dal', 'lentils', 'vegetarian', 'comfort'],
  },
  {
    id: 'r4',
    title: 'Goat Curry (Khasi ko Masu)',
    slug: 'goat-curry-khasi',
    image: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=600&h=400&fit=crop',
    description: 'Rich and hearty Nepali-style goat curry slow-cooked with traditional spices.',
    cookTime: '2 hrs',
    servings: 5,
    difficulty: 'Hard',
    category: 'Main Course',
    ingredients: [
      { name: 'Goat Meat', amount: '1 kg', productSlug: 'fresh-goat-meat-khasi-1kg' },
      { name: 'Meat Masala', amount: '2 tbsp', productSlug: 'everest-meat-masala-100g' },
      { name: 'Cumin Seeds', amount: '1 tsp', productSlug: 'cumin-seeds-jeera-250g' },
      { name: 'Garam Masala', amount: '1 tsp', productSlug: 'mdh-garam-masala-500g' },
      { name: 'Onions', amount: '3 large' },
      { name: 'Tomatoes', amount: '3 medium' },
      { name: 'Ginger-Garlic Paste', amount: '2 tbsp' },
    ],
    steps: [
      'Heat oil and fry onions until deeply caramelized.',
      'Add ginger-garlic paste and cook for 2 minutes.',
      'Add goat meat and sear on high heat until browned.',
      'Add meat masala, cumin, and tomatoes. Cook until oil separates.',
      'Add water, cover, and slow-cook on low for 1.5 hours until tender.',
      'Finish with garam masala. Serve with steamed rice.',
    ],
    tags: ['goat', 'curry', 'nepali', 'slow-cook'],
  },
  {
    id: 'r5',
    title: 'Quick Wai Wai Chow Mein',
    slug: 'wai-wai-chow-mein',
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=600&h=400&fit=crop',
    description: 'A quick street-style stir-fried noodle dish using Wai Wai instant noodles and fresh vegetables.',
    cookTime: '15 min',
    servings: 2,
    difficulty: 'Easy',
    category: 'Snack',
    ingredients: [
      { name: 'Wai Wai Noodles', amount: '2 packs', productSlug: 'wai-wai-instant-noodles-30pack' },
      { name: 'Bell Peppers', amount: '1 medium' },
      { name: 'Cabbage', amount: '1 cup shredded' },
      { name: 'Soy Sauce', amount: '2 tbsp' },
      { name: 'Spring Onions', amount: '3 stalks' },
    ],
    steps: [
      'Lightly crush the Wai Wai noodles and soak in hot water for 1 minute. Drain.',
      'Heat oil in a wok. Stir-fry vegetables on high heat for 2 minutes.',
      'Add drained noodles and the Wai Wai spice mix.',
      'Add soy sauce and toss everything together for 2 minutes.',
      'Garnish with spring onions and serve immediately.',
    ],
    tags: ['noodles', 'quick', 'street-food', 'wai-wai'],
  },
  {
    id: 'r6',
    title: 'Chana Dal Fry',
    slug: 'chana-dal-fry',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop',
    description: 'Nutty split chickpeas cooked with onion, tomato, and a smoky cumin tadka.',
    cookTime: '45 min',
    servings: 4,
    difficulty: 'Easy',
    category: 'Main Course',
    ingredients: [
      { name: 'Chana Dal', amount: '1 cup', productSlug: 'chana-dal-1kg' },
      { name: 'Cumin Seeds', amount: '1 tsp', productSlug: 'cumin-seeds-jeera-250g' },
      { name: 'Ghee', amount: '1 tbsp', productSlug: 'amul-pure-ghee-1l' },
      { name: 'Onions', amount: '1 large' },
      { name: 'Tomatoes', amount: '2 medium' },
      { name: 'Red Chili Powder', amount: '1 tsp' },
    ],
    steps: [
      'Soak chana dal for 30 minutes. Pressure cook until soft but not mushy.',
      'Heat ghee, add cumin seeds and let them crackle.',
      'Sauté onions until golden, then add tomatoes and cook down.',
      'Add cooked dal, red chili powder, salt, and simmer for 10 minutes.',
      'Garnish with fresh cilantro and a squeeze of lemon.',
      'Serve with rice or warm chapati.',
    ],
    tags: ['dal', 'chickpeas', 'vegetarian', 'protein'],
  },
];

const recipeCategories = ['All', 'Main Course', 'Appetizer', 'Snack'];

const difficultyColor = (d: string) => {
  if (d === 'Easy') return 'bg-green-100 text-green-800 border-green-200';
  if (d === 'Medium') return 'bg-amber-100 text-amber-800 border-amber-200';
  return 'bg-red-100 text-red-800 border-red-200';
};

export default function Recipes() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const { addToCart } = useCart();

  const filtered = recipes.filter(r => {
    const matchCategory = activeCategory === 'All' || r.category === activeCategory;
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some(t => t.includes(search.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const getProduct = (slug: string) => products.find(p => p.slug === slug);

  if (selectedRecipe) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => setSelectedRecipe(null)} className="mb-6 text-muted-foreground">
            ← Back to Recipes
          </Button>

          <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-full h-64 md:h-80 object-cover rounded-xl mb-6" />

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className={difficultyColor(selectedRecipe.difficulty)}>{selectedRecipe.difficulty}</Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground"><Clock className="w-4 h-4" />{selectedRecipe.cookTime}</span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground"><Users className="w-4 h-4" />{selectedRecipe.servings} servings</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-2">{selectedRecipe.title}</h1>
          <p className="text-muted-foreground mb-8">{selectedRecipe.description}</p>

          <Tabs defaultValue="ingredients" className="mb-8">
            <TabsList>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="steps">Steps</TabsTrigger>
            </TabsList>

            <TabsContent value="ingredients" className="mt-4 space-y-3">
              {selectedRecipe.ingredients.map((ing, i) => {
                const product = ing.productSlug ? getProduct(ing.productSlug) : null;
                return (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div>
                      <span className="font-medium text-foreground">{ing.name}</span>
                      <span className="text-muted-foreground ml-2 text-sm">— {ing.amount}</span>
                    </div>
                    {product && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-xs border-primary/30 hover:bg-primary hover:text-primary-foreground"
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        ${product.price.toFixed(2)}
                      </Button>
                    )}
                  </div>
                );
              })}

              {selectedRecipe.ingredients.some(ing => ing.productSlug) && (
                <Button
                  className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => {
                    selectedRecipe.ingredients.forEach(ing => {
                      if (ing.productSlug) {
                        const product = getProduct(ing.productSlug);
                        if (product) addToCart(product);
                      }
                    });
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add All Available Ingredients to Cart
                </Button>
              )}
            </TabsContent>

            <TabsContent value="steps" className="mt-4 space-y-4">
              {selectedRecipe.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </div>
                  <p className="text-foreground pt-1">{step}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <ChefHat className="w-8 h-8 text-accent" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground font-serif">Recipes & Inspiration</h1>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover authentic recipes using products from our store. Cook, shop, and enjoy!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {recipeCategories.map(cat => (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <ChefHat className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p>No recipes found. Try a different search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(recipe => (
              <Card
                key={recipe.id}
                className="overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow border-border"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <Badge className={`absolute top-3 right-3 ${difficultyColor(recipe.difficulty)}`}>
                    {recipe.difficulty}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">{recipe.category}</p>
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{recipe.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{recipe.cookTime}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{recipe.servings} servings</span>
                    <span className="flex items-center gap-1 text-primary font-medium">
                      Shop <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
