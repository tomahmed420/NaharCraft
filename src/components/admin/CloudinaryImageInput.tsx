import React, { useState } from 'react';
import { Image as ImageIcon, Copy, Check, X, ExternalLink, AlertCircle } from 'lucide-react';

interface CloudinaryImageInputProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
}

const CloudinaryImageInput: React.FC<CloudinaryImageInputProps> = ({
  label,
  value,
  onChange,
  required = false,
  placeholder = 'https://res.cloudinary.com/... বা যেকোনো ছবির লিংক পেস্ট করুন',
  helperText = 'ক্লাউডিনারি (Cloudinary) বা যেকোনো ছবির ডিরেক্ট ওয়েব লিংক পেস্ট করুন।'
}) => {
  const [imageError, setImageError] = useState(false);
  const [pasted, setPasted] = useState(false);

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && (text.startsWith('http://') || text.startsWith('https://') || text.startsWith('data:image/'))) {
        onChange(text.trim());
        setImageError(false);
        setPasted(true);
        setTimeout(() => setPasted(false), 2000);
      }
    } catch {
      // Clipboard permission denied or unsupported in context
    }
  };

  const handleClear = () => {
    onChange('');
    setImageError(false);
  };

  return (
    <div className="space-y-2">
      {/* Label and Actions */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="text-[11px] font-medium text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
          >
            <X size={12} />
            <span>লিংক মুছুন</span>
          </button>
        )}
      </div>

      {/* Input Field with Paste Button */}
      <div className="relative flex items-center">
        <div className="absolute left-3 text-gray-400 pointer-events-none">
          <ImageIcon size={16} />
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setImageError(false);
          }}
          placeholder={placeholder}
          required={required}
          className="w-full pl-9 pr-24 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
        />

        <div className="absolute right-1.5 flex items-center gap-1">
          <button
            type="button"
            onClick={handlePasteClipboard}
            title="ক্লিপবোর্ড থেকে পেস্ট করুন"
            className="px-2.5 py-1 text-[11px] font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-1 transition-all active:scale-95"
          >
            {pasted ? (
              <>
                <Check size={12} className="text-emerald-600" />
                <span className="text-emerald-700">পেস্ট হয়েছে</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>পেস্ট করুন</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Helper text */}
      <div className="flex items-center justify-between text-[11px] text-gray-500">
        <span>{helperText}</span>
        {value && value.includes('cloudinary.com') && (
          <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
            Cloudinary Link
          </span>
        )}
      </div>

      {/* Image Preview Box */}
      {value && (
        <div className="mt-2 p-3 bg-gray-50/80 rounded-xl border border-gray-200/80 flex items-center gap-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-white border border-gray-200 shrink-0 shadow-xs">
            {!imageError ? (
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-amber-50 text-amber-600 p-1 text-center">
                <AlertCircle size={16} />
                <span className="text-[9px] font-bold mt-0.5">ভুল লিঙ্ক</span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              {!imageError ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-emerald-700">ছবি সঠিক আছে (লাইভ প্রিভিউ)</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span className="text-xs font-bold text-amber-700">ছবি লোড হয়নি</span>
                </>
              )}
            </div>

            <p className="text-[11px] text-gray-500 truncate font-mono">
              {value}
            </p>

            <div className="mt-1.5 flex items-center gap-3">
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-primary hover:underline flex items-center gap-1 font-medium"
              >
                <span>নতুন ট্যাবে ছবি দেখুন</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CloudinaryImageInput;
