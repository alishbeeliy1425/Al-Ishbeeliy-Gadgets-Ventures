import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../store';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useStore();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    let message = "Hello Al Ishbeeliy Gadgets! I want to order the following items:\n\n";
    cart.forEach(item => {
      message += `- ${item.name} (${item.quantity}x) = ₦${(item.price * item.quantity).toLocaleString()}\n`;
    });
    message += `\n*TOTAL: ₦${cartTotal().toLocaleString()}*`;
    message += `\n\nPlease let me know how to proceed with payment.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/2349032975386?text=${encodedMessage}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-gray-50 rounded-3xl p-12 max-w-2xl mx-auto border border-gray-100 shadow-sm">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl text-blue-900">🛒</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8 text-lg">Looks like you haven't added any premium gadgets to your cart yet.</p>
          <Link 
            to="/products"
            className="inline-flex items-center gap-2 bg-blue-900 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-800 transition-colors"
          >
            Start Shopping <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-black text-blue-900 mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {cart.map((item) => (
                <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6 group hover:bg-gray-50 transition-colors">
                  <div className="w-24 h-24 shrink-0 bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Image</div>
                    )}
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                    <p className="text-yellow-500 font-bold text-lg mt-1">₦{item.price.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center gap-4 bg-gray-100 rounded-full p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-blue-900 hover:bg-gray-50 transition-colors disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-6 text-center font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-blue-900 hover:bg-gray-50 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="flex items-center ml-4">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100 sticky top-24 shadow-sm">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                <span className="font-medium text-gray-900">₦{cartTotal().toLocaleString()}</span>
              </div>
            </div>
            
            <div className="border-t border-blue-200 pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold text-blue-900">Total</span>
                <span className="text-3xl font-black text-blue-900">₦{cartTotal().toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full bg-yellow-400 text-blue-900 py-4 rounded-xl font-bold text-lg hover:bg-yellow-500 hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              Checkout on WhatsApp
            </button>
            <p className="text-center text-sm text-gray-500 mt-4">
              Secure checkout. No hidden fees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
