export interface HeroContent {
  title: string;
  subtitle: string;
  buttonText: string;
  images: string[];
}

export interface PromoBanners {
  banner1: {
    tag: string;
    title: string;
    subtitle: string;
    couponCode: string;
    buttonText: string;
    link: string;
  };
  banner2: {
    tag: string;
    title: string;
    subtitle: string;
    minAmountText: string;
    buttonText: string;
    link: string;
  };
}

export interface Category {
  id: number;
  name: string;
  image: string;
  description?: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  featured: boolean;
  inStock?: boolean;
  description?: string;
  stock?: number;
}

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  role?: string;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface Order {
  id: string;
  customer: string;
  phone: string;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  items: { productId: number; quantity: number; price: number }[];
}

export interface OurStoryContent {
  title: string;
  description: string;
  image: string;
  badge?: string;
}

export interface ContactContent {
  email: string;
  phone: string;
  address: string;
  whatsapp: string;
  businessHours?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  username: string; // or email
  password: string;
  role: 'master' | 'admin'; // master can manage other admins, admin cannot
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
}

export interface SiteSettings {
  storeName: string;
  insideDhakaDelivery: number;
  outsideDhakaDelivery: number;
  freeDeliveryThreshold: number;
  cloudinaryCloudName?: string;
  cloudinaryUploadPreset?: string;
}

export interface SiteContent {
  hero: HeroContent;
  promos?: PromoBanners;
  ourStory: OurStoryContent;
  contact: ContactContent;
  settings?: SiteSettings;
}
