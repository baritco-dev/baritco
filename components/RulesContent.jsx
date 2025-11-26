'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SkeletonLoader from './SkeletonLoader';

export default function RulesContent() {
  const [isLoading, setIsLoading] = useState(true);

  // شبیه‌سازی لودینگ اولیه
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 ثانیه لودینگ برای شبیه‌سازی
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold mb-2">1. مقدمه</h2>
            <p>
              خوش آمدید به پلتفرم باریتکو. این قوانین و مقررات برای استفاده از خدمات و محصولات ارائه‌شده در سایت باریتکو تنظیم شده است. با استفاده از این وب‌سایت، شما موافقت خود را با این شرایط اعلام می‌کنید.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">2. شرایط خرید</h2>
            <p>
              - تمامی محصولات موجود در سایت با اطلاعات دقیق ارائه شده‌اند. لطفاً قبل از خرید، توضیحات محصول را مطالعه کنید.<br />
              - پرداخت‌ها از طریق درگاه‌های امن انجام می‌شود و اطلاعات پرداخت شما محرمانه باقی خواهد ماند.<br />
              - پس از ثبت سفارش، امکان لغو سفارش تا 24 ساعت وجود دارد، مشروط بر اینکه محصول ارسال نشده باشد.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">3. شرایط فروشندگان</h2>
            <p>
              - فروشندگان باید اطلاعات دقیق و معتبر درباره محصولات خود ارائه دهند.<br />
              - باریتکو حق بررسی و تأیید محصولات قبل از انتشار آگهی را برای خود محفوظ می‌دارد.<br />
              - هرگونه نقض قوانین ممکن است منجر به تعلیق حساب فروشنده شود.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">4. سیاست بازپرداخت</h2>
            <p>
              - در صورت عدم رضایت از محصول، می‌توانید ظرف 7 روز درخواست بازپرداخت کنید، مشروط بر اینکه محصول استفاده نشده باشد.<br />
              - هزینه‌های ارسال برای بازپرداخت به عهده خریدار است، مگر اینکه محصول معیوب باشد.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-2">5. تماس با ما</h2>
            <p>
              در صورت داشتن هرگونه سوال یا نیاز به پشتیبانی، می‌توانید از طریق صفحه <Link href="/contactUs" className="text-primary">تماس با ما</Link> با تیم پشتیبانی باریتکو در ارتباط باشید.
            </p>
          </section>
        </div>
      )}
    </>
  );
}