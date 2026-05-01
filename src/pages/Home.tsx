import { ArrowRight, ShieldCheck, Zap, Headphones, Fan, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkSupabaseSetup, supabase } from '../lib/supabase';
import { Product } from '../store';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      if (!checkSupabaseSetup()) {
        // Mock data when env vars are missing
        setFeaturedProducts([
          { id: '1', name: 'Ultra Smartwatch Plus', price: 25000, description: 'Premium smartwatch with heart rate monitor, calls, and 7-day battery.', image_url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800' },
          { id: '2', name: 'Pro Earbuds Noise Cancelling', price: 15000, description: 'Crystal clear sound with active noise cancellation and deep bass.', image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800' },
          { id: '3', name: 'Rechargeable Power Fan', price: 18000, description: 'Strong breeze, built-in LED light, and power bank function.', image_url: 'https://images.unsplash.com/photo-1614731306385-e11de6e75554?auto=format&fit=crop&q=80&w=800' },
        ]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(3)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
      } else if (data) {
        setFeaturedProducts(data);
      }
      setLoading(false);
    }
    fetchFeatured();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-blue-500 blur-3xl transform rotate-12"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-center lg:text-left space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              Upgrade Your Life With <span className="text-yellow-400">Premium Gadgets</span>
            </h1>
            <p className="text-lg text-blue-100 max-w-xl mx-auto lg:mx-0">
              Discover the latest smartwatches, high-fidelity earbuds, and powerful rechargeable fans. Quality you can trust at unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/products"
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                Shop Now <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-sm font-semibold text-blue-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-yellow-400" /> Quality Guaranteed
              </div>
              <div className="flex items-center gap-2">
                <Zap className="text-yellow-400" /> Fast Delivery
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 relative group">
            <div className="absolute -inset-4 bg-yellow-400/20 rounded-full blur-3xl group-hover:bg-yellow-400/30 transition-all duration-500"></div>
            <img 
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800" 
              alt="Premium Gadgets" 
              className="relative rounded-2xl shadow-2xl transform rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500 ease-out z-10 border-4 border-blue-800"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-2xl p-8 text-center group hover:bg-blue-900 transition-colors duration-300 cursor-pointer">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                ⌚
              </div>
              <h3 className="text-xl font-bold text-blue-900 group-hover:text-yellow-400 mb-2">Smartwatches</h3>
              <p className="text-gray-600 group-hover:text-blue-100 mb-4">Stay connected on the go.</p>
              <Link to="/products" className="text-blue-600 group-hover:text-white font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Browse <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-8 text-center group hover:bg-blue-900 transition-colors duration-300 cursor-pointer">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Headphones className="text-blue-900" size={32} />
              </div>
              <h3 className="text-xl font-bold text-blue-900 group-hover:text-yellow-400 mb-2">Earbuds</h3>
              <p className="text-gray-600 group-hover:text-blue-100 mb-4">Immersive sound experience.</p>
              <Link to="/products" className="text-blue-600 group-hover:text-white font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Browse <ArrowRight size={16} />
              </Link>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8 text-center group hover:bg-blue-900 transition-colors duration-300 cursor-pointer">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Fan className="text-blue-900" size={32} />
              </div>
              <h3 className="text-xl font-bold text-blue-900 group-hover:text-yellow-400 mb-2">Rechargeable Fans</h3>
              <p className="text-gray-600 group-hover:text-blue-100 mb-4">Beat the heat anywhere.</p>
              <Link to="/products" className="text-blue-600 group-hover:text-white font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Browse <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black text-blue-900 mb-2">Featured Products</h2>
              <p className="text-gray-600">Handpicked gadgets just for you.</p>
            </div>
            <Link to="/products" className="hidden sm:inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
              View all products <ArrowRight size={20} />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-yellow-400"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.length > 0 ? (
                featuredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No products available right now.
                </div>
              )}
            </div>
          )}
          
          <div className="mt-8 text-center sm:hidden">
            <Link to="/products" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
              View all products <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-yellow-400 text-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black mb-6">Why Choose Al Ishbeeliy Gadgets?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="bg-white/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">100% Original</h3>
              <p className="text-blue-800 font-medium">We source directly from trusted manufacturers.</p>
            </div>
            <div>
              <div className="bg-white/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Dispatch</h3>
              <p className="text-blue-800 font-medium">Orders are processed within 24 hours.</p>
            </div>
            <div>
              <div className="bg-white/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <MessageCircle size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-blue-800 font-medium">We are always available via WhatsApp to help.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
