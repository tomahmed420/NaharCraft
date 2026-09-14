import { Order } from '../types';

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
