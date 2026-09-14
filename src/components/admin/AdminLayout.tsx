import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Grid, 
  Image as ImageIcon, 
  FileText, 
  LogOut 
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'ড্যাশবোর্ড', path: '/admin' },
    { icon: Package, label: 'পণ্যসমূহ', path: '/admin/products' },
    { icon: ShoppingCart, label: 'অর্ডারসমূহ', path: '/admin/orders' },
    { icon: Grid, label: 'ক্যাটাগরি', path: '/admin/categories' },
    { icon: ImageIcon, label: 'ব্যানার', path: '/admin/banners' },
    { icon: FileText, label: 'সাইট কন্টেন্ট', path: '/admin/content' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-serif font-bold text-primary">NaharCraft</h2>
          <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">অ্যাডমিন প্যানেল</p>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                location.pathname === item.path 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-gray-500 hover:bg-gray-100"
              )}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all">
            <LogOut size={20} />
            <span className="font-medium">লগআউট</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-10 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
