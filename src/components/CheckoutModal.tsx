import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, MapPin, Truck, ShieldCheck, CheckCircle2, User, Phone, Home, FileText, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { INITIAL_CONTENT } from '../data/content';
import { cn } from '../lib/utils';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, totalPrice, clearCart } = useCart();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryArea, setDeliveryArea] = useState<'inside' | 'outside'>('inside');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const isFreeDelivery = totalPrice >= 1000;
  const deliveryCharge = isFreeDelivery ? 0 : deliveryArea === 'inside' ? 70 : 130;
  const grandTotal = totalPrice + deliveryCharge;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) {
      newErrors.fullName = 'দয়া করে আপনার নাম লিখুন';
    }
    if (!phone.trim()) {
      newErrors.phone = 'দয়া করে আপনার মোবাইল নম্বর লিখুন';
    } else if (!/^01[3-9]\d{8}$/.test(phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)';
    }
    if (!address.trim()) {
      newErrors.address = 'ডেলিভারির জন্য আপনার পূর্ণ ঠিকানা লিখুন';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const areaName = deliveryArea === 'inside' ? 'ঢাকা মেট্রো' : 'ঢাকার বাইরে (সারা দেশ)';
    const deliveryChargeText = isFreeDelivery ? 'ফ্রি (৳০)' : `৳${deliveryCharge}`;

    const itemsText = cart
      .map((item, index) => `${index + 1}. ${item.name} (${item.quantity} টি) - ৳${item.price * item.quantity}`)
      .join('\n');

    const message = `🛍️ *নতুন অর্ডার - NaharCraft*
━━━━━━━━━━━━━━━━━━━
📦 *অর্ডারকৃত পণ্যসমূহ:*
${itemsText}

💰 *মূল্য বিবরণ:*
• সাবটোটাল: ৳${totalPrice}
• ডেলিভারি এলাকা: ${areaName}
• ডেলিভারি চার্জ: ${deliveryChargeText}
• *সর্বমোট প্রদেয়: ৳${grandTotal} (ক্যাশ অন ডেলিভারি)*

👤 *গ্রাহকের ডেলিভারি তথ্য:*
• নাম: ${fullName.trim()}
• মোবাইল: ${phone.trim()}
• ঠিকানা: ${address.trim()}
${notes.trim() ? `• বিশেষ নোট: ${notes.trim()}\n` : ''}━━━━━━━━━━━━━━━━━━━
দয়া করে আমার এই অর্ডারটি গ্রহণ ও কনফার্ম করুন। ধন্যবাদ!`;

    const whatsappNumber = INITIAL_CONTENT.contact.whatsapp.replace(/[^0-9]/g, '');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
  };

  const handleFinish = () => {
    clearCart();
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-amber-800 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
                <Truck size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg">চেকআউট ও ডেলিভারি তথ্য</h3>
                <p className="text-[11px] sm:text-xs text-amber-100/90">ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে মূল্য পরিশোধ)</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto p-4 sm:p-6 space-y-5">
            {isSubmitted ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="font-serif text-xl font-bold text-gray-900">
                  অর্ডার হোয়াটসঅ্যাপে পাঠানো হয়েছে!
                </h4>
                <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                  আপনার সম্পূর্ণ অর্ডারের বিবরণ নিয়ে হোয়াটসঅ্যাপ চ্যাট চালু করা হয়েছে। আমাদের প্রতিনিধি দ্রুত আপনার অর্ডার কনফার্ম করবেন।
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs text-gray-600 text-left space-y-1.5">
                  <p><strong>গ্রাহকের নাম:</strong> {fullName}</p>
                  <p><strong>মোবাইল:</strong> {phone}</p>
                  <p><strong>মোট প্রদেয়:</strong> ৳{grandTotal} (ক্যাশ অন ডেলিভারি)</p>
                </div>
                <button
                  onClick={handleFinish}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-medium transition-all shadow-md"
                >
                  ঠিক আছে, শপিং-এ ফিরে যান
                </button>
              </div>
            ) : (
              <form onSubmit={handleWhatsAppOrder} className="space-y-4">
                {/* Order Mini Summary */}
                <div className="bg-amber-50/50 border border-amber-200/80 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                    <span>আপনার ব্যাগে {cart.length} টি আইটেম</span>
                    <span className="text-primary font-bold">পণ্য মূল্য: ৳{totalPrice}</span>
                  </div>
                  <div className="max-h-24 overflow-y-auto space-y-1 text-xs text-gray-600 pr-1 divide-y divide-amber-100">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center pt-1 first:pt-0">
                        <span className="truncate max-w-[200px]">{item.name} × {item.quantity}</span>
                        <span className="font-medium text-gray-900">৳{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Area Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-900 flex items-center gap-1.5">
                    <MapPin size={14} className="text-primary" />
                    <span>ডেলিভারি এলাকা নির্বাচন করুন:</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setDeliveryArea('inside')}
                      className={cn(
                        'p-3 rounded-xl border text-left transition-all',
                        deliveryArea === 'inside'
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      )}
                    >
                      <p className="text-xs font-bold text-gray-900">ঢাকা মেট্রো</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        চার্জ: {isFreeDelivery ? <span className="text-emerald-600 font-bold">ফ্রি (৳০)</span> : '৳৭০'}
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryArea('outside')}
                      className={cn(
                        'p-3 rounded-xl border text-left transition-all',
                        deliveryArea === 'outside'
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      )}
                    >
                      <p className="text-xs font-bold text-gray-900">ঢাকার বাইরে (সারা দেশ)</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        চার্জ: {isFreeDelivery ? <span className="text-emerald-600 font-bold">ফ্রি (৳০)</span> : '৳১৩০'}
                      </p>
                    </button>
                  </div>

                  {isFreeDelivery && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5">
                      <ShieldCheck size={14} />
                      <span>অভিনন্দন! ১০০০+ টাকার অর্ডারে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি।</span>
                    </div>
                  )}
                </div>

                {/* Name Field */}
                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-1">
                    আপনার নাম *
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="যেমন: তানিয়া ইসলাম"
                      className={cn(
                        'w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20',
                        errors.fullName ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-primary'
                      )}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-1">
                    মোবাইল নম্বর * (কুরিয়ার ও কনফার্মেশনের জন্য)
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className={cn(
                        'w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20',
                        errors.phone ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-primary'
                      )}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Address Field */}
                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-1">
                    পূর্ণ ডেলিভারি ঠিকানা * (বাসা/রোড/এলাকা/উপজেলা/জেলা)
                  </label>
                  <div className="relative">
                    <Home size={16} className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="যেমন: বাড়ি ১২, রোড ৪, সেক্টর ৭, উত্তরা, ঢাকা"
                      className={cn(
                        'w-full pl-9 pr-3.5 py-2 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20',
                        errors.address ? 'border-red-500 bg-red-50/20' : 'border-gray-200 focus:border-primary'
                      )}
                    />
                  </div>
                  {errors.address && (
                    <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>
                  )}
                </div>

                {/* Special Note */}
                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-1">
                    কোনো বিশেষ রঙ/সাইজ বা কাস্টমাইজেশন নোট (ঐচ্ছিক)
                  </label>
                  <div className="relative">
                    <FileText size={16} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="যেমন: গোলাপের রঙ লাল দেবেন"
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                {/* Pricing Summary Breakdown */}
                <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-200/80 space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>পণ্যের সাবটোটাল:</span>
                    <span className="font-semibold text-gray-800">৳{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>ডেলিভারি চার্জ:</span>
                    <span className="font-semibold text-gray-800">
                      {isFreeDelivery ? <span className="text-emerald-600">ফ্রি (৳০)</span> : `৳${deliveryCharge}`}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-1.5 flex justify-between text-sm font-bold text-gray-900">
                    <span>সর্বমোট প্রদেয় মূল্য (COD):</span>
                    <span className="text-primary text-base font-extrabold">৳{grandTotal}</span>
                  </div>
                </div>

                {/* Submit WhatsApp Button */}
                <button
                  type="submit"
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-[#25D366]/25 active:scale-[0.99]"
                >
                  <MessageCircle size={20} />
                  <span className="text-sm sm:text-base">হোয়াটসঅ্যাপে অর্ডার কনফার্ম করুন</span>
                  <ArrowRight size={18} />
                </button>

                <p className="text-[11px] text-center text-gray-500 flex items-center justify-center gap-1">
                  <ShieldCheck size={13} className="text-emerald-600" />
                  <span>ক্যাশ অন ডেলিভারি — পণ্য হাতে পেয়ে চেক করে টাকা দেবেন</span>
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CheckoutModal;
