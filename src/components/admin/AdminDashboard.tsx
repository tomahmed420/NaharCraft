import React from 'react';
import { 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  FileText 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { cn } from '../../lib/utils';
import { MOCK_ORDERS } from '../../data/mock-orders';

const data = [
  { name: 'সোম', sales: 400 },
  { name: 'মঙ্গল', sales: 300 },
  { name: 'বুধ', sales: 200 },
  { name: 'বৃহস্পতি', sales: 278 },
  { name: 'শুক্র', sales: 189 },
  { name: 'শবি', sales: 239 },
  { name: 'রবি', sales: 349 },
];

const AdminDashboard = () => {
  const stats = [
    { label: 'মোট পণ্য', value: '৮', icon: Package, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'মোট অর্ডার', value: '১', icon: ShoppingCart, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'মোট আয়', value: '৳২৪০', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'পেন্ডিং', value: '০', icon: FileText, color: 'text-red-500', bg: 'bg-red-50' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">ড্যাশবোর্ড</h1>
        <div className="text-sm text-gray-500">{new Date().toLocaleDateString('bn-BD')}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={cn("p-4 rounded-xl", stat.bg)}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6">বিক্রয়ের সারাংশ</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="sales" fill="#E67E22" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6">আয়ের ধারা</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#E67E22" strokeWidth={2} dot={{ fill: '#E67E22' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold">সাম্প্রতিক অর্ডারসমূহ</h2>
          <button className="text-primary text-sm font-medium hover:underline">সব দেখুন</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4 font-medium">কাস্টমার</th>
              <th className="px-6 py-4 font-medium">ফোন</th>
              <th className="px-6 py-4 font-medium">পরিমাণ</th>
              <th className="px-6 py-4 font-medium">অবস্থা</th>
              <th className="px-6 py-4 font-medium">তারিখ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {MOCK_ORDERS.map(order => (
              <tr key={order.id}>
                <td className="px-6 py-4 font-medium">{order.customer}</td>
                <td className="px-6 py-4 text-gray-500">{order.phone}</td>
                <td className="px-6 py-4 font-bold">৳{order.amount}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold uppercase",
                    order.status === 'delivered' ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                  )}>
                    {order.status === 'delivered' ? 'ডেলিভার করা হয়েছে' : 'পেন্ডিং'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
