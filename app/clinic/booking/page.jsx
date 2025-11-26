'use client';

import { useState } from 'react';
import { validateForm } from '../../../../lib/utils/validators';

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialist: '',
    date: '',
    time: '',
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        alert('رزرو با موفقیت ثبت شد!');
        setFormData({ name: '', email: '', specialist: '', date: '', time: '' });
      }
    } catch (error) {
      setErrors({ submit: 'خطا در ثبت رزرو' });
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">رزرو مشاوره</h1>
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
          <select
            value={formData.specialist}
            onChange={(e) => setFormData({ ...formData, specialist: e.target.value })}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">انتخاب متخصص</option>
            <option value="DrMiningExpert">دکتر علی معدنی</option>
            <option value="GeologyConsultant">مهندس رضا زمین‌شناس</option>
          </select>
          {errors.specialist && <p className="text-red-500 text-sm">{errors.specialist}</p>}
        </div>
        <div>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-2 border rounded-lg"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>
        <div>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="w-full p-2 border rounded-lg"
          />
          {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
        </div>
        {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}
        <button
          onClick={handleSubmit}
          className="bg-primary text-white px-4 py-2 rounded-lg w-full"
        >
          ثبت رزرو
        </button>
      </div>
    </div>
  );
}