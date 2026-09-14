import React from 'react';
import { ShoppingCart, Eye, Edit2 } from 'lucide-react';
import { MOCK_ORDERS } from '../../constants';
import { cn } from '../../lib/utils';

const AdminOrders = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-gray-500 mt-1">{MOCK_ORDERS.length} orders total</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4 font-medium">Order ID</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {MOCK_ORDERS.map(order => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-mono text-sm">{order.id}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium">{order.customer}</span>
                    <span className="text-xs text-gray-500">{order.phone}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-bold">৳{order.amount}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold uppercase",
                    order.status === 'delivered' ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                  )}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">{order.date}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><Eye size={18} /></button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><Edit2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
