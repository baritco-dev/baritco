// components/Breadcrumb.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'; // این خط حیاتی بود!

const categoryNames = {
  'shop': 'فروشگاه',
  'drilling-equipment': 'تجهیزات حفاری',
  'chemicals': 'مواد شیمیایی',
  'concrete-additives': 'افزودنی‌های بتن',
  'metal-minerals': 'مواد معدنی فلزی',
  'non-metal-minerals': 'مواد معدنی غیرفلزی',
  'tools': 'ابزارآلات',
  'safety-equipment': 'تجهیزات ایمنی',
  'barite': 'باریت',
  'bentonite': 'بنتونیت',
  'silica': 'سیلیس',
  'iron-ore': 'سنگ آهن',
  'copper-ore': 'سنگ مس',
  'cart': 'سبد خرید',
  'checkout': 'تسویه حساب',
  'become-seller': 'فروشنده شو',
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  // اگر صفحه اصلی یا غیرمرتبط بود
  if (segments.length === 0) return null;

  // تشخیص اینکه توی فروشگاه هستیم
  const isInShop = segments[0] === 'shop' || categoryNames[segments[0]];
  if (!isInShop) return null;

  const path = [
    { name: 'خانه', href: '/' },
    { name: 'فروشگاه', href: '/shop' },
  ];

  // اگر مستقیم به دسته‌بندی رفتیم (مثل /metal-minerals)
  if (segments[0] !== 'shop' && categoryNames[segments[0]]) {
    const name = categoryNames[segments[0]];
    path.push({ name, href: `/${segments[0]}`, isLast: true });
  }
  // اگر از /shop شروع شد
  else if (segments[0] === 'shop') {
    for (let i = 1; i < segments.length; i++) {
      const slug = segments[i];
      const name = categoryNames[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const href = `/shop/${segments.slice(1, i + 1).join('/')}`;
      const isLast = i === segments.length - 1;
      path.push({ name, href, isLast });
    }
  }

  return (
    <nav className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <ol className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
          {path.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="text-gray-400">/</span>}
              <li>
                {item.isLast ? (
                  <span className="text-gray-900 dark:text-white font-medium">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-amber-600 transition">
                    {item.name}
                  </Link>
                )}
              </li>
            </React.Fragment>
          ))}
        </ol>
      </div>
    </nav>
  );
}




// // /components/Breadcrumb.jsx
// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import { getBreadcrumbItems } from '../lib/utils/breadcrumb';

// const Breadcrumb = () => {
//   const pathname = usePathname();
//   const [breadcrumbItems, setBreadcrumbItems] = useState([]);

//   useEffect(() => {
//     const fetchBreadcrumbItems = async () => {
//       try {
//         const items = await getBreadcrumbItems(pathname);
//         setBreadcrumbItems(items);
//       } catch (error) {
//         console.error('Error fetching breadcrumb items:', error);
//         setBreadcrumbItems([{ label: 'خانه', href: '/' }]); // فال‌بک در صورت خطا
//       }
//     };

//     fetchBreadcrumbItems();
//   }, [pathname]);

//   // نمایش لودینگ یا فال‌بک در صورت خالی بودن breadcrumbItems
//   if (!breadcrumbItems.length) {
//     return <nav aria-label="breadcrumb" className="container py-4"></nav>;
//   }

//   return (
//     <nav aria-label="breadcrumb" className="container py-4">
//       <ol className="flex gap-2 text-sm text-gray-600 dark:text-gray-300">
//         {breadcrumbItems.map((item, index) => (
//           <li key={index} className="flex items-center">
//             {item.href && !item.isLast ? (
//               <Link href={item.href} className="hover:text-primary">
//                 {item.label}
//               </Link>
//             ) : (
//               <span className="text-gray-900 dark:text-gray-100">{item.label}</span>
//             )}
//             {index < breadcrumbItems.length - 1 && (
//               <span className="mx-2">/</span>
//             )}
//           </li>
//         ))}
//       </ol>
//     </nav>
//   );
// };

// export default Breadcrumb;