import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Product, 
  Category, 
  HeroContent, 
  PromoBanners, 
  OurStoryContent, 
  ContactContent, 
  FAQItem, 
  Testimonial, 
  SiteSettings,
  AdminUser
} from '../types';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { INITIAL_CONTENT } from '../data/content';
import { TESTIMONIALS } from '../data/testimonials';
import { INITIAL_FAQS, INITIAL_PROMOS, INITIAL_SETTINGS } from '../data/faqs';

const STORAGE_KEY = 'naharcraft_live_database_v1';
const SESSION_KEY = 'naharcraft_admin_session_v1';

export const DEFAULT_MASTER_ADMIN: AdminUser = {
  id: 'master-01',
  name: 'মাস্টার অ্যাডমিন (Super Admin)',
  username: 'admin',
  password: 'admin',
  role: 'master',
  status: 'active',
  createdAt: '2025-01-01'
};

interface DataState {
  products: Product[];
  categories: Category[];
  hero: HeroContent;
  promos: PromoBanners;
  ourStory: OurStoryContent;
  contact: ContactContent;
  faqs: FAQItem[];
  testimonials: Testimonial[];
  settings: SiteSettings;
  admins: AdminUser[];
}

interface DataContextType extends DataState {
  // Admin Auth & User Management
  currentAdmin: AdminUser | null;
  loginAdmin: (username: string, password: string) => { success: boolean; message?: string };
  logoutAdmin: () => void;
  addAdmin: (admin: Omit<AdminUser, 'id' | 'createdAt'>) => { success: boolean; message?: string };
  updateAdmin: (id: string, updated: Partial<AdminUser>) => { success: boolean; message?: string };
  deleteAdmin: (id: string) => { success: boolean; message?: string };

  // Product methods
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, updated: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  toggleProductStock: (id: number) => void;
  toggleProductFeatured: (id: number) => void;

  // Category methods
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: number, updated: Partial<Category>) => void;
  deleteCategory: (id: number) => void;

  // Content methods
  updateHero: (hero: Partial<HeroContent>) => void;
  updatePromos: (promos: Partial<PromoBanners>) => void;
  updateOurStory: (story: Partial<OurStoryContent>) => void;
  updateContact: (contact: Partial<ContactContent>) => void;

  // FAQ methods
  addFAQ: (faq: Omit<FAQItem, 'id'>) => void;
  updateFAQ: (id: string, updated: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;

  // Testimonial methods
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: number, updated: Partial<Testimonial>) => void;
  deleteTestimonial: (id: number) => void;

  // Settings & System
  updateSettings: (settings: Partial<SiteSettings>) => void;
  resetToDefaults: () => void;
  exportBackupJSON: () => void;
  importBackupJSON: (jsonString: string) => boolean;
}

