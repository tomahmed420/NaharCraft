import React, { useState } from 'react';
import { 
  FolderTree, 
  Plus, 
  Edit3, 
  Trash2, 
  X, 
  Image as ImageIcon,
  AlertTriangle,
  Package
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Category } from '../../types';
import CloudinaryImageInput from '../../components/admin/CloudinaryImageInput';

const AdminCategories: React.FC = () => {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: ''
  });

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600&h=600',
      description: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      image: cat.image,
      description: cat.description || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.image.trim()) {
      alert('ক্যাটাগরির নাম ও ছবির লিংক পূরণ করুন');
      return;
    }

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name: formData.name.trim(),
        image: formData.image.trim(),
        description: formData.description.trim()
      });
    } else {
      addCategory({
        name: formData.name.trim(),
        image: formData.image.trim(),
        description: formData.description.trim()
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
            <span>ক্যাটাগরি ব্যবস্থাপনা</span>
            <span className="text-xs font-sans font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
              {categories.length} টি
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            ওয়েবসাইটের ক্যাটাগরি তৈরি করুন, ছবি ও বিবরণ আপডেট করুন
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-primary hover:bg-primary/90 text-white font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 text-sm shrink-0"
        >
          <Plus size={18} />
          <span>নতুন ক্যাটাগরি যোগ করুন</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const productCount = products.filter(p => p.category === cat.name).length;
          return (
            <div 
              key={cat.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative h-36 bg-gray-100 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                  <Package size={12} />
                  <span>{productCount} টি পণ্য</span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-gray-900 text-base mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {cat.description || 'হাতে বোনা অনন্য কারুশিল্পের কালেকশন'}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEditModal(cat)}
                    className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-primary hover:text-white text-gray-700 text-xs font-semibold flex items-center gap-1 transition-all"
                  >
                    <Edit3 size={13} />
                    <span>এডিট</span>
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(cat.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                    title="ডিলিট"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 z-10 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="font-serif font-bold text-lg text-gray-900">
                {editingCategory ? 'ক্যাটাগরি এডিট করুন' : 'নতুন ক্যাটাগরি'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ক্যাটাগরির নাম *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="যেমন: ঘর সজ্জা"
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <CloudinaryImageInput
                  label="ছবির লিংক (URL)"
                  required={true}
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  helperText="ক্যাটাগরির মূল ছবির লিংক দিন বা ক্লাউডিনারিতে আপলোড করুন।"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">সংক্ষিপ্ত বিবরণ (ঐচ্ছিক)</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="এই ক্যাটাগরির পণ্য সম্পর্কে এক লাইন..."
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30"
                />
              </div>

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
                  className="px-5 py-2 text-xs font-bold bg-primary text-white rounded-xl shadow-md hover:bg-primary/90"
                >
                  সংরক্ষণ করুন
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
              <h3 className="font-serif font-bold text-base text-gray-900">ক্যাটাগরি ডিলিট করতে চান?</h3>
              <p className="text-xs text-gray-500 mt-1">
                এই ক্যাটাগরিটি মুছে ফেলা হবে। আপনি কি নিশ্চিত?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200"
              >
                না
              </button>
              <button
                onClick={() => {
                  deleteCategory(deleteConfirmId);
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

export default AdminCategories;
