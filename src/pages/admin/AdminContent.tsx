import React, { useState } from 'react';
import { 
  FileText, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Truck, 
  Check, 
  Save, 
  Info,
  Clock
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import CloudinaryImageInput from '../../components/admin/CloudinaryImageInput';

const AdminContent: React.FC = () => {
  const { 
    contact, 
    ourStory, 
    settings, 
    updateContact, 
    updateOurStory, 
    updateSettings 
  } = useData();

  const [contactForm, setContactForm] = useState({ ...contact });
  const [storyForm, setStoryForm] = useState({ ...ourStory });
  const [settingsForm, setSettingsForm] = useState({ ...settings });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateContact(contactForm);
    updateOurStory(storyForm);
    updateSettings(settingsForm);

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
            <span>কন্টেন্ট ও হোয়াটসঅ্যাপ সেটিংস</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            যে হোয়াটসঅ্যাপ নম্বরে কাস্টমারের অর্ডার পৌঁছাবে তা এবং পেজের বিবরণী পরিবর্তন করুন
          </p>
        </div>

        {savedSuccess && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 shadow-xs">
            <Check size={16} />
            <span>সকল তথ্য সফলভাবে আপডেট হয়েছে!</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSaveAll} className="space-y-6">
        {/* Section 1: WhatsApp & Contact Settings */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-gray-100 bg-emerald-50/50 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <MessageCircle size={18} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-gray-900">
                অর্ডার রিসিভিং হোয়াটসঅ্যাপ ও যোগাযোগের তথ্য
              </h3>
              <p className="text-xs text-emerald-800">
                কাস্টমার যখন ওয়েবসাইটে চেকআউট করবে তখন এই নম্বরে সরাসরি অর্ডার মেসেজ পৌঁছাবে
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-4">
            <div className="bg-emerald-50/80 border border-emerald-200 p-3.5 rounded-xl text-xs text-emerald-900 flex items-start gap-2.5">
              <Info size={18} className="text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong>গুরুত্বপূর্ণ:</strong> হোয়াটসঅ্যাপ নম্বরটি দেশের কোড সহ (যেমন: <span className="font-mono font-bold">+88017XXXXXXXX</span>) অথবা 017XXXXXXXX আকারে লিখুন।
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <MessageCircle size={14} className="text-emerald-600" />
                  <span>অর্ডার হোয়াটসঅ্যাপ নম্বর *</span>
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.whatsapp}
                  onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                  placeholder="+880 17XX-XXXXXX"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl font-mono font-bold text-emerald-800 focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <Phone size={14} className="text-blue-600" />
                  <span>সরাসরি কল নম্বর (ফোন) *</span>
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  placeholder="+880 1234-567890"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <Mail size={14} className="text-rose-600" />
                  <span>অফিসিয়াল ইমেইল *</span>
                </label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="contact@naharcraft.com"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                  <Clock size={14} className="text-amber-600" />
                  <span>কাস্টমার সাপোর্ট সময়</span>
                </label>
                <input
                  type="text"
                  value={contactForm.businessHours || 'প্রতিদিন সকাল ৯টা - রাত ১০টা'}
                  onChange={(e) => setContactForm({ ...contactForm, businessHours: e.target.value })}
                  placeholder="প্রতিদিন সকাল ৯টা - রাত ১০টা"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                <MapPin size={14} className="text-primary" />
                <span>অফিস বা প্রদর্শনীর ঠিকানা *</span>
              </label>
              <input
                type="text"
                required
                value={contactForm.address}
                onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                placeholder="বাড়ি ১২, রোড ৪, সেক্টর ৭, উত্তরা, ঢাকা"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Delivery Rates Settings */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-gray-100 bg-amber-50/50 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center">
              <Truck size={18} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-gray-900">
                ডেলিভারি চার্জ ও ফ্রি ডেলিভারি শর্ত
              </h3>
              <p className="text-xs text-amber-800">
                চেকআউট মোডালে স্বয়ংক্রিয়ভাবে হিসাব করার জন্য এই চার্জগুলো ব্যবহৃত হবে
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                ঢাকা মেট্রো ডেলিভারি চার্জ (টাকা)
              </label>
              <input
                type="number"
                required
                min="0"
                value={settingsForm.insideDhakaDelivery}
                onChange={(e) => setSettingsForm({
                  ...settingsForm,
                  insideDhakaDelivery: Number(e.target.value)
                })}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 font-bold text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                ঢাকার বাইরে ডেলিভারি চার্জ (টাকা)
              </label>
              <input
                type="number"
                required
                min="0"
                value={settingsForm.outsideDhakaDelivery}
                onChange={(e) => setSettingsForm({
                  ...settingsForm,
                  outsideDhakaDelivery: Number(e.target.value)
                })}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 font-bold text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                ফ্রি ডেলিভারির ন্যূনতম অর্ডার (টাকা)
              </label>
              <input
                type="number"
                required
                min="0"
                value={settingsForm.freeDeliveryThreshold}
                onChange={(e) => setSettingsForm({
                  ...settingsForm,
                  freeDeliveryThreshold: Number(e.target.value)
                })}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 font-bold text-emerald-700"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Our Story Page Content */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <FileText size={18} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-gray-900">
                আমাদের গল্প (About / Our Story) পেজ
              </h3>
              <p className="text-xs text-gray-500">
                ব্র্যান্ড পরিচিতি, পেজের ছবি ও বিস্তারিত গল্প
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  গল্পের শিরোনাম *
                </label>
                <input
                  type="text"
                  required
                  value={storyForm.title}
                  onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <CloudinaryImageInput
                  label="গল্পের ফিচারড ছবি (URL)"
                  required={true}
                  value={storyForm.image}
                  onChange={(url) => setStoryForm({ ...storyForm, image: url })}
                  helperText="স্টোরি পেজের মূল ছবির লিংক দিন বা ক্লাউডিনারিতে আপলোড করুন।"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                সম্পূর্ণ গল্প ও বিবরণী *
              </label>
              <textarea
                rows={5}
                required
                value={storyForm.description}
                onChange={(e) => setStoryForm({ ...storyForm, description: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>

        {/* Floating / Sticky Save Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 text-sm transition-all active:scale-95"
          >
            <Save size={18} />
            <span>সকল কন্টেন্ট ও সেটিংস সংরক্ষণ করুন</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminContent;
