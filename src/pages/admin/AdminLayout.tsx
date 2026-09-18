import React from 'react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow px-6 py-4">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel (Placeholder)</h1>
      </header>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
