import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, MessageCircle, ChevronRight, Check, ArrowLeft, Plus, Minus, Zap, ShoppingBag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { INITIAL_CONTENT } from '../data/content';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, openCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = PRODUCTS.find(p => String(p.id) === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">পণ্যটি পাওয়া যায়নি</h2>
          <p className="text-gray-500 mb-6">আপনি যে পণ্যটি খুঁজছেন তা হয়তো সরিয়ে ফেলা হয়েছে বা লিঙ্কটি ভুল।</p>
          <Link to="/shop" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all">
            শপে ফিরে যান
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleOrderNow = () => {
    addToCart(product, quantity);
    openCart();
  };

  const whatsappNumber = INITIAL_CONTENT.contact.whatsapp.replace(/[^0-9]/g, '');
  const whatsappMessage = encodeURIComponent(
    `হ্যালো! আমি NaharCraft থেকে "${product.name}" (পরিমাণ: ${quantity} টি, মূল্য: ৳${product.price * quantity}) অর্ডার/বিস্তারিত জানতে আগ্রহী।`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-24 sm:pt-28 pb-12 sm:pb-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8">
          <Link to="/" className="hover:text-primary transition-colors">হোম</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-primary transition-colors">শপ</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
            {/* Image Gallery */}
            <div className="p-4 sm:p-6 md:p-8 md:border-r border-gray-100 bg-gray-50/50">
              <div className="aspect-[4/5] sm:aspect-square rounded-xl overflow-hidden bg-gray-100 relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6 sm:p-8 md:p-10 flex flex-col">
              <div className="mb-6">
                <p className="text-primary text-sm font-medium tracking-wider uppercase mb-2">
                  {product.category}
                </p>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-end gap-3 mb-6 pb-6 border-b border-gray-100">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">৳{product.price}</span>
                  <span className="text-sm text-accent-green font-medium mb-1.5">ইন স্টক</span>
                </div>
              </div>

              <div className="mb-8 flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-3">পণ্যের বিবরণ</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  এটি একটি দৃষ্টিনন্দন হাতে তৈরি {product.category.toLowerCase()}, যা শতভাগ মানসম্মত সুতা দিয়ে নিপুণভাবে বোনা হয়েছে। 
                  আপনার ঘরের সৌন্দর্য বাড়াতে বা প্রিয়জনকে উপহার দিতে এটি একটি চমৎকার পছন্দ। প্রতিটি পণ্য আমাদের নিজস্ব কারিগরদের দ্বারা 
                  অত্যন্ত যত্ন সহকারে তৈরি করা হয়, তাই এর ফিনিশিং এবং কোয়ালিটি নিয়ে আপনি নিশ্চিন্ত থাকতে পারেন।
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                    শতভাগ হাতে তৈরি (Handmade)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                    প্রিমিয়াম কোয়ালিটি সুতা
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                    আকর্ষণীয় ডিজাইন এবং দীর্ঘস্থায়ী
                  </li>
                </ul>
              </div>

              {/* Quantity Picker & Total Preview */}
              <div className="mb-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700">পরিমাণ:</span>
                  <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50/50 p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-gray-600 hover:text-primary transition-colors disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      <Minus size={15} />
                    </button>
                    <span className="w-10 text-center font-bold text-gray-900 text-sm">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 block">মোট মূল্য</span>
                  <span className="text-lg sm:text-xl font-bold text-primary">৳{product.price * quantity}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mt-auto">
                {/* Primary Button: Order Now (Opens Side Cart Drawer) */}
                <button 
                  onClick={handleOrderNow}
                  className="w-full bg-primary text-white py-3.5 sm:py-4 px-6 rounded-xl font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2.5 active:scale-[0.98] shadow-lg shadow-primary/20 text-base"
                >
                  <Zap size={20} className="fill-current text-amber-300" />
                  <span>এখনই অর্ডার করুন</span>
                </button>

                {/* Secondary Row: Add to Cart & WhatsApp */}
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={handleAddToCart}
                    className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    {isAdded ? (
                      <>
                        <Check size={18} className="text-accent-green" />
                        <span className="text-xs sm:text-sm text-accent-green">যুক্ত হয়েছে</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} className="text-gray-500" />
                        <span className="text-xs sm:text-sm">কার্টে যোগ করুন</span>
                      </>
                    )}
                  </button>
                  
                  <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white border border-[#25D366]/30 py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    <MessageCircle size={18} />
                    <span className="text-xs sm:text-sm">হোয়াটসঅ্যাপ</span>
                  </a>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-center text-xs text-gray-400 gap-6">
                <span>✓ নিরাপদ ডেলিভারি</span>
                <span>✓ অরিজিনাল পণ্য</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
