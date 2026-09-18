import React, { useState, useRef, useEffect } from 'react';
import { 
  Settings, 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  AlertTriangle, 
  ShieldCheck, 
  Database,
  FileJson,
  Cloud,
  Save
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminSettings: React.FC = () => {
  const { 
    products, 
    categories, 
    testimonials, 
    faqs, 
    settings,
    exportBackupJSON, 
    importBackupJSON, 
    resetToDefaults,
    updateSettings
  } = useData();

  const [resetConfirm, setResetConfirm] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [cloudinaryForm, setCloudinaryForm] = useState({
    cloudinaryCloudName: settings?.cloudinaryCloudName || '',
    cloudinaryUploadPreset: settings?.cloudinaryUploadPreset || ''
  });
  
  useEffect(() => {
    if (settings) {
      setCloudinaryForm({
        cloudinaryCloudName: settings.cloudinaryCloudName || '',
        cloudinaryUploadPreset: settings.cloudinaryUploadPreset || ''
      });
    }
  }, [settings]);

  const handleSaveCloudinary = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      ...settings,
      ...cloudinaryForm
    });
    setImportStatus('ক্লাউডিনারী সেটিংস সেভ হয়েছে!');
    setTimeout(() => setImportStatus(null), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importBackupJSON(content);
      if (success) {
        setImportStatus('ডাটা সফলভাবে রিস্টোর ও সিঙ্ক করা হয়েছে!');
      } else {
        setImportStatus('ফাইলটি সঠিক ব্যাকআপ JSON ফরম্যাট নয়। আবার চেষ্টা করুন।');
      }
      setTimeout(() => setImportStatus(null), 4000);
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReset = () => {
    resetToDefaults();
    setResetConfirm(false);
    setImportStatus('সম্পূর্ণ ডাটাবেস ডিফল্ট অবস্থায় ফিরিয়ে নেওয়া হয়েছে!');
    setTimeout(() => setImportStatus(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
          <span>ব্যাকআপ, রিস্টোর ও সিস্টেম সেটিংস</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          আপনার ওয়েবসাইটের সকল প্রোডাক্ট ও কন্টেন্টের ব্যাকআপ সংরক্ষণ ও রিস্টোর করুন
        </p>
      </div>

      {importStatus && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2">
          <Check size={18} />
          <span>{importStatus}</span>
        </div>
      )}

      {/* Cloudinary API Settings */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Cloud size={20} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-gray-900">Cloudinary ইমেজ আপলোড সেটিংস</h3>
            <p className="text-xs text-gray-500">ইমেজ সরাসরি ক্লাউডিনারিতে সেভ করতে আপনার ক্লাউড নেম ও আপলোড প্রিসেট দিন</p>
          </div>
        </div>

        <form onSubmit={handleSaveCloudinary} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Cloud Name (ক্লাউড নেম)
              </label>
              <input
                type="text"
                value={cloudinaryForm.cloudinaryCloudName}
                onChange={(e) => setCloudinaryForm({ ...cloudinaryForm, cloudinaryCloudName: e.target.value })}
                placeholder="যেমন: dxyz123abc"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl font-mono focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Upload Preset (আপলোড প্রিসেট)
              </label>
              <input
                type="text"
                value={cloudinaryForm.cloudinaryUploadPreset}
                onChange={(e) => setCloudinaryForm({ ...cloudinaryForm, cloudinaryUploadPreset: e.target.value })}
                placeholder="Unsigned preset name"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl font-mono focus:ring-2 focus:ring-primary/30"
              />
              <p className="text-[10px] text-gray-500 mt-1">
                * প্রিসেটটি অবশ্যই "Unsigned" হতে হবে।
              </p>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Save size={16} />
              <span>সেটিংস সেভ করুন</span>
            </button>
          </div>
        </form>
      </div>

      {/* Database Stats Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Database size={20} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-gray-900">ডাটাবেস স্ট্যাটাস</h3>
            <p className="text-xs text-gray-500">আপনার ব্রাউজার ও লাইভ অ্যাপে সংরক্ষিত আইটেমস</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
            <span className="text-xs text-gray-500 block">মোট পণ্য</span>
            <span className="text-xl font-bold text-gray-900">{products.length}</span>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
            <span className="text-xs text-gray-500 block">মোট ক্যাটাগরি</span>
            <span className="text-xl font-bold text-gray-900">{categories.length}</span>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
            <span className="text-xs text-gray-500 block">কাস্টমার রিভিউ</span>
            <span className="text-xl font-bold text-gray-900">{testimonials.length}</span>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
            <span className="text-xs text-gray-500 block">এফএকিউ প্রশ্ন</span>
            <span className="text-xl font-bold text-gray-900">{faqs.length}</span>
          </div>
        </div>
      </div>

      {/* Backup & Restore Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Export Backup Card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Download size={20} />
            </div>
            <h4 className="font-serif font-bold text-base text-gray-900 mb-1">
              সম্পূর্ণ ওয়েবসাইট ব্যাকআপ ডাউনলোড
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              আপনার ওয়েবসাইটের বর্তমান সকল প্রোডাক্ট, দাম, ছবি, ক্যাটাগরি, ব্যানার ও কন্টেন্ট একটি মাত্র ফাইলে (.json) ডাউনলোড করে সংরক্ষণ করে রাখুন।
            </p>
          </div>

          <button
            onClick={exportBackupJSON}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
          >
            <FileJson size={16} />
            <span>ব্যাকআপ ডাউনলোড করুন (JSON)</span>
          </button>
        </div>

        {/* Import Restore Card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
              <Upload size={20} />
            </div>
            <h4 className="font-serif font-bold text-base text-gray-900 mb-1">
              পূর্বের ব্যাকআপ ফাইল থেকে রিস্টোর
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              পূর্বে ডাউনলোড করা কোনো ব্যাকআপ JSON ফাইল সিলেক্ট করে সম্পূর্ণ ওয়েবসাইট এক ক্লিকে রিস্টোর করুন।
            </p>
          </div>

          <div>
            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Upload size={16} />
              <span>ব্যাকআপ ফাইল নির্বাচন ও আপলোড করুন</span>
            </button>
          </div>
        </div>
      </div>

      {/* Factory Reset / Undo Section */}
      <div className="bg-rose-50/60 border border-rose-200/80 rounded-2xl p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <RotateCcw size={20} />
          </div>
          <div className="flex-1">
            <h4 className="font-serif font-bold text-base text-rose-950 mb-1">
              কারখানা রিসেট (Reset to Factory Defaults)
            </h4>
            <p className="text-xs text-rose-800 leading-relaxed mb-4">
              যদি কোনো কারণে ভুল তথ্য দিয়ে ফেলেন বা ওয়েবসাইটটিকে একদম নতুন শুরুর মতো আদি অবস্থায় ফিরিয়ে নিতে চান, তবে এটি ব্যবহার করতে পারেন।
            </p>

            <button
              onClick={() => setResetConfirm(true)}
              className="bg-white hover:bg-rose-50 text-rose-600 border border-rose-300 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95"
            >
              <RotateCcw size={14} />
              <span>ডিফল্ট ডেটায় রিসেট করুন</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {resetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setResetConfirm(false)} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 z-10 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-gray-900">আপনি কি নিশ্চিত?</h3>
              <p className="text-xs text-gray-500 mt-1">
                আপনার সাম্প্রতিক পরিবর্তনগুলো মুছে গিয়ে আদি ডেমো প্রোডাক্ট ও কন্টেন্ট রিস্টোর হবে।
              </p>
            </div>
            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={() => setResetConfirm(false)}
                className="flex-1 py-2 bg-gray-100 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-200"
              >
                বাতিল
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 shadow-md"
              >
                হ্যাঁ, রিসেট করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
