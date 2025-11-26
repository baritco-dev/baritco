'use client';

import { useState } from 'react';
import { validateForm } from '../../../lib/utils/validators';
import SkeletonLoader from '../../../components/SkeletonLoader';

export default function BecomeSellerPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    description: '',
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
      const response = await fetch('/api/sellers', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        alert('درخواست فروشندگی با موفقیت ثبت شد!');
        setFormData({ name: '', email: '', company: '', description: '' });
        setStep(1);
      } else {
        setErrors({ submit: 'خطا در ارسال درخواست' });
      }
    } catch (error) {
      setErrors({ submit: 'خطا در ارسال درخواست' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">فروشنده شو</h1>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          {step === 1 && (
            <div className="space-y-4 max-w-md mx-auto">
              <div>
                <input
                  type="text"
                  placeholder="نام"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="ایمیل"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <button onClick={handleNext} className="bg-primary text-white px-4 py-2 rounded-lg w-full">
                بعدی
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4 max-w-md mx-auto">
              <div>
                <input
                  type="text"
                  placeholder="نام شرکت"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
                {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
              </div>
              <div>
                <textarea
                  placeholder="توضیحات شرکت"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
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