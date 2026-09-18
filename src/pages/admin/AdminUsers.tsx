import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  ShieldAlert, 
  KeyRound, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Lock, 
  User, 
  Crown, 
  Eye, 
  EyeOff,
  AlertCircle,
  Clock,
  Sparkles,
  Shield
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdminUser } from '../../types';

const AdminUsers: React.FC = () => {
  const { admins, currentAdmin, addAdmin, updateAdmin, deleteAdmin } = useData();

  const isMaster = currentAdmin?.role === 'master';

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    role: 'admin' as 'master' | 'admin',
    status: 'active' as 'active' | 'inactive'
  });

  const openAddModal = () => {
    setEditingAdmin(null);
    setFormData({
      name: '',
      username: '',
      password: '',
      role: 'admin',
      status: 'active'
    });
    setFormError(null);
    setShowPassword(false);
    setIsModalOpen(true);
  };

  const openEditModal = (admin: AdminUser) => {
    setEditingAdmin(admin);
    setFormData({
      name: admin.name,
      username: admin.username,
      password: admin.password,
      role: admin.role,
      status: admin.status
    });
    setFormError(null);
    setShowPassword(false);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (editingAdmin) {
      const res = updateAdmin(editingAdmin.id, formData);
      if (res.success) {
        setSuccessToast('অ্যাডমিন তথ্য সফলভাবে আপডেট হয়েছে!');
        setIsModalOpen(false);
        setTimeout(() => setSuccessToast(null), 3000);
      } else {
        setFormError(res.message || 'আপডেট ব্যর্থ হয়েছে।');
      }
    } else {
      const res = addAdmin(formData);
      if (res.success) {
        setSuccessToast('নতুন অ্যাডমিন সফলভাবে তৈরি হয়েছে!');
        setIsModalOpen(false);
        setTimeout(() => setSuccessToast(null), 3000);
      } else {
        setFormError(res.message || 'অ্যাডমিন তৈরি ব্যর্থ হয়েছে।');
      }
    }
  };

  const handleDelete = (id: string) => {
    const res = deleteAdmin(id);
    if (res.success) {
      setSuccessToast('অ্যাডমিন সফলভাবে ডিলিট করা হয়েছে।');
      setDeleteConfirmId(null);
      setTimeout(() => setSuccessToast(null), 3000);
    } else {
      alert(res.message);
    }
  };

  const masterCount = admins.filter(a => a.role === 'master').length;
  const assistantCount = admins.filter(a => a.role === 'admin').length;

  return (
    <div className="space-y-6">
      {/* Toast */}
      {successToast && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-sm font-medium animate-in fade-in slide-in-from-top-4 duration-200">
          <Check size={16} />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
              অ্যাডমিন টিম ও এক্সেস কন্ট্রোল
            </h1>
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-200">
              মাস্টার সিকিউরিটি
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            মাস্টার অ্যাডমিন যেকোনো সময় নতুন অ্যাডমিন যুক্ত করতে পারেন এবং তাদের পাসওয়ার্ড নিয়ন্ত্রণ করতে পারেন
          </p>
        </div>

        {isMaster && (
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md shadow-primary/20 active:scale-98 cursor-pointer shrink-0"
          >
            <UserPlus size={16} />
            <span>নতুন অ্যাডমিন যুক্ত করুন</span>
          </button>
        )}
      </div>

      {/* Access info banner if logged in as assistant admin */}
      {!isMaster && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-amber-900">
          <ShieldAlert size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <p className="font-bold">সহকারী অ্যাডমিন এক্সেস</p>
            <p className="mt-0.5 text-amber-800">
              আপনি বর্তমানে সহকারী অ্যাডমিন হিসেবে লগইন রয়েছেন। পণ্য, ক্যাটাগরি ও অর্ডার পরিবর্তন করতে পারবেন, কিন্তু নতুন অ্যাডমিন তৈরি বা পাসওয়ার্ড পরিবর্তনের ক্ষমতা কেবল <b>মাস্টার অ্যাডমিনের</b> রয়েছে।
            </p>
          </div>
        </div>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <Users size={22} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">মোট অ্যাডমিন</p>
            <p className="text-2xl font-bold text-gray-900">{admins.length} জন</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Crown size={22} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">মাস্টার অ্যাডমিন (Super)</p>
            <p className="text-2xl font-bold text-amber-600">{masterCount} জন</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <ShieldCheck size={22} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">সহকারী অ্যাডমিন (Staff)</p>
            <p className="text-2xl font-bold text-blue-600">{assistantCount} জন</p>
          </div>
        </div>
      </div>

      {/* Admins List Table / Cards */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-serif font-bold text-base text-gray-900 flex items-center gap-2">
            <Shield size={18} className="text-primary" />
            <span>নিবন্ধিত অ্যাডমিনদের তালিকা</span>
          </h2>
          <span className="text-xs text-gray-500">
            ডাটাবেজ ছাড়াই সেন্ট্রাল JSON কনফিগে সংরক্ষিত
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-[11px] uppercase tracking-wider font-semibold border-b border-gray-200">
                <th className="py-3 px-4">অ্যাডমিনের নাম</th>
                <th className="py-3 px-4">ইউজারনেম / ইমেইল</th>
                <th className="py-3 px-4">ভূমিকা (Role)</th>
                <th className="py-3 px-4">স্ট্যাটাস</th>
                <th className="py-3 px-4">তৈরির তারিখ</th>
                <th className="py-3 px-4">সর্বশেষ লগইন</th>
                <th className="py-3 px-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
              {admins.map((admin) => {
                const isCurrent = currentAdmin?.id === admin.id;
                const isMasterRole = admin.role === 'master';

                return (
                  <tr key={admin.id} className={`hover:bg-gray-50/80 transition-colors ${isCurrent ? 'bg-amber-50/30' : ''}`}>
                    <td className="py-3.5 px-4 font-semibold text-gray-900">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                          isMasterRole ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {admin.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span>{admin.name}</span>
                            {isCurrent && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                                আপনি
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-gray-600">
                      {admin.username}
                    </td>

                    <td className="py-3.5 px-4">
                      {isMasterRole ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          <Crown size={12} className="text-amber-600" />
                          <span>মাস্টার অ্যাডমিন</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                          <ShieldCheck size={12} className="text-blue-500" />
                          <span>সহকারী অ্যাডমিন</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {admin.status === 'active' ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>সক্রিয়</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-gray-500 font-semibold text-[11px] bg-gray-100 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                          <span>নিষ্ক্রিয়</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-gray-500 font-mono text-[11px]">
                      {admin.createdAt}
                    </td>

                    <td className="py-3.5 px-4 text-gray-500 text-[11px]">
                      {admin.lastLogin || 'এখনো লগইন করেনি'}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {isMaster && (
                          <button
                            onClick={() => openEditModal(admin)}
                            className="p-1.5 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
                            title="সম্পাদনা ও পাসওয়ার্ড পরিবর্তন"
                          >
                            <Edit3 size={15} />
                          </button>
                        )}

                        {isMaster && !isCurrent && (
                          <button
                            onClick={() => setDeleteConfirmId(admin.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Admin Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                <UserPlus size={18} className="text-primary" />
                <span>{editingAdmin ? 'অ্যাডমিন তথ্য পরিবর্তন' : 'নতুন অ্যাডমিন যুক্ত করুন'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-2.5 bg-red-50 text-red-600 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  পুরো নাম *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="যেমন: নাহিদা আক্তার"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  ইউজারনেম বা ইমেইল *
                </label>
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="যেমন: nahida বা nahida@naharcraft.com"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  লগইন পাসওয়ার্ড *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="পাসওয়ার্ড লিখুন"
                    className="w-full px-3 pr-9 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">নূন্যতম ৪ অক্ষরের পাসওয়ার্ড দিন</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    ভূমিকা (Role) *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
                  >
                    <option value="admin">সহকারী অ্যাডমিন (Staff)</option>
                    <option value="master">মাস্টার অ্যাডমিন (Super)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    স্ট্যাটাস *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
                  >
                    <option value="active">সক্রিয় (Active)</option>
                    <option value="inactive">নিষ্ক্রিয় (Inactive)</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-primary hover:bg-primary/90 text-white rounded-xl transition-all shadow-md shadow-primary/20 cursor-pointer"
                >
                  {editingAdmin ? 'তথ্য সংরক্ষণ করুন' : 'অ্যাডমিন তৈরি করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 size={24} />
            </div>
            <h3 className="font-bold text-base text-gray-900">অ্যাডমিন মুছে ফেলতে চান?</h3>
            <p className="text-xs text-gray-500 mt-1">
              এই অ্যাডমিন অ্যাকাউন্টটি মুছে দিলে তিনি আর অ্যাডমিন প্যানেলে লগইন করতে পারবেন না।
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md transition-colors"
              >
                হ্যাঁ, মুছে ফেলুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
