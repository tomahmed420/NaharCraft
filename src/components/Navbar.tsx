import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MessageCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
      )}>
        <Link to="/" className="text-2xl font-serif font-bold text-primary">NaharCraft</Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-wider">
          <Link to="/" className="hover:text-primary transition-colors">হোম</Link>
          <Link to="/shop" className="hover:text-primary transition-colors">শপ</Link>
          <Link to="/our-story" className="hover:text-primary transition-colors">আমাদের গল্প</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">যোগাযোগ</Link>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://wa.me/8801234567890" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-accent-green text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-all"
          >
            <MessageCircle size={18} />
            <span>হোয়াটসঅ্যাপ</span>
          </a>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
          >
            <ShoppingBag size={22} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 flex flex-col gap-4 md:hidden"
            >
              <Link to="/" onClick={() => setIsMenuOpen(false)}>হোম</Link>
              <Link to="/shop" onClick={() => setIsMenuOpen(false)}>শপ</Link>
              <Link to="/our-story" onClick={() => setIsMenuOpen(false)}>আমাদের গল্প</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>যোগাযোগ</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
