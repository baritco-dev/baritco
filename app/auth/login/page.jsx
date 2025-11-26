'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../lib/redux/slices/authSlice';
import { validateForm } from '../../../lib/utils/validators';
import SkeletonLoader from '../../../components/SkeletonLoader';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(login({ email: formData.email, password: formData.password })).unwrap();
      alert('ورود با موفقیت انجام شد!');
      setFormData({ email: '', password: '' });
      setErrors({});
    } catch (error) {
      setErrors({ submit: 'خطا در ورود. لطفاً ایمیل و رمز عبور را بررسی کنید.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">ورود</h1>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <div className="space-y-4 max-w-md mx-auto">
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
            ورود
          </button>
        </div>
      )}
    </div>
  );
}