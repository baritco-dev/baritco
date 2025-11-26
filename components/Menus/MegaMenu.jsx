
import Link from 'next/link';

export default function MegaMenu() {
  const menuItems = [
    { title: 'فروشگاه', href: '/shop' },
    { title: 'آگهی‌ها', href: '/ads' },
    { title: 'کلینیک معدن', href: '/clinic' },
    { title: 'شرکت‌ها', href: '/organizations' },
    { title: 'مجله', href: '/magazine' },
    { title: 'اخبار', href: '/news' },
    { title: 'مناقصات', href: '/tenders' },
  ];

  return (
    <div className="hidden md:grid grid-cols-8 gap-4 bg-white text-gray-900 dark:bg-gray-800 dark:text-white p-4 rounded-lg shadow-lg">
      {menuItems.map((item, index) => (
        <Link key={index} href={item.href} className="hover:text-primary">
          {item.title}
        </Link>
      ))}
    </div>
  );
}