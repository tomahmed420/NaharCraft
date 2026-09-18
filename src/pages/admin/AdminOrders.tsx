import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle,
  ExternalLink,
  Eye
} from 'lucide-react';
import { MOCK_ORDERS } from '../../data/mock-orders';
import { Order } from '../../types';

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const updateStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
                          o.customer.toLowerCase().includes(search.toLowerCase()) ||
                          o.phone.includes(search);
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 rounded-full font-semibold">অপেক্ষমান</span>;
      case 'processing':
        return <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-semibold">প্রক্রিয়াধীন</span>;
      case 'shipped':
        return <span className="bg-purple-100 text-purple-800 text-xs px-2.5 py-0.5 rounded-full font-semibold">কুরিয়ারে আছে</span>;
      case 'delivered':
        return <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-semibold">ডেলিভার্ড</span>;
      case 'cancelled':
        return <span className="bg-rose-100 text-rose-800 text-xs px-2.5 py-0.5 rounded-full font-semibold">বাতিল</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
          <span>অর্ডার তালিকা ও ট্র্যাকিং</span>
          <span className="text-xs font-sans font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {orders.length} টি
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          হোয়াটসঅ্যাপে আসা কাস্টমারদের অর্ডার হিস্ট্রি ও স্ট্যাটাস পর্যবেক্ষণ করুন
        </p>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="অর্ডার আইডি, গ্রাহকের নাম বা মোবাইল..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-lg bg-white"
        >
          <option value="all">সকল স্ট্যাটাস</option>
          <option value="pending">অপেক্ষমান</option>
          <option value="processing">প্রক্রিয়াধীন</option>
          <option value="shipped">কুরিয়ারে আছে</option>
          <option value="delivered">ডেলিভার্ড</option>
          <option value="cancelled">বাতিল</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-[10px] tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">অর্ডার আইডি</th>
                <th className="py-3 px-4">গ্রাহক ও মোবাইল</th>
                <th className="py-3 px-4">তারিখ</th>
                <th className="py-3 px-4">মোট টাকা</th>
                <th className="py-3 px-4">স্ট্যাটাস</th>
                <th className="py-3 px-4 text-right">হোয়াটসঅ্যাপ চ্যাট</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/70">
                  <td className="py-3 px-4 font-mono font-bold text-gray-900">{order.id}</td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-gray-900">{order.customer}</p>
                    <p className="text-xs text-gray-500 font-mono">{order.phone}</p>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{order.date}</td>
                  <td className="py-3 px-4 font-bold text-primary">৳{order.amount}</td>
                  <td className="py-3 px-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value as any)}
                      className="text-xs font-semibold rounded-lg border border-gray-200 px-2 py-1 bg-white"
                    >
                      <option value="pending">অপেক্ষমান</option>
                      <option value="processing">প্রক্রিয়াধীন</option>
                      <option value="shipped">কুরিয়ারে আছে</option>
                      <option value="delivered">ডেলিভার্ড</option>
                      <option value="cancelled">বাতিল</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <a
                      href={`https://wa.me/88${order.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`হ্যালো ${order.customer}! NaharCraft থেকে আপনার অর্ডার #${order.id} সম্পর্কিত আপডেট:`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg font-bold"
                    >
                      <MessageCircle size={14} />
                      <span>মেসেজ দিন</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
