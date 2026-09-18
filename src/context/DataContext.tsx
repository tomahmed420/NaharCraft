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
import { supabase } from '../lib/supabase';

const STORAGE_KEY = 'naharcraft_live_database_v2';
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

  // Fetch from Supabase on mount
  useEffect(() => {
    const fetchFromSupabase = async () => {
      try {
        // Fetch categories first
        let mappedCats: any[] = [];
        const { data: supaCats, error: catError } = await supabase.from('categories').select('*');
        if (!catError && supaCats && supaCats.length > 0) {
          mappedCats = supaCats.map(c => ({
            id: c.id,
            name: c.name,
            image: c.image_url || c.image || 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=600&h=600'
          }));
          setData(prev => ({ ...prev, categories: mappedCats as any }));
        }

        // Fetch products
        const { data: supaProducts, error: prodError } = await supabase.from('products').select('*');
        if (!prodError && supaProducts && supaProducts.length > 0) {
          const mappedProducts = supaProducts.map(p => {
            const catName = mappedCats.find(c => c.id === p.category_id)?.name || 'Uncategorized';
            return {
              id: p.id,
              name: p.name,
              category: catName,
              price: p.price,
              image: (p.images && p.images.length > 0) ? p.images[0] : (p.image || 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=600&h=600'),
              description: p.description || '',
              featured: Boolean(p.featured),
              stock: p.stock || 0,
              inStock: p.stock > 0 || p.is_published
            };
          });
          setData(prev => ({ ...prev, products: mappedProducts as any }));
        }

        // Fetch FAQs
        const { data: supaFaqs, error: faqError } = await supabase.from('faqs').select('*');
        if (!faqError && supaFaqs) {
          setData(prev => ({ ...prev, faqs: supaFaqs }));
        }

        // Fetch Testimonials
        const { data: supaTestimonials, error: testError } = await supabase.from('testimonials').select('*');
        if (!testError && supaTestimonials) {
          setData(prev => ({ ...prev, testimonials: supaTestimonials }));
        }

        // Fetch Admins
        const { data: supaAdmins, error: adminError } = await supabase.from('admins').select('*');
        if (!adminError && supaAdmins && supaAdmins.length > 0) {
          setData(prev => ({ ...prev, admins: supaAdmins }));
        }

        // Fetch Site Content
        const { data: supaContent, error: contentError } = await supabase.from('site_content').select('*');
        if (!contentError && supaContent) {
          const contentMap: any = {};
          supaContent.forEach(item => {
            contentMap[item.key] = item.content;
          });
          
          setData(prev => ({
            ...prev,
            hero: contentMap.hero || prev.hero,
            promos: contentMap.promos || prev.promos,
            ourStory: contentMap.ourStory || prev.ourStory,
            contact: contentMap.contact || prev.contact,
            settings: contentMap.settings || prev.settings
          }));
        }
      } catch (err) {
        console.error('Supabase fetch failed:', err);
      }
    };
    fetchFromSupabase();
  }, []);

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

  const addAdmin = async (newAdmin: Omit<AdminUser, 'id' | 'createdAt'>): Promise<{ success: boolean; message?: string }> => {
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

    const tempId = 'admin_' + Date.now();
    const created: AdminUser = {
      ...newAdmin,
      id: tempId,
      username: cleanUsername,
      createdAt: new Date().toISOString().slice(0, 10),
      status: newAdmin.status || 'active'
    };

    setData(prev => ({
      ...prev,
      admins: [...prev.admins, created]
    }));

    try {
      const { data: inserted, error } = await supabase.from('admins').insert([
        { 
          name: newAdmin.name, 
          username: cleanUsername, 
          password: newAdmin.password, 
          role: newAdmin.role, 
          status: newAdmin.status || 'active' 
        }
      ]).select();
      
      if (!error && inserted && inserted[0]) {
        setData(prev => ({
          ...prev,
          admins: prev.admins.map(a => a.id === tempId ? inserted[0] : a)
        }));
      }
    } catch (e) {}

    return { success: true };
  };

  const updateAdmin = async (id: string, updated: Partial<AdminUser>): Promise<{ success: boolean; message?: string }> => {
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

    try {
      await supabase.from('admins').update(updated).eq('id', id);
    } catch (e) {}

    return { success: true };
  };

  const deleteAdmin = async (id: string): Promise<{ success: boolean; message?: string }> => {
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

    try {
      await supabase.from('admins').delete().eq('id', id);
    } catch (e) {}

    return { success: true };
  };

  // Product Operations
  const addProduct = async (newProd: Omit<Product, 'id'>) => {
    const newId = data.products.length > 0 ? Math.max(...data.products.map(p => Number(p.id) || 0)) + 1 : 1;
    const productToInsert = { ...newProd, id: newId, inStock: newProd.inStock !== false };
    
    // Update local UI instantly
    setData(prev => ({
      ...prev,
      products: [productToInsert, ...prev.products]
    }));

    // Push to Supabase (mapped to Lovable schema)
    try {
      const catMatch = data.categories.find(c => c.name === newProd.category);
      const supaPayload = {
        name: newProd.name,
        price: newProd.price,
        description: newProd.description || '',
        category_id: catMatch?.id || null,
        images: [newProd.image],
        featured: newProd.featured,
        stock: newProd.inStock ? 10 : 0,
        is_published: true,
        slug: newProd.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now()
      };
      
      const { data: inserted, error } = await supabase.from('products').insert([supaPayload]).select();
      
      if (error) {
        console.error('Supabase Insert Error:', error.message);
      } else if (inserted && inserted[0]) {
        // Update local ID to actual UUID from Supabase
        setData(prev => ({
          ...prev,
          products: prev.products.map(p => p.id === newId ? { ...p, id: inserted[0].id } : p)
        }));
      }
    } catch (e) {
      console.error('Failed to sync new product to Supabase:', e);
    }
  };

  const updateProduct = async (id: number | string, updated: Partial<Product>) => {
    // Update local UI instantly
    setData(prev => ({
      ...prev,
      products: prev.products.map(p => (p.id === id ? { ...p, ...updated } : p))
    }));

    // Push to Supabase
    try {
      let catMatchId = undefined;
      if (updated.category) {
        catMatchId = data.categories.find(c => c.name === updated.category)?.id;
      }
      
      const supaPayload: any = {};
      if (updated.name !== undefined) supaPayload.name = updated.name;
      if (updated.price !== undefined) supaPayload.price = updated.price;
      if (updated.description !== undefined) supaPayload.description = updated.description;
      if (updated.featured !== undefined) supaPayload.featured = updated.featured;
      if (updated.image !== undefined) supaPayload.images = [updated.image];
      if (catMatchId !== undefined) supaPayload.category_id = catMatchId;
      if (updated.inStock !== undefined) supaPayload.stock = updated.inStock ? 10 : 0;

      const { error } = await supabase.from('products').update(supaPayload).eq('id', id);
      if (error) {
        console.error('Supabase Update Error:', error.message);
      }
    } catch (e) {
      console.error('Failed to update product in Supabase:', e);
    }
  };

  const deleteProduct = async (id: number | string) => {
    // Update local UI instantly
    setData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));

    // Push to Supabase
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) {
        console.error('Supabase Delete Error:', error.message);
      }
    } catch (e) {
      console.error('Failed to delete product from Supabase:', e);
    }
  };

  const toggleProductStock = async (id: number | string) => {
    const product = data.products.find(p => p.id === id);
    if (!product) return;
    const newInStock = !product.inStock;

    setData(prev => ({
      ...prev,
      products: prev.products.map(p => (p.id === id ? { ...p, inStock: newInStock } : p))
    }));

    try {
      const { error } = await supabase.from('products').update({ stock: newInStock ? 10 : 0 }).eq('id', id);
    } catch (e) {}
  };

  const toggleProductFeatured = async (id: number | string) => {
    const product = data.products.find(p => p.id === id);
    if (!product) return;
    const newFeatured = !product.featured;

    setData(prev => ({
      ...prev,
      products: prev.products.map(p => (p.id === id ? { ...p, featured: newFeatured } : p))
    }));

    try {
      const { error } = await supabase.from('products').update({ featured: newFeatured }).eq('id', id);
    } catch (e) {}
  };

  // Category Operations
  const addCategory = async (newCat: Omit<Category, 'id'>) => {
    const newId = data.categories.length > 0 ? Math.max(...data.categories.map(c => Number(c.id) || 0)) + 1 : 1;
    const catToInsert = { ...newCat, id: newId };
    
    setData(prev => ({
      ...prev,
      categories: [...prev.categories, catToInsert]
    }));

    try {
      const supaPayload = {
        name: newCat.name,
        image_url: newCat.image,
        slug: newCat.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now()
      };
      const { data: inserted, error } = await supabase.from('categories').insert([supaPayload]).select();
      if (error) {
        console.error('Supabase Cat Error:', error.message);
      } else if (inserted && inserted[0]) {
        setData(prev => ({
          ...prev,
          categories: prev.categories.map(c => c.id === newId ? { ...c, id: inserted[0].id } : c)
        }));
      }
    } catch (e) {
      console.error('Failed to sync new category to Supabase:', e);
    }
  };

  const updateCategory = async (id: number | string, updated: Partial<Category>) => {
    setData(prev => ({
      ...prev,
      categories: prev.categories.map(c => (c.id === id ? { ...c, ...updated } : c))
    }));

    try {
      const supaPayload: any = {};
      if (updated.name !== undefined) supaPayload.name = updated.name;
      if (updated.image !== undefined) supaPayload.image_url = updated.image;
      
      const { error } = await supabase.from('categories').update(supaPayload).eq('id', id);
      if (error) console.error('Category update failed:', error.message);
    } catch (e) {
      console.error('Failed to update category in Supabase:', e);
    }
  };

  const deleteCategory = async (id: number | string) => {
    setData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c.id !== id)
    }));

    try {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) console.error('Category delete failed:', error.message);
    } catch (e) {
      console.error('Failed to delete category from Supabase:', e);
    }
  };

  // Content Operations
  const updateHero = async (hero: Partial<HeroContent>) => {
    const newHero = { ...data.hero, ...hero };
    setData(prev => ({
      ...prev,
      hero: newHero
    }));
    try {
      await supabase.from('site_content').upsert({ key: 'hero', content: newHero });
    } catch (e) {}
  };

  const updatePromos = async (promos: Partial<PromoBanners>) => {
    const newPromos = {
      ...data.promos,
      ...promos,
      banner1: { ...(data.promos?.banner1 || {}), ...(promos.banner1 || {}) },
      banner2: { ...(data.promos?.banner2 || {}), ...(promos.banner2 || {}) }
    };
    setData(prev => ({
      ...prev,
      promos: newPromos as any
    }));
    try {
      await supabase.from('site_content').upsert({ key: 'promos', content: newPromos });
    } catch (e) {}
  };

  const updateOurStory = async (story: Partial<OurStoryContent>) => {
    const newStory = { ...data.ourStory, ...story };
    setData(prev => ({
      ...prev,
      ourStory: newStory
    }));
    try {
      await supabase.from('site_content').upsert({ key: 'ourStory', content: newStory });
    } catch (e) {}
  };

  const updateContact = async (contact: Partial<ContactContent>) => {
    const newContact = { ...data.contact, ...contact };
    setData(prev => ({
      ...prev,
      contact: newContact
    }));
    try {
      await supabase.from('site_content').upsert({ key: 'contact', content: newContact });
    } catch (e) {}
  };

  // FAQ Operations
  const addFAQ = async (newFaq: Omit<FAQItem, 'id'>) => {
    const tempId = String(Date.now());
    setData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { ...newFaq, id: tempId }]
    }));
    try {
      const { data: inserted, error } = await supabase.from('faqs').insert([newFaq]).select();
      if (!error && inserted && inserted[0]) {
        setData(prev => ({
          ...prev,
          faqs: prev.faqs.map(f => f.id === tempId ? inserted[0] : f)
        }));
      }
    } catch (e) {}
  };

  const updateFAQ = async (id: string, updated: Partial<FAQItem>) => {
    setData(prev => ({
      ...prev,
      faqs: prev.faqs.map(f => (f.id === id ? { ...f, ...updated } : f))
    }));
    try {
      await supabase.from('faqs').update(updated).eq('id', id);
    } catch (e) {}
  };

  const deleteFAQ = async (id: string) => {
    setData(prev => ({
      ...prev,
      faqs: prev.faqs.filter(f => f.id !== id)
    }));
    try {
      await supabase.from('faqs').delete().eq('id', id);
    } catch (e) {}
  };

  // Testimonial Operations
  const addTestimonial = async (newTestimonial: Omit<Testimonial, 'id'>) => {
    const tempId = Date.now();
    setData(prev => ({
      ...prev,
      testimonials: [{ ...newTestimonial, id: tempId }, ...prev.testimonials]
    }));
    try {
      const { data: inserted, error } = await supabase.from('testimonials').insert([newTestimonial]).select();
      if (!error && inserted && inserted[0]) {
        setData(prev => ({
          ...prev,
          testimonials: prev.testimonials.map(t => t.id === tempId ? inserted[0] : t)
        }));
      }
    } catch (e) {}
  };

  const updateTestimonial = async (id: number | string, updated: Partial<Testimonial>) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => (t.id === id ? { ...t, ...updated } : t))
    }));
    try {
      await supabase.from('testimonials').update(updated).eq('id', id);
    } catch (e) {}
  };

  const deleteTestimonial = async (id: number | string) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter(t => t.id !== id)
    }));
    try {
      await supabase.from('testimonials').delete().eq('id', id);
    } catch (e) {}
  };

  // Settings
  const updateSettings = async (settings: Partial<SiteSettings>) => {
    const newSettings = { ...data.settings!, ...settings };
    setData(prev => ({
      ...prev,
      settings: newSettings
    }));
    try {
      await supabase.from('site_content').upsert({ key: 'settings', content: newSettings });
    } catch (e) {}
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
