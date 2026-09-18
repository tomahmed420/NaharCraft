import React, { useState } from 'react';
import { Image as ImageIcon, Cloud, ExternalLink, Copy, Check, Upload, HelpCircle, X, Sparkles, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface CloudinaryImageInputProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
}

const SAMPLE_CROCHET_IMAGES = [
  {
    name: 'টিউলিপ তোড়া (Tulip Bouquet)',
    url: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=600&h=600'
  },
  {
    name: 'গোলাপ তোড়া (Rose Bouquet)',
    url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600&h=600'
  },
  {
    name: 'সানফ্লাওয়ার তোড়া (Sunflower)',
    url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=600&h=600'
  },
  {
    name: 'হাতে বোনা টোট ব্যাগ (Tote Bag)',
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600&h=600'
  },
  {
    name: 'মিনি পার্স (Coin Purse)',
    url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600&h=600'
  },
  {
    name: 'পেন্সিল পাউচ (Pouch)',
    url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600&h=600'
  },
  {
    name: 'মগ কভার / কোস্টার (Mug Cozy)',
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600&h=600'
  },
  {
    name: 'ওয়াল হ্যাঙ্গিং (Wall Hanging)',
    url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600&h=600'
  }
];

const CloudinaryImageInput: React.FC<CloudinaryImageInputProps> = ({
  label,
  value,
  onChange,
  required = false,
  placeholder = 'https://res.cloudinary.com/... বা যেকোনো ছবির লিংক পেস্ট করুন',
  helperText
}) => {
  const { settings, updateSettings } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'guide' | 'direct' | 'samples'>('guide');

  // Cloudinary credentials for unsigned upload
  const [cloudName, setCloudName] = useState(settings.cloudinaryCloudName || '');
  const [uploadPreset, setUploadPreset] = useState(settings.cloudinaryUploadPreset || '');

  const isCloudinaryUrl = value.includes('cloudinary.com');

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && (text.startsWith('http://') || text.startsWith('https://'))) {
        onChange(text.trim());
      }
    } catch {
      // Ignore if clipboard permission denied
    }
  };

  const handleDirectFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!cloudName.trim() || !uploadPreset.trim()) {
      setUploadError('সরাসরি আপলোডের জন্য ক্লাউড নেম (Cloud Name) ও আনসাইন্ড আপলোড প্রিসেট (Upload Preset) সেট করা থাকতে হবে।');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset.trim());

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName.trim()}/image/upload`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (data.secure_url) {
        onChange(data.secure_url);
        // Save cloud settings for future use
        updateSettings({
          cloudinaryCloudName: cloudName.trim(),
          cloudinaryUploadPreset: uploadPreset.trim()
        });
        setIsModalOpen(false);
      } else {
        setUploadError(data.error?.message || 'ছবি আপলোড ব্যর্থ হয়েছে। ক্লাউড নেম ও প্রিসেট সঠিক কিনা চেক করুন।');
      }
    } catch (err: any) {
      setUploadError('নেটওয়ার্ক সমস্যার কারণে ছবি আপলোড করা সম্ভব হয়নি।');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer"
        >
          <Cloud size={13} />
          <span>ক্লাউডিনারি হেল্পার</span>
        </button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="url"
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-3 pr-8 py-2 text-xs sm:text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono text-gray-800 bg-white"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              title="লিংক ক্লিয়ার করুন"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={handlePasteClipboard}
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-medium shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer"
          title="ক্লিপবোর্ড থেকে পেস্ট করুন"
        >
          <Copy size={13} />
          <span className="hidden sm:inline">পেস্ট</span>
        </button>
      </div>

      {/* Helper text or validation status */}
      <div className="flex items-center justify-between text-[11px] text-gray-500">
        <span>{helperText || 'ক্লাউডিনারি (Cloudinary) বা যেকোনো ছবির ডিরেক্ট ওয়েব লিংক পেস্ট করুন।'}</span>
        {isCloudinaryUrl && (
          <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded">
            <Check size={11} />
            <span>ক্লাউডিনারি লিংক</span>
          </span>
        )}
      </div>

      {/* Live Preview Box */}
      {value && (
        <div className="mt-2 flex items-center gap-3 p-2 bg-gray-50 rounded-xl border border-gray-200">
          <img
            src={value}
            alt="Preview"
            className="w-12 h-12 object-cover rounded-lg border border-gray-200 bg-white shrink-0 shadow-xs"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as any).src = 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=600&h=600';
            }}
          />
          <div className="flex-1 min-w-0 text-[11px]">
            <p className="font-semibold text-gray-800 truncate">ছবি প্রিভিউ সফল</p>
            <p className="text-gray-500 truncate font-mono">{value}</p>
          </div>
          <button
            type="button"
            onClick={() => window.open(value, '_blank')}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-200"
            title="ছবি বড় করে দেখুন"
          >
            <ExternalLink size={14} />
          </button>
        </div>
      )}

      {/* Cloudinary Helper Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Cloud size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900">ক্লাউডিনারি ইমেজ হেল্পার</h3>
                  <p className="text-xs text-gray-500">ফ্রি ক্লাউড স্টোরেজে ছবি রাখুন, ডাটাবেজ পুশ বা হারানোর কোনো ঝুঁকি নেই</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-4 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('guide')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  activeTab === 'guide' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                ১. সহজ গাইড
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('samples')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  activeTab === 'samples' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                ২. রেডি স্যাম্পল ছবি
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('direct')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  activeTab === 'direct' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                ৩. ওয়ান-ক্লিক আপলোড
              </button>
            </div>

            {/* Tab 1: Guide */}
            {activeTab === 'guide' && (
              <div className="space-y-3 text-xs text-gray-700">
                <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl">
                  <h4 className="font-bold text-blue-900 mb-1 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-blue-600" />
                    <span>ক্লাউডিনারি ব্যবহারের নিয়ম:</span>
                  </h4>
                  <ol className="list-decimal list-inside space-y-1.5 text-blue-950">
                    <li>
                      বিনামূল্যে <a href="https://cloudinary.com" target="_blank" rel="noreferrer" className="underline font-bold text-blue-700">cloudinary.com</a> এ একটি একাউন্ট খুলুন।
                    </li>
                    <li>সেখানে আপনার হস্তশিল্প/ক্রুশবিদ্ধ পণ্যের ছবি আপলোড করুন।</li>
                    <li>
                      ছবির ডানপাশের <b>"Copy URL"</b> বা <b>"লিংক কপি"</b> অপশনে ক্লিক করুন।
                    </li>
                    <li>
                      তারপর এখানে <b>"পেস্ট"</b> বাটনে চাপলেই স্বয়ংক্রিয়ভাবে লিংকটি বসে যাবে এবং ওয়েবসাইটের সব গ্রাহক তা দেখতে পাবে!
                    </li>
                  </ol>
                </div>

                <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl text-emerald-900">
                  <p className="font-bold">সুবিধাসমূহ:</p>
                  <p className="mt-1">
                    • ছবিগুলো ক্লাউডিনারির হাই-স্পিড সার্ভারে সুরক্ষিত থাকবে।<br />
                    • আলাদা কোনো ডাটাবেজ ক্র্যাশ করা বা ডাটা হারানোর কোনো ভয় নেই।<br />
                    • সাইটের কোড সম্পূর্ণ হালকা (Lightweight) এবং ফাস্ট লোড হবে।
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Samples */}
            {activeTab === 'samples' && (
              <div className="space-y-3">
                <p className="text-xs text-gray-600">
                  টেস্ট করার জন্য নিচের যেকোনো একটি ছবিতে ক্লিক করলেই তা স্বয়ংক্রিয়ভাবে সিলেক্ট হয়ে যাবে:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-60 overflow-y-auto p-1">
                  {SAMPLE_CROCHET_IMAGES.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        onChange(item.url);
                        setIsModalOpen(false);
                      }}
                      className="group p-1.5 bg-gray-50 hover:bg-primary/10 border border-gray-200 hover:border-primary rounded-xl text-left transition-all cursor-pointer"
                    >
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-full h-16 object-cover rounded-lg mb-1"
                        referrerPolicy="no-referrer"
                      />
                      <p className="text-[10px] font-semibold text-gray-800 line-clamp-1 group-hover:text-primary">
                        {item.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Direct Upload */}
            {activeTab === 'direct' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Cloud Name
                    </label>
                    <input
                      type="text"
                      value={cloudName}
                      onChange={(e) => setCloudName(e.target.value)}
                      placeholder="e.g. demo"
                      className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Upload Preset
                    </label>
                    <input
                      type="text"
                      value={uploadPreset}
                      onChange={(e) => setUploadPreset(e.target.value)}
                      placeholder="e.g. naharcraft_preset"
                      className="w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                {uploadError && (
                  <div className="p-2 bg-red-50 text-red-600 rounded-lg text-xs flex items-center gap-1.5">
                    <AlertCircle size={14} className="shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                <label className="border-2 border-dashed border-gray-300 hover:border-primary rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-50/50 hover:bg-gray-50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleDirectFileUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2 text-primary text-xs font-semibold">
                      <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      <span>ক্লাউডিনারিতে আপলোড হচ্ছে...</span>
                    </div>
                  ) : (
                    <>
                      <Upload size={24} className="text-gray-400 mb-1" />
                      <span className="text-xs font-bold text-gray-700">ডিভাইস থেকে ছবি সিলেক্ট করুন</span>
                      <span className="text-[10px] text-gray-500 mt-0.5">JPG, PNG, WebP (সরাসরি ক্লাউডিনারিতে জমা হবে)</span>
                    </>
                  )}
                </label>
              </div>
            )}

            {/* Modal Footer */}
            <div className="mt-5 pt-3 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CloudinaryImageInput;
