import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, ShieldAlert } from 'lucide-react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../store';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemCount = useStore((state) => state.cart.reduce((acc, item) => acc + item.quantity, 0));
  const { siteName, siteLogo } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="flex min-h-screen flex-col font-sans bg-gray-50">
      {/* Top Banner - Removed promotional text per request but kept admin icon for access */}
      <div className="bg-yellow-400 text-blue-900 px-4 py-2 text-right h-8 relative">
        <button 
          onClick={handleAdminClick} 
          className="absolute right-4 top-1.5 p-1 rounded hover:bg-yellow-500 transition-colors"
          title="Admin Access"
        >
          <ShieldAlert size={16} />
        </button>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-blue-900 border-b border-blue-800 shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2 group">
                {siteLogo ? (
                  <img src={siteLogo} alt={siteName} className="h-8 max-w-xs object-contain group-hover:scale-105 transition-transform" />
                ) : (
                  <span className="bg-yellow-400 text-blue-900 p-1.5 rounded group-hover:scale-105 transition-transform">AI</span>
                )}
                <span className="truncate max-w-[150px] sm:max-w-none">{siteName}</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block flex-1">
              <div className="ml-10 flex items-center justify-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3 py-2 text-sm font-medium transition-colors hover:text-yellow-400 ${
                      location.pathname === link.path ? 'text-yellow-400' : 'text-gray-200'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Cart Icon */}
            <div className="flex items-center gap-4">
              <Link to="/cart" className="relative p-2 text-gray-200 hover:text-yellow-400 transition-colors group">
                <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-blue-900 transform translate-x-1/4 -translate-y-1/4 bg-yellow-400 border-2 border-white rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <div className="flex md:hidden">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-blue-800 focus:outline-none"
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-blue-800 bg-blue-900">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path
                      ? 'bg-blue-800 text-yellow-400'
                      : 'text-gray-200 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:bg-blue-800 hover:text-yellow-400"
              >
                Admin Area
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full relative">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-blue-950 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">{siteName}</h3>
              <p className="text-sm">Premium smartwatches, earbuds, and rechargeable fans at unbeatable prices.</p>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/products" className="hover:text-yellow-400 transition-colors">Shop All</Link></li>
                <li><Link to="/about" className="hover:text-yellow-400 transition-colors">Our Story</Link></li>
                <li><Link to="/contact" className="hover:text-yellow-400 transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>📍 Stepping Stone Close Along Akoda Road Ededimeji Ede Osun State Nigeria</li>
                <li>📞 +234 903 297 5386</li>
                <li>✉️ alishbeeliygadgets@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-900 mt-8 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
