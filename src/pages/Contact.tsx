import { Mail, Phone, MapPin, Send } from 'lucide-react';
import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:alishbeeliygadgets@gmail.com?subject=Contact form from ${formData.name}&body=${encodeURIComponent(formData.message + "\n\nEmail: " + formData.email)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-blue-900 mb-4">Get In Touch</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Have a question about our products or want to make a bulk order? Drop us a line and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto mb-16">
        {/* Contact Info */}
        <div className="lg:w-1/3 space-y-8 bg-blue-900 text-white rounded-3xl p-10 shadow-xl">
          <h3 className="text-2xl font-bold text-yellow-400 mb-8">Contact Info</h3>
          
          <div className="flex items-start gap-4">
            <div className="bg-blue-800 p-3 rounded-full">
              <Phone className="text-yellow-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-200 mb-1">Phone / WhatsApp</p>
              <p className="font-mono text-lg">+234 903 297 5386</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="bg-blue-800 p-3 rounded-full">
              <Mail className="text-yellow-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-200 mb-1">Email</p>
              <p className="font-medium">alishbeeliygadgets@gmail.com</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="bg-blue-800 p-3 rounded-full">
              <MapPin className="text-yellow-400 shrink-0" />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-200 mb-1">Location</p>
              <p className="font-medium">Stepping Stone Close Along Akoda Road Ededimeji Ede Osun State Nigeria</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:w-2/3 bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Send us a message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-shadow bg-gray-50 focus:bg-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-shadow bg-gray-50 focus:bg-white"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-shadow bg-gray-50 focus:bg-white resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-xl hover:bg-yellow-500 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              Send Message <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-5xl mx-auto bg-gray-200 rounded-3xl overflow-hidden shadow-sm h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15826.974950346045!2d4.444772186847844!3d7.701192934272183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10377c862df15555%3A0x6d9f67a6d80fc1c7!2sEde%2C%20Osun!5e0!3m2!1sen!2sng!4v1709400000000!5m2!1sen!2sng"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps Location for Al Ishbeeliy Gadgets"
        ></iframe>
      </div>
    </div>
  );
}
