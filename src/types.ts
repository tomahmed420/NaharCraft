export interface HeroContent {
  title: string;
  subtitle: string;
  buttonText: string;
  images: string[];
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  featured: boolean;
  description?: string;
  stock?: number;
}

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
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

export interface SiteContent {
  hero: HeroContent;
  ourStory: {
    title: string;
    description: string;
    image: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    whatsapp: string;
  };
}
