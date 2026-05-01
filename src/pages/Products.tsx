import { useEffect, useState } from 'react';
import { checkSupabaseSetup, supabase } from '../lib/supabase';
import { Product } from '../store';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      if (!checkSupabaseSetup()) {
        // Mock data when env vars are missing
        setProducts([
          { id: '1', name: 'Ultra Smartwatch Plus', price: 25000, description: 'Premium smartwatch with heart rate monitor, calls, and 7-day battery.', image_url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800' },
          { id: '2', name: 'Pro Earbuds Noise Cancelling', price: 15000, description: 'Crystal clear sound with active noise cancellation and deep bass.', image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800' },
          { id: '3', name: 'Rechargeable Power Fan 18"', price: 18000, description: 'Strong breeze, built-in LED light, and power bank function.', image_url: 'https://images.unsplash.com/photo-1614731306385-e11de6e75554?auto=format&fit=crop&q=80&w=800' },
          { id: '4', name: 'Bluetooth Sport Earbuds', price: 12000, description: 'Sweatproof earbuds perfect for gym and outdoor running.', image_url: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?auto=format&fit=crop&q=80&w=800' },
          { id: '5', name: 'Mini Handheld Fan', price: 5000, description: 'Portable and rechargeable fan with 3 speeds.', image_url: 'https://images.unsplash.com/photo-1599587443194-672583e74a80?auto=format&fit=crop&q=80&w=800' },
        ]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
      } else if (data) {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-blue-900 mb-4">Our Collection</h1>
          <p className="text-gray-600 text-lg">Browse our premium selection of smart and practical gadgets.</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-shadow"
          />
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-yellow-400"></div>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">We couldn't find any products matching your search.</p>
        </div>
      )}
    </div>
  );
}
