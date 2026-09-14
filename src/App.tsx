import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { INITIAL_CONTENT } from './data/content';
import { CATEGORIES } from './data/categories';
import { PRODUCTS } from './data/products';
import { TESTIMONIALS } from './data/testimonials';

// Frontend Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import FeaturedProducts from './components/FeaturedProducts';
import OurStorySection from './components/OurStorySection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

// Pages
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import OurStoryPage from './pages/OurStory';

// Admin Components
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCategories from './pages/admin/AdminCategories';
import AdminContent from './pages/admin/AdminContent';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero content={INITIAL_CONTENT.hero} />
      <CategoryGrid categories={CATEGORIES} />
      <FeaturedProducts products={PRODUCTS} />
      <OurStorySection content={INITIAL_CONTENT.ourStory} />
      <Testimonials testimonials={TESTIMONIALS} />
      <Footer />
    </div>
  );
};

import { CartProvider } from './context/CartContext';

// Trigger fresh build for Vercel
export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Frontend Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/our-story" element={<OurStoryPage />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
          <Route path="/admin/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />
          <Route path="/admin/categories" element={<AdminLayout><AdminCategories /></AdminLayout>} />
          <Route path="/admin/banners" element={<AdminLayout><div className="text-center py-20 text-gray-400">Banners Management Coming Soon</div></AdminLayout>} />
          <Route path="/admin/content" element={<AdminLayout><AdminContent /></AdminLayout>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
