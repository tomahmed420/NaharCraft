import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ShoppingCart, MessageCircle, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const whatsappMessage = encodeURIComponent(
    `হ্যালো! আমি NaharCraft থেকে "${product.name}" (মূল্য: ৳${product.price}) অর্ডার/বিস্তারিত জানতে আগ্রহী।`
  );
  const whatsappUrl = `https://wa.me/8801234567890?text=${whatsappMessage}`;

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col h-full"
    >
      {/* Product Image with Badges & Quick Action */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Featured Tag */}
        {product.featured && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 bg-primary/90 text-white text-[10px] sm:text-xs font-medium rounded-full shadow-sm backdrop-blur-xs">
            ফিচার্ড
          </span>
        )}

        {/* Floating Quick Add */}
        <button 
          onClick={handleAddToCart}
          title="ব্যাগে যুক্ত করুন"
          aria-label="ব্যাগে যুক্ত করুন"
          className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 bg-white/90 hover:bg-white text-gray-700 hover:text-primary rounded-full shadow-md flex items-center justify-center transition-all active:scale-90 backdrop-blur-xs"
        >
          {isAdded ? (
            <Check size={14} className="text-accent-green" />
          ) : (
            <ShoppingBag size={14} />
          )}
        </button>
      </div>

      {/* Card Details */}
      <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1 justify-between">
        <div>
          <p className="text-[10px] sm:text-xs text-gray-400 font-medium uppercase tracking-wider mb-1 line-clamp-1">
            {product.category}
          </p>
          <h3 className="text-xs sm:text-sm md:text-base font-serif font-bold text-gray-900 line-clamp-1 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="pt-2 border-t border-gray-50 mt-auto">
          <div className="flex items-baseline justify-between mb-2 sm:mb-3">
            <span className="text-sm sm:text-base md:text-lg font-bold text-primary">
              ৳{product.price}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button 
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 bg-primary text-white py-1.5 sm:py-2 px-1.5 sm:px-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-opacity-90 transition-all active:scale-[0.98]"
            >
              {isAdded ? (
                <>
                  <Check size={14} />
                  <span className="text-[11px] sm:text-xs">যুক্ত হয়েছে</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={14} className="shrink-0" />
                  <span className="text-[11px] sm:text-xs truncate">ব্যাগে নিন</span>
                </>
              )}
            </button>
            
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="হোয়াটসঅ্যাপে অর্ডার বা জিজ্ঞাসা"
              className="p-1.5 sm:p-2 bg-accent-green text-white rounded-lg hover:bg-opacity-90 transition-all shrink-0 flex items-center justify-center"
            >
              <MessageCircle size={15} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