const defaultState: DataState = {
  products: PRODUCTS.map(p => ({ ...p, inStock: p.stock === undefined || p.stock > 0 })),
  categories: CATEGORIES,
  hero: INITIAL_CONTENT.hero,
  promos: INITIAL_PROMOS,
  ourStory: INITIAL_CONTENT.ourStory,
  contact: INITIAL_CONTENT.contact,
  faqs: INITIAL_FAQS,
  testimonials: TESTIMONIALS,
  settings: INITIAL_SETTINGS,
  admins: [DEFAULT_MASTER_ADMIN]
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DataState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          products: parsed.products || defaultState.products,
          categories: parsed.categories || defaultState.categories,
          hero: parsed.hero || defaultState.hero,
          promos: parsed.promos || defaultState.promos,
          ourStory: parsed.ourStory || defaultState.ourStory,
          contact: parsed.contact || defaultState.contact,
          faqs: parsed.faqs || defaultState.faqs,
          testimonials: parsed.testimonials || defaultState.testimonials,
          settings: parsed.settings || defaultState.settings,
          admins: parsed.admins && parsed.admins.length > 0 ? parsed.admins : defaultState.admins
        };
      }
    } catch (e) {
      console.error('Failed to load live data from localStorage:', e);
    }
    return defaultState;
  });

  // Current logged in admin session
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to restore admin session:', e);
    }
    return null;
  });

  // Keep session synchronized if current admin info changes in data.admins
  useEffect(() => {
    if (currentAdmin) {
      const fresh = data.admins.find(a => a.id === currentAdmin.id);
      if (fresh) {
        if (fresh.status !== 'active') {
          // If disabled, log out
          setCurrentAdmin(null);
          localStorage.removeItem(SESSION_KEY);
        } else {
          setCurrentAdmin(fresh);
          localStorage.setItem(SESSION_KEY, JSON.stringify(fresh));
        }
      }
    }
  }, [data.admins]);

  // Automatically save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to persist data in localStorage:', e);
    }
  }, [data]);

  // Admin Auth Operations
  const loginAdmin = (username: string, password: string): { success: boolean; message?: string } => {
    const cleanUsername = username.trim().toLowerCase();
    const found = data.admins.find(a => 
      (a.username.toLowerCase() === cleanUsername || (cleanUsername === 'admin' && a.role === 'master')) && 
      a.password === password
    );

    if (!found) {
      return { success: false, message: 'ভুল ইউজারনেম অথবা পাসওয়ার্ড প্রদান করা হয়েছে।' };
    }

    if (found.status !== 'active') {
      return { success: false, message: 'এই অ্যাকাউন্টটি বর্তমানে নিষ্ক্রিয় (Inactive) রয়েছে। মাস্টার অ্যাডমিনের সাথে যোগাযোগ করুন।' };
    }

    const updatedUser: AdminUser = {
      ...found,
      lastLogin: new Date().toLocaleString('bn-BD')
    };

    setCurrentAdmin(updatedUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));

    // Update in list
    setData(prev => ({
      ...prev,
      admins: prev.admins.map(a => (a.id === found.id ? updatedUser : a))
    }));

    return { success: true };
  };

  const logoutAdmin = () => {
    setCurrentAdmin(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const addAdmin = (newAdmin: Omit<AdminUser, 'id' | 'createdAt'>): { success: boolean; message?: string } => {
    const cleanUsername = newAdmin.username.trim();
    if (!cleanUsername) {
      return { success: false, message: 'ইউজারনেম বা ইমেইল প্রদান করুন।' };
    }
    if (!newAdmin.password || newAdmin.password.length < 4) {
      return { success: false, message: 'পাসওয়ার্ড ন্যূনতম ৪ অক্ষরের হতে হবে।' };
    }

    const exists = data.admins.some(a => a.username.toLowerCase() === cleanUsername.toLowerCase());
    if (exists) {
      return { success: false, message: 'এই ইউজারনেম দিয়ে ইতিমধ্যে একজন অ্যাডমিন রয়েছেন।' };
    }

    const created: AdminUser = {
      ...newAdmin,
      id: 'admin_' + Date.now(),
      username: cleanUsername,
      createdAt: new Date().toISOString().slice(0, 10),
      status: newAdmin.status || 'active'
    };

    setData(prev => ({
      ...prev,
      admins: [...prev.admins, created]
    }));

    return { success: true };
  };

  const updateAdmin = (id: string, updated: Partial<AdminUser>): { success: boolean; message?: string } => {
    // If username is being changed, check uniqueness
    if (updated.username) {
      const clean = updated.username.trim();
      const duplicate = data.admins.some(a => a.id !== id && a.username.toLowerCase() === clean.toLowerCase());
      if (duplicate) {
        return { success: false, message: 'এই ইউজারনেমটি অন্য একজন অ্যাডমিন ব্যবহার করছেন।' };
      }
      updated.username = clean;
    }

    setData(prev => ({
      ...prev,
      admins: prev.admins.map(a => (a.id === id ? { ...a, ...updated } : a))
    }));

    return { success: true };
  };

  const deleteAdmin = (id: string): { success: boolean; message?: string } => {
    const target = data.admins.find(a => a.id === id);
    if (!target) {
      return { success: false, message: 'অ্যাডমিন পাওয়া যায়নি।' };
    }

    // Safety check: Cannot delete master admin if it's the last master admin
    if (target.role === 'master') {
      const masterCount = data.admins.filter(a => a.role === 'master').length;
      if (masterCount <= 1) {
        return { success: false, message: 'নিরাপত্তার স্বার্থে মাস্টার অ্যাডমিন ডিলিট করা যাবে না। সিস্টেমে অন্তত একজন মাস্টার অ্যাডমিন থাকা আবশ্যক।' };
      }
    }

    // Cannot delete currently logged in admin directly
    if (currentAdmin && currentAdmin.id === id) {
      return { success: false, message: 'আপনি বর্তমানে এই অ্যাকাউন্টে লগইন থাকা অবস্থায় এটি ডিলিট করতে পারবেন না।' };
    }

    setData(prev => ({
      ...prev,
      admins: prev.admins.filter(a => a.id !== id)
    }));

    return { success: true };
  };

  // Product Operations
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    setData(prev => {
      const newId = prev.products.length > 0 ? Math.max(...prev.products.map(p => p.id)) + 1 : 1;
      return {
        ...prev,
        products: [{ ...newProd, id: newId, inStock: newProd.inStock !== false }, ...prev.products]
      };
    });
  };

  const updateProduct = (id: number, updated: Partial<Product>) => {
    setData(prev => ({
      ...prev,
      products: prev.products.map(p => (p.id === id ? { ...p, ...updated } : p))
    }));
  };

  const deleteProduct = (id: number) => {
    setData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  };

  const toggleProductStock = (id: number) => {
    setData(prev => ({
      ...prev,
      products: prev.products.map(p => (p.id === id ? { ...p, inStock: !p.inStock } : p))
    }));
  };

  const toggleProductFeatured = (id: number) => {
    setData(prev => ({
      ...prev,
      products: prev.products.map(p => (p.id === id ? { ...p, featured: !p.featured } : p))
    }));
  };

  // Category Operations
  const addCategory = (newCat: Omit<Category, 'id'>) => {
    setData(prev => {
      const newId = prev.categories.length > 0 ? Math.max(...prev.categories.map(c => c.id)) + 1 : 1;
      return {
        ...prev,
        categories: [...prev.categories, { ...newCat, id: newId }]
      };
    });
  };

  const updateCategory = (id: number, updated: Partial<Category>) => {
    setData(prev => ({
      ...prev,
      categories: prev.categories.map(c => (c.id === id ? { ...c, ...updated } : c))
    }));
  };

  const deleteCategory = (id: number) => {
    setData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c.id !== id)
    }));
  };

  // Content Operations
  const updateHero = (hero: Partial<HeroContent>) => {
    setData(prev => ({
      ...prev,
      hero: { ...prev.hero, ...hero }
    }));
  };

  const updatePromos = (promos: Partial<PromoBanners>) => {
    setData(prev => ({
      ...prev,
      promos: {
        ...prev.promos,
        ...promos,
        banner1: { ...prev.promos.banner1, ...(promos.banner1 || {}) },
        banner2: { ...prev.promos.banner2, ...(promos.banner2 || {}) }
      }
    }));
  };

  const updateOurStory = (story: Partial<OurStoryContent>) => {
    setData(prev => ({
      ...prev,
      ourStory: { ...prev.ourStory, ...story }
    }));
  };

  const updateContact = (contact: Partial<ContactContent>) => {
    setData(prev => ({
      ...prev,
      contact: { ...prev.contact, ...contact }
    }));
  };

  // FAQ Operations
  const addFAQ = (newFaq: Omit<FAQItem, 'id'>) => {
    setData(prev => {
      const newId = String(Date.now());
      return {
        ...prev,
        faqs: [...prev.faqs, { ...newFaq, id: newId }]
      };
    });
  };

  const updateFAQ = (id: string, updated: Partial<FAQItem>) => {
    setData(prev => ({
      ...prev,
      faqs: prev.faqs.map(f => (f.id === id ? { ...f, ...updated } : f))
    }));
  };

  const deleteFAQ = (id: string) => {
    setData(prev => ({
      ...prev,
      faqs: prev.faqs.filter(f => f.id !== id)
    }));
  };

  // Testimonial Operations
  const addTestimonial = (newTestimonial: Omit<Testimonial, 'id'>) => {
    setData(prev => {
      const newId = prev.testimonials.length > 0 ? Math.max(...prev.testimonials.map(t => t.id)) + 1 : 1;
      return {
        ...prev,
        testimonials: [{ ...newTestimonial, id: newId }, ...prev.testimonials]
      };
    });
  };

  const updateTestimonial = (id: number, updated: Partial<Testimonial>) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => (t.id === id ? { ...t, ...updated } : t))
    }));
  };

  const deleteTestimonial = (id: number) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter(t => t.id !== id)
    }));
  };

  // Settings
  const updateSettings = (settings: Partial<SiteSettings>) => {
    setData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settings }
    }));
  };

  // Factory Reset
  const resetToDefaults = () => {
    setData(defaultState);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Export JSON Backup
  const exportBackupJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `naharcraft-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON Backup
  const importBackupJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.products && parsed.categories && parsed.hero) {
        setData(prev => ({
          products: parsed.products,
          categories: parsed.categories,
          hero: parsed.hero,
          promos: parsed.promos || defaultState.promos,
          ourStory: parsed.ourStory || defaultState.ourStory,
          contact: parsed.contact || defaultState.contact,
          faqs: parsed.faqs || defaultState.faqs,
          testimonials: parsed.testimonials || defaultState.testimonials,
          settings: parsed.settings || defaultState.settings,
          admins: parsed.admins && parsed.admins.length > 0 ? parsed.admins : prev.admins
        }));
        return true;
      }
      return false;
    } catch (e) {
      console.error('Invalid JSON file:', e);
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        ...data,
        currentAdmin,
        loginAdmin,
        logoutAdmin,
        addAdmin,
        updateAdmin,
        deleteAdmin,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStock,
        toggleProductFeatured,
        addCategory,
        updateCategory,
        deleteCategory,
        updateHero,
        updatePromos,
        updateOurStory,
        updateContact,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        updateSettings,
        resetToDefaults,
        exportBackupJSON,
        importBackupJSON
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
