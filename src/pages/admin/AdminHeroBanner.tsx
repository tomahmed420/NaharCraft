import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Check, 
  Sparkles, 
  Tag, 
  Eye,
  Save,
  ArrowRight
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import CloudinaryImageInput from '../../components/admin/CloudinaryImageInput';

const AdminHeroBanner: React.FC = () => {
  const { hero, promos, updateHero, updatePromos } = useData();

  const [heroForm, setHeroForm] = useState({
    title: hero.title,
    subtitle: hero.subtitle,
    buttonText: hero.buttonText,
    images: [...hero.images]
  });

  const [newHeroImageUrl, setNewHeroImageUrl] = useState('');

  const [promoForm, setPromoForm] = useState({
    banner1: { ...promos.banner1 },
    banner2: { ...promos.banner2 }
  });

  const [heroSaved, setHeroSaved] = useState(false);
  const [promoSaved, setPromoSaved] = useState(false);

  // Hero Handlers
  const handleAddHeroImage = () => {
    if (!newHeroImageUrl.trim()) return;
    setHeroForm(prev => ({
      ...prev,
      images: [...prev.images, newHeroImageUrl.trim()]
    }));
    setNewHeroImageUrl('');
  };

  const handleRemoveHeroImage = (index: number) => {
    setHeroForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateHero(heroForm);
    setHeroSaved(true);
    setTimeout(() => setHeroSaved(false), 2500);
  };

  const handleSavePromos = (e: React.FormEvent) => {
    e.preventDefault();
    updatePromos(promoForm);
    setPromoSaved(true);
    setTimeout(() => setPromoSaved(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
          <span>ব্যানার ও অফার ব্যবস্থাপনা</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          হোমপেজের হিরো স্লাইডার, শিরোনাম, বাটন এবং অফার ব্যানার কাস্টমাইজ করুন
        </p>
      </div>

      {/* Hero Section Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <ImageIcon size={18} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-gray-900">হোম হিরো স্লাইডার সেকশন</h3>
              <p className="text-xs text-gray-500">ওয়েবসাইটের মূল প্রধান ব্যানার</p>
            </div>
          </div>
          {heroSaved && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <Check size={14} />
              <span>সফলভাবে সংরক্ষিত!</span>
            </span>
          )}
        </div>

        <form onSubmit={handleSaveHero} className="p-5 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                প্রধান শিরোনাম (Hero Title) *
              </label>
              <input
                type="text"
                required
                value={heroForm.title}
                onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                বাটন টেক্সট (Button Text) *
              </label>
              <input
                type="text"
                required
                value={heroForm.buttonText}
                onChange={(e) => setHeroForm({ ...heroForm, buttonText: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              উপ-শিরোনাম / বিবরণ (Subtitle) *
            </label>
            <textarea
              rows={2}
              required
              value={heroForm.subtitle}
              onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {/* Hero Images Management */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              স্লাইডারের ছবিসমূহ ({heroForm.images.length} টি)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              {heroForm.images.map((imgUrl, index) => (
                <div key={index} className="relative rounded-xl border border-gray-200 overflow-hidden group">
                  <img
                    src={imgUrl}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-28 object-cover bg-gray-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveHeroImage(index)}
                      className="p-1.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-all shadow-md"
                      title="ছবি মুছুন"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <span className="absolute bottom-1.5 left-1.5 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                    ছবি #{index + 1}
                  </span>
                </div>
              ))}
            </div>

            {/* Add Image Input */}
            <div className="flex flex-col gap-2">
              <CloudinaryImageInput
                label="নতুন স্লাইডার ছবি যোগ করুন"
                value={newHeroImageUrl}
                onChange={(url) => setNewHeroImageUrl(url)}
                helperText="স্লাইডারের জন্য নতুন ছবির লিংক দিন বা ক্লাউডিনারিতে আপলোড করুন।"
              />
              <button
                type="button"
                onClick={handleAddHeroImage}
                disabled={!newHeroImageUrl}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-4 py-2 rounded-xl flex items-center justify-center gap-1 shrink-0 disabled:opacity-50 transition-colors w-full sm:w-auto"
              >
                <Plus size={14} />
                <span>স্লাইডারে এই ছবিটি যুক্ত করুন</span>
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95 text-xs flex items-center gap-2"
            >
              <Save size={16} />
              <span>হিরো সেকশন পরিবর্তন সেভ করুন</span>
            </button>
          </div>
        </form>
      </div>

      {/* Offer Banners Section Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Tag size={18} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-gray-900">অফার ও ডিসকাউন্ট ব্যানার (Home Promo)</h3>
              <p className="text-xs text-gray-500">হোমপেজের দুটি বিশেষ অফার কার্ড</p>
            </div>
          </div>
          {promoSaved && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <Check size={14} />
              <span>সংরক্ষিত!</span>
            </span>
          )}
        </div>

        <form onSubmit={handleSavePromos} className="p-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Banner 1: Coupon Offer */}
            <div className="p-4 rounded-xl border border-amber-200/80 bg-amber-50/30 space-y-3">
              <h4 className="font-serif font-bold text-sm text-gray-900 flex items-center gap-1.5">
                <Sparkles size={16} className="text-amber-600" />
                <span>ব্যানার ১ (কুপন ও মূল্যছাড়)</span>
              </h4>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">ট্যাগ / ব্যাজ</label>
                <input
                  type="text"
                  value={promoForm.banner1.tag}
                  onChange={(e) => setPromoForm({
                    ...promoForm,
                    banner1: { ...promoForm.banner1, tag: e.target.value }
                  })}
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">ব্যানার শিরোনাম</label>
                <input
                  type="text"
                  value={promoForm.banner1.title}
                  onChange={(e) => setPromoForm({
                    ...promoForm,
                    banner1: { ...promoForm.banner1, title: e.target.value }
                  })}
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">উপ-শিরোনাম</label>
                <input
                  type="text"
                  value={promoForm.banner1.subtitle}
                  onChange={(e) => setPromoForm({
                    ...promoForm,
                    banner1: { ...promoForm.banner1, subtitle: e.target.value }
                  })}
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">কুপন কোড</label>
                  <input
                    type="text"
                    value={promoForm.banner1.couponCode}
                    onChange={(e) => setPromoForm({
                      ...promoForm,
                      banner1: { ...promoForm.banner1, couponCode: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white font-mono font-bold text-primary"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">বাটন টেক্সট</label>
                  <input
                    type="text"
                    value={promoForm.banner1.buttonText}
                    onChange={(e) => setPromoForm({
                      ...promoForm,
                      banner1: { ...promoForm.banner1, buttonText: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Banner 2: Free Delivery */}
            <div className="p-4 rounded-xl border border-emerald-200/80 bg-emerald-50/30 space-y-3">
              <h4 className="font-serif font-bold text-sm text-gray-900 flex items-center gap-1.5">
                <Tag size={16} className="text-emerald-600" />
                <span>ব্যানার ২ (ফ্রি ডেলিভারি অফার)</span>
              </h4>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">ট্যাগ / ব্যাজ</label>
                <input
                  type="text"
                  value={promoForm.banner2.tag}
                  onChange={(e) => setPromoForm({
                    ...promoForm,
                    banner2: { ...promoForm.banner2, tag: e.target.value }
                  })}
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">ব্যানার শিরোনাম</label>
                <input
                  type="text"
                  value={promoForm.banner2.title}
                  onChange={(e) => setPromoForm({
                    ...promoForm,
                    banner2: { ...promoForm.banner2, title: e.target.value }
                  })}
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">উপ-শিরোনাম</label>
                <input
                  type="text"
                  value={promoForm.banner2.subtitle}
                  onChange={(e) => setPromoForm({
                    ...promoForm,
                    banner2: { ...promoForm.banner2, subtitle: e.target.value }
                  })}
                  className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">শর্তের পরিমাণ</label>
                  <input
                    type="text"
                    value={promoForm.banner2.minAmountText}
                    onChange={(e) => setPromoForm({
                      ...promoForm,
                      banner2: { ...promoForm.banner2, minAmountText: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white font-bold text-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">বাটন টেক্সট</label>
                  <input
                    type="text"
                    value={promoForm.banner2.buttonText}
                    onChange={(e) => setPromoForm({
                      ...promoForm,
                      banner2: { ...promoForm.banner2, buttonText: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95 text-xs flex items-center gap-2"
            >
              <Save size={16} />
              <span>অফার ব্যানার সেভ করুন</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminHeroBanner;
