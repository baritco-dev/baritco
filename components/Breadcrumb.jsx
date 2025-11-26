// /components/Breadcrumb.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getBreadcrumbItems } from '../lib/utils/breadcrumb';

const Breadcrumb = () => {
  const pathname = usePathname();
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
    const fetchBreadcrumbItems = async () => {
      try {
        const items = await getBreadcrumbItems(pathname);
        setBreadcrumbItems(items);
      } catch (error) {
        console.error('Error fetching breadcrumb items:', error);
        setBreadcrumbItems([{ label: 'خانه', href: '/' }]); // فال‌بک در صورت خطا
      }
    };

    fetchBreadcrumbItems();
  }, [pathname]);

  // نمایش لودینگ یا فال‌بک در صورت خالی بودن breadcrumbItems
  if (!breadcrumbItems.length) {
    return <nav aria-label="breadcrumb" className="container py-4"></nav>;
  }

  return (
    <nav aria-label="breadcrumb" className="container py-4">
      <ol className="flex gap-2 text-sm text-gray-600 dark:text-gray-300">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href && !item.isLast ? (
              <Link href={item.href} className="hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100">{item.label}</span>
            )}
            {index < breadcrumbItems.length - 1 && (
              <span className="mx-2">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;