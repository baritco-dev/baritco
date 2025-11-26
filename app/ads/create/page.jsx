'use client';

import { useState } from 'react';
import SkeletonLoader from '../../../components/SkeletonLoader';
import { validateForm } from '../../../lib/utils/validators';

export default function CreateAd() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
    contact: '',
  });
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      setStep(step + 1);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/ads', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        alert('آگهی با موفقیت ثبت شد!');
        setFormData({ title: '', description: '', category: '', image: '', contact: '' });
        setStep(1);
      } else {
        setErrors({ submit: 'خطا در ارسال آگهی' });
      }
    } catch (error) {
      console.error('Error submitting ad:', error);
      setErrors({ submit: 'خطا در ارسال آگهی' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">ثبت آگهی جدید</h1>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="عنوان آگهی"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
              </div>
              <div>
                <textarea
                  placeholder="توضیحات آگهی"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
              </div>
              <button onClick={handleNext} className="bg-primary text-white px-4 py-2 rounded-lg">
                بعدی
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">انتخاب دسته‌بندی</option>
                  <option value="mineral">مواد معدنی</option>
                  <option value="equipment">تجهیزات</option>
                  <option value="metal">فلزات</option>
                </select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="لینک تصویر"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
                {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="اطلاعات تماس"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
                {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
              </div>
              <div className="flex gap-4">
                <button onClick={handlePrev} className="border border-primary px-4 py-2 rounded-lg">
                  قبلی
                </button>
                <button onClick={handleSubmit} className="bg-primary text-white px-4 py-2 rounded-lg">
                  ارسال
                </button>
              </div>
            </div>
          )}
          {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}
        </>
      )}
    </div>
  );
}