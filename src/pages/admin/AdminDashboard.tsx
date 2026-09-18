import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  FolderTree, 
  Image as ImageIcon, 
  HelpCircle, 
  MessageCircle, 
  Plus, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminDashboard: React.FC = () => {
  const { 
    products, 
    categories, 
    testimonials, 
    contact, 
    settings, 
    toggleProductStock 
  } = useData();

  const inStockCount = products.filter(p => p.inStock !== false).length;
  const outOfStockCount = products.length - inStockCount;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white rounded-2xl p-5 sm:p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase block mb-1">
            সেন্ট্রাল কন্ট্রোল প্যানেল
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            NaharCraft ম্যানেজমেন্ট ড্যাশবোর্ড
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            এখান থেকে আপনি ওয়েবসাইটের সকল প্রোডাক্ট, দাম, ছবি, ক্যাটাগরি, অফার ব্যানার ও কন্টেন্ট রিয়েল-টাইমে আপডেট করতে পারেন।
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/products?action=new"
            className="bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md transition-all active:scale-95 shrink-0"
          >
            <Plus size={16} />
            <span>নতুন পণ্য যোগ করুন</span>
          </Link>
          <Link
            to="/"
            target="_blank"
            className="bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shrink-0"
          >
            <ExternalLink size={14} />
            <span className="hidden sm:inline">ওয়েবসাইট</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Products */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 font-medium">মোট পণ্য</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package size={18} />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{products.length}</p>
          <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-500">
            <span className="text-emerald-600 font-semibold">{inStockCount} টি স্টকে</span>
            <span>•</span>
            <span className={outOfStockCount > 0 ? "text-rose-500 font-semibold" : "text-gray-400"}>
              {outOfStockCount} টি আউট অফ স্টক
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 font-medium">মোট ক্যাটাগরি</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <FolderTree size={18} />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{categories.length}</p>
          <Link to="/admin/categories" className="text-[11px] text-primary hover:underline mt-2 inline-block">
            ক্যাটাগরি ম্যানেজ করুন →
          </Link>
        </div>

        {/* WhatsApp Order Target */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 font-medium">অর্ডার হোয়াটসঅ্যাপ</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MessageCircle size={18} />
            </div>
          </div>
          <p className="text-sm sm:text-base font-mono font-bold text-emerald-700 truncate">
            {contact.whatsapp}
          </p>
          <Link to="/admin/content" className="text-[11px] text-primary hover:underline mt-2 inline-block">
            নম্বর পরিবর্তন করুন →
          </Link>
        </div>

        {/* Delivery Settings */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 font-medium">ডেলিভারি চার্জ</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Truck size={18} />
            </div>
          </div>
          <p className="text-sm font-bold text-gray-900">
            ঢাকা ৳{settings.insideDhakaDelivery} / বাইরে ৳{settings.outsideDhakaDelivery}
          </p>
          <span className="text-[11px] text-emerald-600 font-medium mt-2 inline-block">
            ৳{settings.freeDeliveryThreshold}+ তে ফ্রি ডেলিভারি
          </span>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Link
          to="/admin/products"
          className="bg-white p-4 rounded-xl border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <Package size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">পণ্য তালিকা ও এডিট</h4>
              <p className="text-xs text-gray-500">দাম, ছবি ও স্টক পরিচালনা</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          to="/admin/banners"
          className="bg-white p-4 rounded-xl border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <ImageIcon size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">হিরো ব্যানার ও অফার</h4>
              <p className="text-xs text-gray-500">হোমপেজ স্লাইডার ও ডিসকাউন্ট</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          to="/admin/content"
          className="bg-white p-4 rounded-xl border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <MessageCircle size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">যোগাযোগ ও আওয়ার স্টোরি</h4>
              <p className="text-xs text-gray-500">হোয়াটসঅ্যাপ ও পেজ কন্টেন্ট</p>
            </div>
          </div>
          <ArrowRight size={16} className="text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </Link>
      </div>

      {/* Recent Products Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-base text-gray-900">সাম্প্রতিক পণ্যসমূহ</h3>
            <p className="text-xs text-gray-500">দ্রুত স্টক পরিবর্তন ও পণ্য এডিট করুন</p>
          </div>
          <Link
            to="/admin/products"
            className="text-xs font-semibold text-primary hover:underline"
          >
            সব পণ্য দেখুন ({products.length}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-[10px] tracking-wider border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">পণ্য</th>
                <th className="py-3 px-4">ক্যাটাগরি</th>
                <th className="py-3 px-4">মূল্য</th>
                <th className="py-3 px-4">স্টক স্ট্যাটাস</th>
                <th className="py-3 px-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.slice(0, 6).map((product) => {
                const inStock = product.inStock !== false;
                return (
                  <tr key={product.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover border shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 truncate max-w-[150px] sm:max-w-xs">{product.name}</p>
                          <span className="text-[10px] text-gray-400">ID: #{product.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{product.category}</td>
                    <td className="py-3 px-4 font-bold text-primary">৳{product.price}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleProductStock(product.id)}
                        title="স্ট্যাটাস পরিবর্তন করতে ক্লিক করুন"
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                          inStock
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${inStock ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        <span>{inStock ? 'ইন স্টক' : 'আউট অফ স্টক'}</span>
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/admin/products?edit=${product.id}`}
                        className="text-xs font-semibold text-primary hover:underline px-2 py-1 rounded hover:bg-primary/5"
                      >
                        এডিট
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
