import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  FolderTree, 
  Image as ImageIcon, 
  FileText, 
  HelpCircle, 
  ShoppingBag, 
  Settings, 
  ExternalLink, 
  Menu, 
  X, 
  Sparkles,
  ArrowLeft,
  Users,
  LogOut,
  Crown,
  User
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useData } from '../../context/DataContext';
import AdminLogin from '../../components/admin/AdminLogin';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { products, categories, currentAdmin, logoutAdmin, admins } = useData();

  // If not logged in, enforce Admin Login protection screen
  if (!currentAdmin) {
    return <AdminLogin />;
  }

  const isMaster = currentAdmin.role === 'master';

  const navItems = [
    { name: 'ড্যাশবোর্ড', path: '/admin', icon: LayoutDashboard },
    { name: 'পণ্যসমূহ', path: '/admin/products', icon: Package, badge: products.length },
    { name: 'ক্যাটাগরি', path: '/admin/categories', icon: FolderTree, badge: categories.length },
    { name: 'ব্যানার ও অফার', path: '/admin/banners', icon: ImageIcon },
    { name: 'কন্টেন্ট ও হোয়াটসঅ্যাপ', path: '/admin/content', icon: FileText },
    { name: 'এফএকিউ ও রিভিউ', path: '/admin/faq-reviews', icon: HelpCircle },
    { name: 'অর্ডার তালিকা', path: '/admin/orders', icon: ShoppingBag },
    { name: 'অ্যাডমিন টিম ও সিকিউরিটি', path: '/admin/admins', icon: Users, badge: admins.length },
    { name: 'ব্যাকআপ ও সেটিংস', path: '/admin/settings', icon: Settings }
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row pb-16 md:pb-0">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white shrink-0 border-r border-slate-800">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-primary font-bold block">NaharCraft</span>
            <h1 className="text-lg font-serif font-bold text-white flex items-center gap-2">
              <span>অ্যাডমিন প্যানেল</span>
              <span className="bg-primary/30 text-amber-300 text-[10px] px-1.5 py-0.5 rounded font-mono font-medium">লাইভ</span>
            </h1>
          </div>
        </div>

        <div className="px-3 py-4">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-all border border-slate-700/60 shadow-xs"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={14} className="text-primary" />
              <span>লাইভ ওয়েবসাইট দেখুন</span>
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full font-semibold">
              একটিভ
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all group",
                  active
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/70"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={active ? "text-white" : "text-slate-400 group-hover:text-primary transition-colors"} />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={cn(
                    "text-[11px] px-2 py-0.5 rounded-full font-bold",
                    active ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400 group-hover:bg-slate-700"
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logged in Admin Profile Card */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40">
          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                isMaster ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
              }`}>
                {isMaster ? <Crown size={14} /> : <User size={14} />}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{currentAdmin.name}</p>
                <p className="text-[10px] text-amber-300 font-medium truncate">
                  {isMaster ? '★ মাস্টার অ্যাডমিন' : 'সহকারী অ্যাডমিন'}
                </p>
              </div>
            </div>

            <button
              onClick={logoutAdmin}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-700/50 transition-colors cursor-pointer shrink-0"
              title="লগআউট করুন"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>v2.1 • সেন্ট্রাল JSON ডাটাবেজ</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden bg-slate-900 text-white p-3.5 flex items-center justify-between sticky top-0 z-40 border-b border-slate-800 shadow-md">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            aria-label="মেনু খুলুন"
          >
            <Menu size={20} />
          </button>
          <div>
            <h1 className="text-sm font-serif font-bold text-white flex items-center gap-1.5">
              <span>NaharCraft</span>
              <span className="text-[10px] bg-primary/30 text-amber-300 px-1 rounded">
                {isMaster ? 'মাস্টার' : 'অ্যাডমিন'}
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 border border-slate-700"
          >
            <span>সাইট</span>
            <ExternalLink size={12} />
          </Link>
          <button
            onClick={logoutAdmin}
            className="text-xs bg-red-900/30 hover:bg-red-900/50 text-red-300 px-2.5 py-1.5 rounded-lg flex items-center gap-1 border border-red-800/40 cursor-pointer"
            title="লগআউট"
          >
            <LogOut size={13} />
            <span>লগআউট</span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="fixed left-0 top-0 bottom-0 w-72 bg-slate-900 text-white z-10 flex flex-col p-4 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-3">
              <h2 className="font-serif font-bold text-base">মেনু ও সেটিংস</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                      active
                        ? "bg-primary text-white"
                        : "text-slate-300 hover:bg-slate-800"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logoutAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-900/30 border border-red-800/50 text-xs font-semibold text-red-300 hover:bg-red-900/50 transition-colors"
              >
                <LogOut size={14} />
                <span>লগআউট করুন</span>
              </button>

              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-200"
              >
                <ArrowLeft size={14} />
                <span>গ্রাহক ওয়েবসাইটে যান</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
        {children}
      </main>

      {/* Mobile Bottom Navigation Bar for quick thumb navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1.5 flex items-center justify-around z-40 shadow-lg">
        <Link
          to="/admin"
          className={cn(
            "flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-medium transition-all",
            isActive('/admin') && location.pathname === '/admin' ? "text-primary font-bold" : "text-gray-500"
          )}
        >
          <LayoutDashboard size={18} />
          <span>ড্যাশবোর্ড</span>
        </Link>

        <Link
          to="/admin/products"
          className={cn(
            "flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-medium transition-all",
            isActive('/admin/products') ? "text-primary font-bold" : "text-gray-500"
          )}
        >
          <Package size={18} />
          <span>পণ্য</span>
        </Link>

        <Link
          to="/admin/orders"
          className={cn(
            "flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-medium transition-all",
            isActive('/admin/orders') ? "text-primary font-bold" : "text-gray-500"
          )}
        >
          <ShoppingBag size={18} />
          <span>অর্ডার</span>
        </Link>

        <Link
          to="/admin/admins"
          className={cn(
            "flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-medium transition-all",
            isActive('/admin/admins') ? "text-primary font-bold" : "text-gray-500"
          )}
        >
          <Users size={18} />
          <span>টিম</span>
        </Link>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-medium text-gray-500"
        >
          <Menu size={18} />
          <span>অন্যান্য</span>
        </button>
      </nav>
    </div>
  );
};

export default AdminLayout;
