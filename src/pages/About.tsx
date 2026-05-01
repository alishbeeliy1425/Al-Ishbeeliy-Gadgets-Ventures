import { CheckCircle } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-6">Our Story</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Bringing premium tech gadgets to the heart of Nigeria. We believe everyone deserves quality electronics without breaking the bank.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold border-l-4 border-yellow-400 pl-4 mb-6 text-blue-900">
              Welcome to Al Ishbeeliy Gadgets Ventures
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              Founded with the vision to provide Nigerians with absolute premium gadgets, we specialize in high-quality smartwatches, noise-canceling earbuds, and reliable rechargeable fans.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              We know how frustrating it is to deal with counterfeit products and unreliable sellers. That's why every product in our catalogue is rigorously tested to meet global quality standards.
            </p>
            
            <div className="space-y-4 className=mt-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-yellow-500" />
                <span className="font-semibold text-gray-800">100% Quality Assured</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-yellow-500" />
                <span className="font-semibold text-gray-800">Best Prices in the Market</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-yellow-500" />
                <span className="font-semibold text-gray-800">Customer Satisfaction First</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=600" alt="Gadgets 1" className="rounded-2xl shadow-lg w-full h-64 object-cover transform translate-y-8" />
              <img src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600" alt="Gadgets 2" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
