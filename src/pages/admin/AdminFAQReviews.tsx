import React, { useState } from 'react';
import { 
  HelpCircle, 
  MessageSquare, 
  Plus, 
  Edit3, 
  Trash2, 
  Star, 
  X, 
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { FAQItem, Testimonial } from '../../types';

const AdminFAQReviews: React.FC = () => {
  const { 
    faqs, 
    testimonials, 
    addFAQ, 
    updateFAQ, 
    deleteFAQ, 
    addTestimonial, 
    updateTestimonial, 
    deleteTestimonial 
  } = useData();

  const [activeTab, setActiveTab] = useState<'faq' | 'reviews'>('faq');

  // FAQ Modal
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [faqForm, setFaqForm] = useState({ question: '', answer: '', category: 'general' });

  // Testimonial Modal
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Testimonial | null>(null);
  const [reviewForm, setReviewForm] = useState({ name: '', text: '', rating: 5, role: '' });

  // Delete Modals
  const [deleteConfirmFaqId, setDeleteConfirmFaqId] = useState<string | null>(null);
  const [deleteConfirmReviewId, setDeleteConfirmReviewId] = useState<number | null>(null);

  // FAQ Handlers
  const openAddFaq = () => {
    setEditingFaq(null);
    setFaqForm({ question: '', answer: '', category: 'order' });
    setIsFaqModalOpen(true);
  };

  const openEditFaq = (f: FAQItem) => {
    setEditingFaq(f);
    setFaqForm({ question: f.question, answer: f.answer, category: f.category });
    setIsFaqModalOpen(true);
  };

  const handleFaqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.question.trim() || !faqForm.answer.trim()) return;

    if (editingFaq) {
      updateFAQ(editingFaq.id, faqForm);
    } else {
      addFAQ(faqForm);
    }
    setIsFaqModalOpen(false);
  };

  // Review Handlers
  const openAddReview = () => {
    setEditingReview(null);
    setReviewForm({ name: '', text: '', rating: 5, role: 'ভেরিফায়েড ক্রেতা' });
    setIsReviewModalOpen(true);
  };

  const openEditReview = (t: Testimonial) => {
    setEditingReview(t);
    setReviewForm({ name: t.name, text: t.text, rating: t.rating, role: t.role || '' });
    setIsReviewModalOpen(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.text.trim()) return;

    if (editingReview) {
      updateTestimonial(editingReview.id, reviewForm);
    } else {
      addTestimonial(reviewForm);
    }
    setIsReviewModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 flex items-center gap-2">
            <span>এফএকিউ ও কাস্টমার রিভিউ</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            ওয়েবসাইটের সাধারণ প্রশ্ন-উত্তর এবং গ্রাহকদের প্রশংসামূলক রিভিউ পরিচালনা করুন
          </p>
        </div>

        {activeTab === 'faq' ? (
          <button
            onClick={openAddFaq}
            className="bg-primary hover:bg-primary/90 text-white font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md shrink-0"
          >
            <Plus size={18} />
            <span>নতুন প্রশ্ন-উত্তর যোগ করুন</span>
          </button>
        ) : (
          <button
            onClick={openAddReview}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md shrink-0"
          >
            <Plus size={18} />
            <span>নতুন রিভিউ যোগ করুন</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('faq')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'faq'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <HelpCircle size={16} />
          <span>সাধারণ প্রশ্ন-উত্তর ({faqs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'reviews'
              ? 'border-amber-600 text-amber-700'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <MessageSquare size={16} />
          <span>কাস্টমার রিভিউ ({testimonials.length})</span>
        </button>
      </div>

      {/* Tab 1: FAQs */}
      {activeTab === 'faq' && (
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200/80 shadow-xs flex items-start justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    প্রশ্ন #{index + 1}
                  </span>
                  <span className="text-xs text-gray-400">• ক্যাটাগরি: {faq.category}</span>
                </div>
                <h4 className="font-serif font-bold text-gray-900 text-sm sm:text-base mb-1">
                  {faq.question}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => openEditFaq(faq)}
                  className="p-1.5 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-100"
                  title="এডিট"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => setDeleteConfirmFaqId(faq.id)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50"
                  title="ডিলিট"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Reviews */}
      {activeTab === 'reviews' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((review) => (
            <div
              key={review.id}
              className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditReview(review)}
                      className="p-1 rounded text-gray-400 hover:text-primary"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmReviewId(review.id)}
                      className="p-1 rounded text-gray-400 hover:text-rose-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 italic mb-3">
                  "{review.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <h5 className="font-bold text-gray-900 text-xs">{review.name}</h5>
                {review.role && (
                  <span className="text-[10px] text-gray-400">{review.role}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FAQ Modal */}
      {isFaqModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsFaqModalOpen(false)} className="fixed inset-0 bg-black/60" />
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 z-10 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="font-serif font-bold text-base text-gray-900">
                {editingFaq ? 'প্রশ্ন-উত্তর এডিট করুন' : 'নতুন প্রশ্ন-উত্তর'}
              </h3>
              <button onClick={() => setIsFaqModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleFaqSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">প্রশ্ন *</label>
                <input
                  type="text"
                  required
                  value={faqForm.question}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  placeholder="যেমন: পণ্য ডেলিভারি পেতে কতদিন সময় লাগবে?"
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">উত্তর *</label>
                <textarea
                  rows={4}
                  required
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  placeholder="বিস্তারিত উত্তর লিখুন..."
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFaqModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-primary text-white rounded-xl"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsReviewModalOpen(false)} className="fixed inset-0 bg-black/60" />
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 z-10 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="font-serif font-bold text-base text-gray-900">
                {editingReview ? 'রিভিউ এডিট করুন' : 'নতুন রিভিউ'}
              </h3>
              <button onClick={() => setIsReviewModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">কাস্টমারের নাম *</label>
                <input
                  type="text"
                  required
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  placeholder="যেমন: আয়েশা খাতুন"
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">রেটিং</label>
                <select
                  value={reviewForm.rating}
                  onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (৫ স্টার)</option>
                  <option value={4}>⭐⭐⭐⭐ (৪ স্টার)</option>
                  <option value={3}>⭐⭐⭐ (৩ স্টার)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">মন্তব্য (Review) *</label>
                <textarea
                  rows={3}
                  required
                  value={reviewForm.text}
                  onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                  placeholder="কাস্টমারের রিভিউ লিখুন..."
                  className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-amber-600 text-white rounded-xl"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete FAQ Modal */}
      {deleteConfirmFaqId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setDeleteConfirmFaqId(null)} className="fixed inset-0 bg-black/60" />
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 z-10 text-center space-y-3">
            <h4 className="font-bold text-gray-900 text-sm">প্রশ্নটি ডিলিট করতে চান?</h4>
            <div className="flex gap-2 justify-center">
              <button onClick={() => setDeleteConfirmFaqId(null)} className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs">
                না
              </button>
              <button
                onClick={() => {
                  deleteFAQ(deleteConfirmFaqId);
                  setDeleteConfirmFaqId(null);
                }}
                className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold"
              >
                হ্যাঁ, মুছুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Review Modal */}
      {deleteConfirmReviewId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setDeleteConfirmReviewId(null)} className="fixed inset-0 bg-black/60" />
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 z-10 text-center space-y-3">
            <h4 className="font-bold text-gray-900 text-sm">রিভিউটি ডিলিট করতে চান?</h4>
            <div className="flex gap-2 justify-center">
              <button onClick={() => setDeleteConfirmReviewId(null)} className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs">
                না
              </button>
              <button
                onClick={() => {
                  deleteTestimonial(deleteConfirmReviewId);
                  setDeleteConfirmReviewId(null);
                }}
                className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold"
              >
                হ্যাঁ, মুছুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFAQReviews;
