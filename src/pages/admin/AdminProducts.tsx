import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Package, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Filter, 
  Star, 
  Image as ImageIcon,
  AlertTriangle,
  Eye
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Product } from '../../types';
import CloudinaryImageInput from '../../components/admin/CloudinaryImageInput';

const AdminProducts: React.FC = () => {
  const { 
    products, 
    categories, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    toggleProductStock, 
    toggleProductFeatured 
  } = useData();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [stockFilter, setStockFilter] = useState<'all' | 'inStock' | 'outOfStock'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
    description: '',
    featured: false,
    inStock: true
  });

  // Handle URL params like ?action=new or ?edit=1
  useEffect(() => {
    const action = searchParams.get('action');
    const editId = searchParams.get('edit');

    if (action === 'new') {
      openAddModal();
      searchParams.delete('action');
      setSearchParams(searchParams);
    } else if (editId) {
      const prod = products.find(p => String(p.id) === editId);
      if (prod) {
        openEditModal(prod);
      }
      searchParams.delete('edit');
      setSearchParams(searchParams);
    }
  }, [searchParams, products]);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: categories[0]?.name || 'ক্রুশবিদ্ধ ফুল',
      price: '',
      image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=600&h=600',
      description: '',
      featured: false,
      inStock: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: String(product.price),
      image: product.image,
      description: product.description || '',
      featured: Boolean(product.featured),
      inStock: product.inStock !== false
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price || !formData.image.trim()) {
      alert('দয়া করে নাম, মূল্য এবং ছবির লিংক পূরণ করুন');
      return;
    }

    const priceNum = parseFloat(formData.price) || 0;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formData.name.trim(),
        category: formData.category,
        price: priceNum,
        image: formData.image.trim(),
        description: formData.description.trim(),
        featured: formData.featured,
        inStock: formData.inStock
      });
    } else {
      addProduct({
        name: formData.name.trim(),
        category: formData.category,
        price: priceNum,
        image: formData.image.trim(),
        description: formData.description.trim(),
        featured: formData.featured,
        inStock: formData.inStock
      });
    }

    setIsModalOpen(false);
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesStock = 
      stockFilter === 'all' ? true :
      stockFilter === 'inStock' ? (product.inStock !== false) :
      (product.inStock === false);

    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
            <span>পণ্য ব্যবস্থাপনা</span>
            <span className="text-xs font-sans font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {products.length} টি
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            নতুন পণ্য যোগ করুন, দাম ও স্টক পরিবর্তন করুন বা প্রোডাক্ট এডিট করুন
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-primary hover:bg-primary/90 text-white font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 text-sm shrink-0"
        >
          <Plus size={18} />
          <span>নতুন পণ্য যোগ করুন</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="পণ্যের নাম বা ক্যাটাগরি দিয়ে খুঁজুন..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-gray-700"
        >
          <option value="All">সকল ক্যাটাগরি</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>

        {/* Stock Filter */}
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value as any)}
          className="px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-gray-700"
        >
          <option value="all">সব স্টক স্ট্যাটাস</option>
          <option value="inStock">শুধু ইন স্টক</option>
          <option value="outOfStock">শুধু আউট অফ স্টক</option>
        </select>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-[11px] tracking-wider border-b border-gray-200">
            <tr>
              <th className="py-3 px-4">পণ্য</th>
              <th className="py-3 px-4">ক্যাটাগরি</th>
              <th className="py-3 px-4">মূল্য</th>
              <th className="py-3 px-4 text-center">ফিচারড</th>
              <th className="py-3 px-4 text-center">স্টক স্ট্যাটাস</th>
              <th className="py-3 px-4 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-400">
                  কোনো পণ্য খুঁজে পাওয়া যায়নি
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => {
                const inStock = product.inStock !== false;
                return (
                  <tr key={product.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover border shrink-0 bg-gray-100"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 truncate max-w-xs">{product.name}</p>
                          <p className="text-xs text-gray-500 line-clamp-1 max-w-xs">
                            {product.description || 'কোনো বিবরণ নেই'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-primary text-base">
                      ৳{product.price}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => toggleProductFeatured(product.id)}
                        title="হোমপেজে ফিচারড করতে ক্লিক করুন"
                        className={`p-1.5 rounded-lg transition-all ${
                          product.featured
                            ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                            : 'text-gray-300 hover:text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        <Star size={18} className={product.featured ? 'fill-current' : ''} />
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => toggleProductStock(product.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                          inStock
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${inStock ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        <span>{inStock ? 'ইন স্টক' : 'আউট অফ স্টক'}</span>
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-1.5 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-all"
                          title="এডিট করুন"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(product.id)}
                          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          title="ডিলিট করুন"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (Smooth touch cards for phones) */}
      <div className="md:hidden space-y-3">
        {filteredProducts.length === 0 ? (
          <div className="bg-white p-8 rounded-xl text-center text-gray-400 text-sm border">
            কোনো পণ্য খুঁজে পাওয়া যায়নি
          </div>
        ) : (
          filteredProducts.map((product) => {
            const inStock = product.inStock !== false;
            return (
              <div key={product.id} className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-xs flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover border shrink-0 bg-gray-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-gray-900 text-sm truncate">{product.name}</h4>
                      <button
                        onClick={() => toggleProductFeatured(product.id)}
                        className={`p-1 rounded ${product.featured ? 'text-amber-500' : 'text-gray-300'}`}
                      >
                        <Star size={16} className={product.featured ? 'fill-current' : ''} />
                      </button>
                    </div>
                    <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded inline-block mt-0.5">
                      {product.category}
                    </span>
                    <p className="font-bold text-primary text-base mt-1">৳{product.price}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => toggleProductStock(product.id)}
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                      inStock ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    {inStock ? '● ইন স্টক' : '● আউট অফ স্টক'}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 hover:bg-primary hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
                    >
                      <Edit3 size={13} />
                      <span>এডিট</span>
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(product.id)}
                      className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 z-10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="font-serif font-bold text-lg text-gray-900">
                {editingProduct ? 'পণ্য এডিট করুন' : 'নতুন পণ্য যোগ করুন'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  পণ্যের নাম *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="যেমন: ক্রুশবিদ্ধ টিউলিপ তোড়া"
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Category & Price Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    ক্যাটাগরি *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    মূল্য (টাকা) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="৭৫০"
                    className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>

              {/* Image URL */}
              <CloudinaryImageInput
                label="পণ্যের ছবির লিংক (URL)"
                required={true}
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                helperText="পণ্যের মূল ছবির ডিরেক্ট লিংক দিন বা আপলোড করুন।"
              />

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  পণ্যের বিবরণ (Description)
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="পণ্যের উপাদান, সাইজ ও বিস্তারিত তথ্য..."
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Switches: Featured & InStock */}
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex flex-col sm:flex-row gap-3 justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-4 h-4 text-primary rounded focus:ring-primary/30"
                  />
                  <span>ইন স্টক (বিক্রয়ের জন্য উপলব্ধ)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-primary rounded focus:ring-primary/30"
                  />
                  <span>হোমপেজে ফিচার করুন</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md transition-all active:scale-95"
                >
                  {editingProduct ? 'আপডেট সংরক্ষণ করুন' : 'পণ্য সংরক্ষণ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setDeleteConfirmId(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 z-10 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-gray-900">পণ্যটি ডিলিট করতে চান?</h3>
              <p className="text-xs text-gray-500 mt-1">
                এই পণ্যটি স্থায়ীভাবে ওয়েবসাইট থেকে মুছে ফেলা হবে। আপনি কি নিশ্চিত?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200"
              >
                না, রাখুন
              </button>
              <button
                onClick={() => {
                  deleteProduct(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md"
              >
                হ্যাঁ, ডিলিট করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
