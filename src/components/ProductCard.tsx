import { ShoppingBag, Check } from 'lucide-react';
import { Product, useStore } from '../store';
import React, { useState } from 'react';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const addToCart = useStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden group border border-gray-100 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
            No Image
          </div>
        )}
        {/* Urgency Badge */}
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1 z-10">
          <span className="animate-pulse">⚡</span> Limited Stock
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-900 transition-colors line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </div>
        
        <p className="text-2xl font-black text-blue-900 mb-2">
          ₦{product.price.toLocaleString()}
        </p>
        
        <p className="text-gray-600 text-sm mb-6 line-clamp-2 flex-1">
          {product.description}
        </p>

        <button
          onClick={handleAddToCart}
          className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
            added 
              ? 'bg-green-500 text-white' 
              : 'bg-yellow-400 text-blue-900 hover:bg-yellow-500 hover:shadow-lg hover:-translate-y-1'
          }`}
        >
          {added ? (
            <>
              <Check size={20} />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingBag size={20} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
