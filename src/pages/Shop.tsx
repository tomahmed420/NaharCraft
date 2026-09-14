import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { cn } from '../lib/utils';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'সব');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'সব' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (sortBy === 'price-low') filteredProducts.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high') filteredProducts.sort((a, b) => b.price - a.price);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-6 md:mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-1 sm:mb-2">
              আমাদের সংগ্রহ
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-500">
              হাতে তৈরি ক্রুশবিদ্ধ পণ্যের সৌন্দর্য আবিষ্কার করুন ({filteredProducts.length}টি পণ্য)
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="পণ্য খুঁজুন..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none w-full bg-white shadow-xs"
              />
            </div>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none bg-white w-full sm:w-auto cursor-pointer shadow-xs"
            >
              <option value="newest">নতুন পণ্য আগে</option>
              <option value="price-low">মূল্য: কম থেকে বেশি</option>
              <option value="price-high">মূল্য: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Category Filter Sidebar / Horizontal Pills */}
          <aside className="lg:w-60 lg:shrink-0">
            <div className="lg:sticky lg:top-24 bg-white lg:bg-transparent p-3 sm:p-4 lg:p-0 rounded-2xl border border-gray-100 lg:border-0 shadow-xs lg:shadow-none">
              <h3 className="font-bold text-sm sm:text-base mb-3 flex items-center gap-2 text-gray-800">
                <Filter size={16} className="text-primary" />
                ক্যাটাগরি
              </h3>
              <div className="flex overflow-x-auto lg:flex-col gap-1.5 sm:gap-2 pb-1 lg:pb-0 scrollbar-hide -mx-1 px-1 lg:mx-0 lg:px-0">
                <button 
                  onClick={() => setSelectedCategory('সব')}
                  className={cn(
                    "px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all text-left whitespace-nowrap shrink-0 border",
                    selectedCategory === 'সব' 
                      ? "bg-primary text-white border-primary shadow-xs" 
                      : "bg-gray-50 lg:bg-white text-gray-700 border-gray-100 hover:border-primary/40 hover:bg-gray-50"
                  )}
                >
                  সব পণ্য
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={cn(
                      "px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all text-left whitespace-nowrap shrink-0 border",
                      selectedCategory === cat.name 
                        ? "bg-primary text-white border-primary shadow-xs" 
                        : "bg-gray-50 lg:bg-white text-gray-700 border-gray-100 hover:border-primary/40 hover:bg-gray-50"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid: 2 Columns on Mobile, 2 on SM, 3 on LG */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 sm:py-20 bg-white rounded-3xl border border-dashed border-gray-300 p-6">
                <p className="text-gray-500 mb-4 text-sm sm:text-base">আপনার বাছাই করা শর্তে কোন পণ্য পাওয়া যায়নি।</p>
                <button
                  onClick={() => { setSelectedCategory('সব'); setSearchQuery(''); }}
                  className="px-5 py-2 bg-primary text-white rounded-xl text-xs sm:text-sm font-medium hover:bg-opacity-90 transition-all"
                >
                  ফিল্টার রিসেট করুন
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
