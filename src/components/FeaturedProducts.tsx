import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-1 sm:mb-2 text-gray-900">
              বিশেষ পণ্যসমূহ
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-500">আমাদের সবচেয়ে প্রিয় সৃষ্টিগুলো</p>
          </div>
          <Link to="/shop" className="flex items-center gap-1.5 sm:gap-2 text-primary font-medium text-xs sm:text-sm hover:gap-2.5 transition-all">
            <span>সব দেখুন</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {products.filter(p => p.featured).map(product => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
