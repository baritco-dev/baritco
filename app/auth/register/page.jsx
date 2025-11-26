'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../../lib/redux/slices/authSlice';
import { validateForm } from '../../../lib/utils/validators';
import SkeletonLoader from '../../../components/SkeletonLoader';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await dispatch(register(formData)).unwrap();
      alert('ثبت‌نام با موفقیت انجام شد!');
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      setErrors({ submit: 'خطا در ثبت‌نام. لطفاً اطلاعات را بررسی کنید.' });
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">ثبت‌نام</h1>
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
        <div>
          <input
            type="password"
            placeholder="رمز عبور"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-2 border rounded-lg"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}
        <button
          onClick={handleSubmit}
          className="bg-primary text-white px-4 py-2 rounded-lg w-full"
        >
          ثبت‌نام
        </button>
      </div>
      <SkeletonLoader />
    </div>
  );
}