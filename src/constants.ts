import { SiteContent, Category, Product, Testimonial, Order } from './types';

export const INITIAL_CONTENT: SiteContent = {
  hero: {
    title: "চমৎকার হস্তশিল্পিত সৃষ্টি",
    subtitle: "অনিন্দ্য ক্রুশবিদ্ধ ফুল, ডয়লি এবং ঘর সাজানোর সরঞ্জামসমূহ আবিষ্কার করুন — প্রতিটি পিস বাংলাদেশের দক্ষ কারিগরদের দ্বারা ভালোবাসায় হাতে তৈরি।",
    buttonText: "এখনই কিনুন",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1920&h=1080",
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=1920&h=1080",
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=1920&h=1080"
    ]
  },
  ourStory: {
    title: "নাহারক্রাফ্ট-এর পেছনের কারিগরের সাথে পরিচিত হন",
    description: "আমি কামরুন নাহার, এবং এখানে আপনি যা দেখছেন তার প্রতিটি পিস আবেগ এবং নিষ্ঠার সাথে হাতে তৈরি করা হয়েছে। সেরা সুতা নির্বাচন থেকে শুরু করে শেষ সেলাই পর্যন্ত, প্রতিটি সৃষ্টিতে আমার হৃদয়ের ছোঁয়া রয়েছে।",
    image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=800&h=800"
  },
  contact: {
    email: "hello@naharcraft.com",
    phone: "+880 1234 567890",
    address: "ঢাকা, বাংলাদেশ",
    whatsapp: "+8801234567890"
  }
};

export const CATEGORIES: Category[] = [
  { id: 1, name: "আনুষঙ্গিক সরঞ্জাম", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600&h=600" },
  { id: 2, name: "ক্রুশবিদ্ধ ফুল", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=600&h=600" },
  { id: 3, name: "ডয়লি", image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=600&h=600" },
  { id: 4, name: "ঘর সজ্জা", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600&h=600" }
];

export const PRODUCTS: Product[] = [
  { id: 1, name: "চাবির রিং (Key Ring)", category: "আনুষঙ্গিক সরঞ্জাম", price: 120, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600&h=800", featured: true, description: "সুন্দর হাতে তৈরি চাবির রিং।", stock: 50 },
  { id: 2, name: "সূর্যমুখী ফুলের সাজ", category: "ক্রুশবিদ্ধ ফুল", price: 1500, image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=600&h=800", featured: true, description: "একদম আসলের মতো ক্রুশবিদ্ধ সূর্যমুখী ফুল।", stock: 10 },
  { id: 3, name: "দৃষ্টিনন্দন টেবিল ডয়লি", category: "ডয়লি", price: 800, image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=600&h=800", featured: true, description: "ক্লাসিক সাদা টেবিল ডয়লি।", stock: 15 },
  { id: 4, name: "মিনি ফুলের ঝুড়ি", category: "আনুষঙ্গিক সরঞ্জাম", price: 950, image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600&h=800", featured: true, description: "ফুল সহ কিউট মিনি ঝুড়ি।", stock: 20 }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: "সারাহ এম.", text: "অসাধারণ কারুকার্য! ক্রুশবিদ্ধ ফুলগুলো দেখতে একদম আসলের মতো।", rating: 5 },
  { id: 2, name: "আয়েশা কে.", text: "নাহারক্রাফ্ট-এর পণ্যগুলো অত্যন্ত সুন্দর। এগুলোর গুণমান সত্যিই চমৎকার।", rating: 5 },
  { id: 3, name: "ফারহানা রহমান", text: "টেবিল ডয়লিটির ফিনিশিং ও সুতোর কোয়ালিটি অত্যন্ত নিখুঁত। ঘরের সৌন্দর্য অনেক বাড়িয়ে দিয়েছে।", rating: 5 },
  { id: 4, name: "তানিয়া ইসলাম", text: "প্যাকেজিং এবং ডেলিভারি খুব দ্রুত ও নিরাপদ ছিল। হাতে তৈরি চাবির রিংটি অসাধারণ!", rating: 5 },
  { id: 5, name: "এমা এল.", text: "কারুশিল্পী ভিত্তিক উদ্যোগকে সমর্থন করতে আমার খুব ভালো লাগে। সবার উপহারের জন্য সেরা পছন্দ!", rating: 5 }
];

export const MOCK_ORDERS: Order[] = [
  { 
    id: "ORD-001", 
    customer: "Tom Ahmed", 
    phone: "01712345678", 
    amount: 1620, 
    status: 'delivered', 
    date: '2026-04-07',
    items: [{ productId: 1, quantity: 1, price: 120 }, { productId: 2, quantity: 1, price: 1500 }]
  }
];
