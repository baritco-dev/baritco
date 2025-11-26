'use client';

import { useState } from 'react';
import { validateForm } from '../../lib/utils/validators';
import SkeletonLoader from '../../components/SkeletonLoader';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // پاک کردن خطای فیلد هنگام تغییر
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setSuccessMessage('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        setSuccessMessage('پیام شما با موفقیت ارسال شد!');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      } else {
        setErrors({ submit: 'خطا در ارسال پیام' });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setErrors({ submit: 'خطا در ارسال پیام' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">تماس با ما</h1>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <div className="space-y-4 max-w-md mx-auto">
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
          <div>
            <input
              type="text"
              name="name"
              placeholder="نام"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="ایمیل"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <input
              type="text"
              name="subject"
              placeholder="موضوع"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
            {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
          </div>
          <div>
            <textarea
              name="message"
              placeholder="پیام شما"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              rows="5"
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>
          <button
            onClick={handleSubmit}
            className="bg-primary text-white px-4 py-2 rounded-lg w-full"
          >
            ارسال پیام
          </button>
          {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}
        </div>
      )}
    </div>
  );
}