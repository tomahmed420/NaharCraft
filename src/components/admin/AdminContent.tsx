import React, { useState } from 'react';
import { FileText, Save } from 'lucide-react';
import { INITIAL_CONTENT } from '../../constants';

const AdminContent = () => {
  const [content, setContent] = useState(INITIAL_CONTENT);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Site Content</h1>
          <p className="text-gray-500 mt-1">Customize your website text and images</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-opacity-90 transition-all">
          <Save size={20} />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Hero Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FileText className="text-primary" size={20} />
            Hero Section
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input 
                type="text" 
                value={content.hero.title}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <textarea 
                rows={3}
                value={content.hero.subtitle}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
              <input 
                type="text" 
                value={content.hero.buttonText}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, buttonText: e.target.value } })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FileText className="text-primary" size={20} />
            Our Story Section
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input 
                type="text" 
                value={content.ourStory.title}
                onChange={(e) => setContent({ ...content, ourStory: { ...content.ourStory, title: e.target.value } })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                rows={5}
                value={content.ourStory.description}
                onChange={(e) => setContent({ ...content, ourStory: { ...content.ourStory, description: e.target.value } })}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContent;
