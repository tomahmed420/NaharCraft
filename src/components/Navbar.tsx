import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, MessageCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, isCartOpen, openCart, closeCart } = useCart();
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isSolid = !isHome || isScrolled;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/our-story' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/shop') return location.pathname.startsWith('/shop') || location.pathname.startsWith('/product');
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out py-3 sm:py-3.5",
        isSolid 
          ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-gray-100" 
          : "bg-black/25 backdrop-blur-xs border-b border-white/10"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link 
            to="/" 
            className={cn(
              "text-xl sm:text-2xl font-serif font-bold tracking-tight transition-colors duration-500",
              isSolid ? "text-primary" : "text-white drop-shadow-sm hover:text-white/90"
            )}
          >
            NaharCraft
          </Link>
          
          <div className={cn(
            "hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium tracking-wide transition-all duration-500 px-6 py-2 rounded-full border shadow-xs",
            isSolid 
              ? "bg-gray-100/90 border-gray-200/90 backdrop-blur-md" 
              : "bg-black/35 border-white/20 backdrop-blur-md"
          )}>
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "transition-colors duration-300 relative py-1 text-xs lg:text-sm tracking-wide uppercase",
                    active 
                      ? (isSolid ? "text-primary font-bold" : "text-white font-bold") 
                      : (isSolid ? "text-gray-700 hover:text-primary font-medium" : "text-white/85 hover:text-white drop-shadow-xs font-medium")
                  )}
                >
                  {link.name}
                  {active && (
                    <motion.div 
                      layoutId="activeNavTab"
                      className={cn(
                        "absolute -bottom-1 left-0 right-0 h-[2px] rounded-full transition-colors duration-300",
                        isSolid ? "bg-primary" : "bg-white"
                      )}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <a 
              href="https://wa.me/8801234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                "hidden sm:flex items-center gap-2 bg-accent-green text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-opacity-90 transition-all shadow-xs duration-300 active:scale-95",
                !isSolid && "border border-white/20"
              )}
            >
              <MessageCircle size={16} />
              <span>হোয়াটসঅ্যাপ</span>
            </a>

            <button 
              onClick={openCart}
              aria-label="শপিং কার্ট"
              className={cn(
                "w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all duration-500 flex items-center justify-center relative backdrop-blur-md border shadow-xs active:scale-95",
                isSolid 
                  ? "bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-800" 
                  : "bg-black/35 hover:bg-black/50 border-white/20 text-white"
              )}
            >
              <ShoppingBag size={19} className="transition-colors duration-300" />
              {totalItems > 0 && (
                <span className={cn(
                  "absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold ring-2 transition-colors duration-300",
                  isSolid ? "ring-white" : "ring-black/40"
                )}>
                  {totalItems}
                </span>
              )}
            </button>

            <button 
              className={cn(
                "md:hidden w-9 h-9 rounded-full transition-all duration-500 flex items-center justify-center backdrop-blur-md border shadow-xs active:scale-95",
                isSolid 
                  ? "bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-800" 
                  : "bg-black/35 hover:bg-black/50 border-white/20 text-white"
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="মেনু খুলুন বা বন্ধ করুন"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 bg-white shadow-xl border-b border-gray-100 p-5 flex flex-col gap-2 md:hidden"
            >
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "py-2.5 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between",
                      active 
                        ? "bg-primary/10 text-primary font-bold" 
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <span>{link.name}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default Navbar;
