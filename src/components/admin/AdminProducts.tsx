import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Star, X, Image as ImageIcon } from 'lucide-react';
import { PRODUCTS } from '../../data/products';

const AdminProducts = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">পণ্যসমূহ</h1>
          <p className="text-gray-500 mt-1">{PRODUCTS.length}টি পণ্য</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-opacity-90 transition-all"
        >
          <Plus size={20} />
          <span>পণ্য যুক্ত করুন</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4 font-medium">পণ্য</th>
              <th className="px-6 py-4 font-medium">ক্যাটাগরি</th>
              <th className="px-6 py-4 font-medium">মূল্য</th>
              <th className="px-6 py-4 font-medium">ফিচার্ড</th>
              <th className="px-6 py-4 font-medium text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {PRODUCTS.map(product => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={product.image} className="w-10 h-10 rounded-lg object-cover" referrerPolicy="no-referrer" />
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">{product.category}</td>
                <td className="px-6 py-4 font-bold">৳{product.price}</td>
                <td className="px-6 py-4">
                  <Star size={18} className={product.featured ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><Edit2 size={18} /></button>
                    <button className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">নতুন পণ্য যুক্ত করুন</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">পণ্যের নাম</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none" placeholder="যেমন: ব্লু ডয়লি" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">ক্যাটাগরি</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none bg-white">
                    <option>অ্যাকসেসরিজ</option>
                    <option>ক্রুশবিদ্ধ ফুল</option>
                    <option>ডয়লি</option>
                    <option>হোম ডেকোর</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">মূল্য (৳)</label>
                  <input type="number" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none" placeholder="০" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">ছবির লিঙ্ক</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none" placeholder="https://..." />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="featured" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">ফিচার্ড পণ্য</label>
              </div>
            </div>
            <div className="p-6 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsAddModalOpen(false)} className="px-6 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-all">বাতিল</button>
              <button className="px-6 py-2 rounded-lg font-medium bg-primary text-white hover:bg-opacity-90 transition-all">পণ্য যুক্ত করুন</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
