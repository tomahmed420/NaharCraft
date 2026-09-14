import React from 'react';
import { Grid, Plus, Edit2, Trash2 } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

const AdminCategories = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-gray-500 mt-1">{CATEGORIES.length} categories</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-opacity-90 transition-all">
          <Plus size={20} />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map(cat => (
          <div key={cat.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={cat.image} className="w-12 h-12 rounded-xl object-cover" referrerPolicy="no-referrer" />
              <span className="font-bold text-lg">{cat.name}</span>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><Edit2 size={18} /></button>
              <button className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;
