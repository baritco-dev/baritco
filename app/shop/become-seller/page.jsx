'use client';

import { useState } from 'react';
import { validateForm } from '../../../lib/utils/validators';
import SkeletonBecomeSeller from '@/components/ui/SkeletonBecomeSeller';
import Breadcrumb from '@/components/Breadcrumb';
import Image from 'next/image';
import Link from 'next/link';

export default function BecomeSellerPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const currentFields = step === 1 
      ? ['name', 'email', 'phone']
      : ['company', 'description'];
    
    const validationErrors = validateForm(formData, currentFields);
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
      // اینجا بعداً به API واقعی وصل می‌کنیم
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('درخواست فروشندگی شما با موفقیت ثبت شد! به زودی با شما تماس می‌گیریم.');
      setFormData({ name: '', email: '', phone: '', company: '', website: '', description: '' });
      setStep(1);
    } catch (error) {
      setErrors({ submit: 'خطا در ارسال درخواست. لطفاً دوباره تلاش کنید.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <SkeletonBecomeSeller />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={['shop', 'فروشنده شو']} />
      </div>

      {/* بنر اصلی */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-800 opacity-90" />
        <div className="relative container mx-auto px-4 py-20 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            فروشنده باریتکو شوید
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-95">
            محصولات خود را به هزاران مشتری در سراسر ایران بفروشید
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">+50,000</div>
              <p className="text-lg">بازدید ماهانه</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">رایگان</div>
              <p className="text-lg">ثبت‌نام و فروش</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">24/7</div>
              <p className="text-lg">پشتیبانی</p>
            </div>
          </div>
        </div>
      </div>

      {/* فرم چندمرحله‌ای */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            <div className="mb-12">
              <div className="flex justify-between items-center mb-8">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`flex items-center ${s < 3 ? 'flex-1' : ''}`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition-all ${
                        step >= s ? 'bg-amber-500' : 'bg-gray-300'
                      }`}
                    >
                      {s}
                    </div>
                    {s < 3 && (
                      <div
                        className={`h-1 flex-1 mx-4 transition-all ${
                          step > s ? 'bg-amber-500' : 'bg-gray-300'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
              {step === 1 && 'اطلاعات تماس'}
              {step === 2 && 'اطلاعات شرکت'}
              {step === 3 && 'تأیید و ارسال'}
            </h2>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
              {step === 1 && (
                <>
                  <input
                    type="text"
                    placeholder="نام و نام خانوادگی*"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-6 py-4 border-2 rounded-2xl text-lg focus:outline-none focus:border-amber-500 transition ${
                      errors.name ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 -mt-4">نام الزامی است</p>}

                  <input
                    type="email"
                    placeholder="ایمیل*"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-6 py-4 border-2 rounded-2xl text-lg focus:outline-none focus:border-amber-500 transition ${
                      errors.email ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 -mt-4">ایمیل معتبر وارد کنید</p>}

                  <input
                    type="tel"
                    placeholder="شماره تماس* (مثلاً ۰۹۱۲۳۴۵۶۷۸۹)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-6 py-4 border-2 rounded-2xl text-lg focus:outline-none focus:border-amber-500 transition ${
                      errors.phone ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 -mt-4">شماره تماس معتبر نیست</p>}
                </>
              )}

              {step === 2 && (
                <>
                  <input
                    type="text"
                    placeholder="نام شرکت یا فروشگاه*"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={`w-full px-6 py-4 border-2 rounded-2xl text-lg focus:outline-none focus:border-amber-500 transition ${
                      errors.company ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />

                  <input
                    type="url"
                    placeholder="آدرس وبسایت (در صورت وجود)"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-6 py-4 border-2 rounded-2xl text-lg focus:outline-none focus:border-amber-500 transition border-gray-200"
                  />

                  <textarea
                    placeholder="توضیح مختصر درباره محصولات و فعالیت شما*"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={6}
                    className={`w-full px-6 py-4 border-2 rounded-2xl text-lg focus:outline-none focus:border-amber-500 transition resize-none ${
                      errors.description ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.description && <p className="text-red-500 -mt-4">توضیحات الزامی است</p>}
                </>
              )}

              {step === 3 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-8">Check</div>
                  <h3 className="text-3xl font-bold mb-6">تقریباً تموم شد!</h3>
                  <p className="text-xl text-gray-600 mb-10">
                    بعد از ارسال درخواست، تیم باریتکو ظرف ۲۴ ساعت با شما تماس می‌گیرد.
                  </p>
                  <div className="bg-gray-50 rounded-2xl p-8 mb-10 text-right">
                    <p><strong>نام:</strong> {formData.name}</p>
                    <p><strong>ایمیل:</strong> {formData.email}</p>
                    <p><strong>شماره تماس:</strong> {formData.phone}</p>
                    <p><strong>شرکت:</strong> {formData.company || '—'}</p>
                    {formData.website && <p><strong>وبسایت:</strong> {formData.website}</p>}
                  </div>
                </div>
              )}

              <div className="flex gap-6 pt-8">
                {step > 1 && (
                  <button
                    onClick={handlePrev}
                    className="flex-1 py-5 border-2 border-gray-300 rounded-2xl font-bold text-lg hover:bg-gray-50 transition"
                  >
                    قبلی
                  </button>
                )}
                {step < 3 ? (
                  <button
                    onClick={handleNext}
                    className="flex-1 py-5 bg-amber-500 text-white rounded-2xl font-bold text-lg hover:bg-amber-600 transition shadow-lg"
                  >
                    بعدی
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex-1 py-5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-bold text-xl hover:shadow-2xl transition disabled:opacity-70"
                  >
                    {isLoading ? 'در حال ارسال...' : 'ارسال درخواست'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}




// 'use client';

// import { useState } from 'react';
// import { validateForm } from '../../../lib/utils/validators';
// import SkeletonLoader from '../../../components/SkeletonLoader';

// export default function BecomeSellerPage() {
//   const [step, setStep] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     company: '',
//     description: '',
//   });
//   const [errors, setErrors] = useState({});

//   const handleNext = () => {
//     const validationErrors = validateForm(formData);
//     if (Object.keys(validationErrors).length === 0) {
//       setStep(step + 1);
//       setErrors({});
//     } else {
//       setErrors(validationErrors);
//     }
//   };

//   const handlePrev = () => setStep(step - 1);

//   const handleSubmit = async () => {
//     const validationErrors = validateForm(formData);
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await fetch('/api/sellers', {
//         method: 'POST',
//         body: JSON.stringify(formData),
//         headers: { 'Content-Type': 'application/json' },
//       });
//       if (response.ok) {
//         alert('درخواست فروشندگی با موفقیت ثبت شد!');
//         setFormData({ name: '', email: '', company: '', description: '' });
//         setStep(1);
//       } else {
//         setErrors({ submit: 'خطا در ارسال درخواست' });
//       }
//     } catch (error) {
//       setErrors({ submit: 'خطا در ارسال درخواست' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container py-8">
//       <h1 className="text-3xl font-bold mb-6">فروشنده شو</h1>
//       {isLoading ? (
//         <SkeletonLoader />
//       ) : (
//         <>
//           {step === 1 && (
//             <div className="space-y-4 max-w-md mx-auto">
//               <div>
//                 <input
//                   type="text"
//                   placeholder="نام"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className="w-full p-2 border rounded-lg"
//                 />
//                 {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//               </div>
//               <div>
//                 <input
//                   type="email"
//                   placeholder="ایمیل"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   className="w-full p-2 border rounded-lg"
//                 />
//                 {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//               </div>
//               <button onClick={handleNext} className="bg-primary text-white px-4 py-2 rounded-lg w-full">
//                 بعدی
//               </button>
//             </div>
//           )}
//           {step === 2 && (
//             <div className="space-y-4 max-w-md mx-auto">
//               <div>
//                 <input
//                   type="text"
//                   placeholder="نام شرکت"
//                   value={formData.company}
//                   onChange={(e) => setFormData({ ...formData, company: e.target.value })}
//                   className="w-full p-2 border rounded-lg"
//                 />
//                 {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
//               </div>
//               <div>
//                 <textarea
//                   placeholder="توضیحات شرکت"
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   className="w-full p-2 border rounded-lg"
//                 />
//                 {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
//               </div>
//               <div className="flex gap-4">
//                 <button onClick={handlePrev} className="border border-primary px-4 py-2 rounded-lg">
//                   قبلی
//                 </button>
//                 <button onClick={handleSubmit} className="bg-primary text-white px-4 py-2 rounded-lg">
//                   ارسال
//                 </button>
//               </div>
//             </div>
//           )}
//           {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}
//         </>
//       )}
//     </div>
//   );
// }