import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider, useData } from './context/DataContext';
import { CartProvider } from './context/CartContext';

// Frontend Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import FeaturedProducts from './components/FeaturedProducts';
import OfferBanner from './components/OfferBanner';
import FAQSection from './components/FAQSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import OurStoryPage from './pages/OurStory';
import ProductDetails from './pages/ProductDetails';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import FAQPage from './pages/FAQPage';
import PrivacyPolicy from './pages/PrivacyPolicy';

// Admin Components
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCategories from './pages/admin/AdminCategories';
import AdminHeroBanner from './pages/admin/AdminHeroBanner';
import AdminContent from './pages/admin/AdminContent';
import AdminFAQReviews from './pages/admin/AdminFAQReviews';
import AdminSettings from './pages/admin/AdminSettings';
import AdminUsers from './pages/admin/AdminUsers';

const Home = () => {
  const { hero, categories, products, testimonials } = useData();

  // Featured products or first 6 products
  const featured = products.filter(p => p.featured);
  const displayProducts = featured.length > 0 ? featured : products.slice(0, 6);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero content={hero} />
      <CategoryGrid categories={categories} />
      <FeaturedProducts products={displayProducts} />
      <OfferBanner />
      <FAQSection />
      <Testimonials testimonials={testimonials} />
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <DataProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Frontend Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/our-story" element={<OurStoryPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shipping" element={<ShippingPolicy />} />
            <Route path="/returns" element={<ReturnPolicy />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />

            {/* Admin Live Management Routes */}
            <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/products" element={<AdminLayout><AdminProducts /></AdminLayout>} />
            <Route path="/admin/categories" element={<AdminLayout><AdminCategories /></AdminLayout>} />
            <Route path="/admin/banners" element={<AdminLayout><AdminHeroBanner /></AdminLayout>} />
            <Route path="/admin/content" element={<AdminLayout><AdminContent /></AdminLayout>} />
            <Route path="/admin/faq-reviews" element={<AdminLayout><AdminFAQReviews /></AdminLayout>} />
            <Route path="/admin/orders" element={<AdminLayout><AdminOrders /></AdminLayout>} />
            <Route path="/admin/admins" element={<AdminLayout><AdminUsers /></AdminLayout>} />
            <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
          </Routes>
        </Router>
      </CartProvider>
    </DataProvider>
  );
}

