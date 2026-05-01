import React, { useState, useEffect } from 'react';
import { 
  Shield, Plus, Edit2, Trash2, Image as ImageIcon, 
  Package, ShoppingBag, LayoutDashboard, Star, Users, BarChart, Settings, Link as LinkIcon 
} from 'lucide-react';
import { supabase, checkSupabaseSetup } from '../lib/supabase';
import { Product, useStore } from '../store';

type Tab = 'dashboard' | 'products' | 'orders' | 'reviews' | 'customers' | 'analytics' | 'settings';

export default function Admin() {
  const { isAdminAuth, setAdminAuth, siteName, setSiteName, siteLogo, setSiteLogo, adminPassword, setAdminPassword } = useStore();
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('products');
  
  // Products State
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Orders State
  const [orders, setOrders] = useState<any[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image_url: '',
    video_url: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  // Settings State
  const [settingsForm, setSettingsForm] = useState({
    name: siteName,
    logo: siteLogo,
    newPassword: ''
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);

  useEffect(() => {
    if (isAdminAuth) {
      if (activeTab === 'products' || activeTab === 'dashboard') fetchProducts();
      if (activeTab === 'orders' || activeTab === 'dashboard') fetchOrders();
    }
  }, [isAdminAuth, activeTab]);

  const fetchProducts = async () => {
    if (!checkSupabaseSetup()) return;
    setLoading(true);
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  };

  const fetchOrders = async () => {
    if (!checkSupabaseSetup()) return;
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (data) setOrders(data);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setAdminAuth(true);
    } else {
      alert('Invalid password');
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!checkSupabaseSetup()) return '';
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filePath, file);

    if (uploadError) {
      alert(`Upload error: ${uploadError.message}`);
      return '';
    }

    const { data } = supabase.storage.from('products').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkSupabaseSetup()) {
      alert("Supabase not connected. Please set up env variables.");
      return;
    }

    setLoading(true);
    let finalImageUrl = formData.image_url;

    if (imageFile) {
      const uploadedUrl = await handleFileUpload(imageFile);
      if (uploadedUrl) finalImageUrl = uploadedUrl;
    }

    const payload = {
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      image_url: finalImageUrl,
      video_url: formData.video_url
    };

    if (editingProduct) {
      const { error } = await supabase.from('products').update(payload).eq('id', editingProduct.id);
      if (error) {
        alert(`Update failed: ${error.message}`);
        setLoading(false);
        return;
      }
    } else {
      const { error } = await supabase.from('products').insert([payload]);
      if (error) {
         alert(`Insert failed: ${error.message}`);
         setLoading(false);
         return;
      }
    }

    setIsFormOpen(false);
    setEditingProduct(null);
    setFormData({ name: '', price: '', description: '', image_url: '', video_url: '' });
    setImageFile(null);
    fetchProducts();
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) alert(`Delete failed: ${error.message}`);
    fetchProducts();
  };

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let finalLogoUrl = settingsForm.logo;
    if (logoFile) {
      const uploadedUrl = await handleFileUpload(logoFile);
      if (uploadedUrl) finalLogoUrl = uploadedUrl;
    }

    setSiteName(settingsForm.name);
    setSiteLogo(finalLogoUrl);
    
    if (settingsForm.newPassword) {
      setAdminPassword(settingsForm.newPassword);
    }
    
    setSettingsForm({ ...settingsForm, logo: finalLogoUrl, newPassword: '' });
    setLogoFile(null);
    alert('Settings saved successfully!');
  };

  if (!isAdminAuth) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md w-full">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="text-blue-900" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-shadow bg-gray-50 focus:bg-white"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition-colors"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Sidebar - Matching Screenshot Design */}
      <aside className="w-64 bg-[#2563eb] text-white flex flex-col shrink-0 min-h-screen">
        <div className="p-6 mt-4">
          <h2 className="text-2xl font-bold border-b border-blue-500/30 pb-4">Admin Panel</h2>
        </div>
        <nav className="flex-1 px-4 space-y-3 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-lg transition-colors ${
                activeTab === item.id 
                  ? 'bg-[#f59e0b] text-[#1e3a8a] font-semibold shadow-md' 
                  : 'hover:bg-blue-700 text-blue-50 font-normal'
              }`}
            >
              <item.icon size={22} className={activeTab === item.id ? "text-[#1e3a8a]" : "text-white"} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-blue-500/30 mt-auto">
          <button 
            onClick={() => setAdminAuth(false)}
            className="w-full py-3 bg-blue-700 hover:bg-blue-800 rounded-lg font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-800 capitalize">{activeTab}</h1>
        </div>

        {/* --- PRODUCTS TAB --- */}
        {activeTab === 'products' && (
          <div>
            {!isFormOpen ? (
              <div>
                <div className="flex justify-end mb-6">
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setFormData({ name: '', price: '', description: '', image_url: '', video_url: '' });
                      setIsFormOpen(true);
                    }}
                    className="bg-yellow-400 text-blue-900 px-4 py-2 font-bold rounded-lg hover:bg-yellow-500 transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <Plus size={18} /> Add New Product
                  </button>
                </div>

                {loading ? (
                  <div className="text-center py-12">Loading...</div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm">
                          <th className="p-4 font-semibold">Image</th>
                          <th className="p-4 font-semibold">Name</th>
                          <th className="p-4 font-semibold">Price</th>
                          <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {products.map(product => (
                          <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4">
                              {product.image_url ? (
                                <img src={product.image_url} alt={product.name} className="w-12 h-12 rounded object-cover" />
                              ) : (
                                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400"><ImageIcon size={16} /></div>
                              )}
                            </td>
                            <td className="p-4 font-medium text-gray-900">{product.name}</td>
                            <td className="p-4 text-gray-600">₦{product.price.toLocaleString()}</td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => {
                                  setEditingProduct(product);
                                  setFormData({
                                    name: product.name,
                                    price: product.price.toString(),
                                    description: product.description,
                                    image_url: product.image_url,
                                    video_url: product.video_url || ''
                                  });
                                  setIsFormOpen(true);
                                }}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors mr-2 text-xs"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors text-xs"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {products.length === 0 && (
                           <tr>
                             <td colSpan={4} className="p-8 text-center text-gray-500">No products found. Start by adding one!</td>
                           </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                <form onSubmit={handleProductSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (₦)</label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-dashed border-gray-300 rounded-xl p-4 text-center bg-gray-50">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)}
                        className="text-sm text-gray-500 w-full mb-2"
                      />
                      <div className="text-xs text-gray-400 my-2">- OR -</div>
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={formData.image_url}
                        onChange={e => setFormData({...formData, image_url: e.target.value})}
                        className="w-full px-3 py-1 rounded border border-gray-300 focus:outline-none text-sm"
                      />
                    </div>
                    
                    <div className="border border-dashed border-gray-300 rounded-xl p-4 text-center bg-gray-50">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Video Link (YouTube/Drive)</label>
                      <input
                        type="text"
                        placeholder="https://youtube.com/..."
                        value={formData.video_url}
                        onChange={e => setFormData({...formData, video_url: e.target.value})}
                        className="w-full px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm mt-3"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 mt-8">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-blue-900 text-white rounded-lg font-bold hover:bg-blue-800 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : 'Save Product'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* --- ORDERS TAB --- */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {orders.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm">
                    <th className="p-4 font-semibold">Order ID</th>
                    <th className="p-4 font-semibold">Customer</th>
                    <th className="p-4 font-semibold">Date</th>
                    <th className="p-4 font-semibold text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order: any) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="p-4 text-sm font-mono text-gray-500">{order.id.slice(0, 8)}</td>
                      <td className="p-4 font-medium text-gray-900">{order.customer_name || 'N/A'}</td>
                      <td className="p-4 text-gray-600 text-sm">{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="p-4 text-right font-bold text-yellow-500">₦{order.total_price.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-20 text-gray-500">No orders found.</div>
            )}
          </div>
        )}

        {/* --- SETTINGS TAB --- */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Website Configuration</h2>
            <form onSubmit={saveSettings} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website Name</label>
                <input
                  type="text"
                  required
                  value={settingsForm.name}
                  onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-16 h-16 bg-gray-100 border border-gray-200 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                    {settingsForm.logo || logoFile ? (
                      <img 
                        src={logoFile ? URL.createObjectURL(logoFile) : settingsForm.logo} 
                        alt="Logo Preview" 
                        className="w-full h-full object-contain p-1" 
                      />
                    ) : (
                      <ImageIcon className="text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setLogoFile(e.target.files ? e.target.files[0] : null)}
                      className="text-sm text-gray-500 w-full"
                    />
                    <p className="text-xs text-gray-400 text-center">- OR -</p>
                    <input
                      type="url"
                      placeholder="Image URL (e.g., https://example.com/logo.png)"
                      value={settingsForm.logo}
                      onChange={(e) => setSettingsForm({ ...settingsForm, logo: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Admin Password</label>
                <input
                  type="password"
                  placeholder="Leave blank to keep current password"
                  value={settingsForm.newPassword}
                  onChange={(e) => setSettingsForm({ ...settingsForm, newPassword: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors shadow-sm"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {/* --- PLACEHOLDER TABS --- */}
        {(activeTab === 'dashboard' || activeTab === 'reviews' || activeTab === 'customers' || activeTab === 'analytics') && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="mx-auto w-20 h-20 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center mb-6">
              <LayoutDashboard size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              The {activeTab} module is currently under development. Please check back later.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
