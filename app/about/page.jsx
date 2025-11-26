'use client';

import { useState, useEffect } from 'react';
import SkeletonLoader from '../../components/SkeletonLoader';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('about');
  const [isLoading, setIsLoading] = useState(true);

  // شبیه‌سازی لودینگ اولیه
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 ثانیه لودینگ برای شبیه‌سازی
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'about', title: 'درباره ما' },
    { id: 'goals', title: 'اهداف باریتکو' },
    { id: 'team', title: 'تیم باریتکو' },
  ];

  return (
    <div className="container py-8">
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          {/* تب‌ها در بالا سمت چپ */}
          <div className="flex justify-start mb-6">
            <div className="flex gap-4 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-gray-500 hover:text-primary'
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </div>

          {/* محتوای تب‌ها */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            {activeTab === 'about' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">درباره ما</h2>
                <p className="text-gray-700 leading-relaxed">
                  باریتکو یک پلتفرم تخصصی در حوزه معدن و صنایع معدنی است که با هدف ایجاد ارتباط بین فعالان این صنعت، ارائه خدمات متنوع از جمله خرید و فروش مواد معدنی، تجهیزات، و خدمات مشاوره‌ای، و همچنین انتشار اخبار و مقالات تخصصی فعالیت می‌کند. ما در باریتکو تلاش می‌کنیم تا با استفاده از فناوری‌های نوین، بستری قابل اعتماد و کارآمد برای تمامی ذی‌نفعان این صنعت فراهم کنیم.
                </p>
              </div>
            )}
            {activeTab === 'goals' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">اهداف باریتکو</h2>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                  <li>تسهیل ارتباط بین تولیدکنندگان، فروشندگان و خریداران در صنعت معدن.</li>
                  <li>ارتقای دانش و فناوری در حوزه معدن با انتشار محتوای تخصصی.</li>
                  <li>ایجاد شفافیت در معاملات معدنی و مناقصات.</li>
                  <li>حمایت از نوآوری و توسعه پایدار در صنایع معدنی.</li>
                </ul>
              </div>
            )}
            {activeTab === 'team' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">تیم باریتکو</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  تیم باریتکو از متخصصان با تجربه در حوزه‌های معدن، فناوری اطلاعات، و بازاریابی تشکیل شده است که با اشتیاق به توسعه صنعت معدن ایران فعالیت می‌کنند.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold">دکتر احمد معدنی</h3>
                    <p className="text-gray-600">مدیرعامل و متخصص مهندسی معدن</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold">مهندس سارا کاظمی</h3>
                    <p className="text-gray-600">مدیر فناوری و توسعه محصول</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}