import Link from 'next/link';
import { fetchProducts } from '../../lib/mocks/products';
import { fetchAds } from '../../lib/mocks/ads';
import SkeletonLoader from '../../components/SkeletonLoader';

export async function generateMetadata() {
  return {
    metadataBase: new URL('https://baritco.ir'),
    title: 'تگ‌های محصولات و آگهی‌ها - باریتکو',
    description: 'لیست تمام تگ‌های محصولات و آگهی‌های موجود در پلتفرم باریتکو',
    openGraph: {
      title: 'تگ‌های محصولات و آگهی‌ها - باریتکو',
      description: 'لیست تمام تگ‌های محصولات و آگهی‌های موجود در پلتفرم باریتکو',
      url: '/tags',
    },
  };
}

export default async function TagsPage() {
  const products = await fetchProducts();
  const ads = await fetchAds();
  const uniqueTags = [
    ...new Set([
      ...products.flatMap(product => product.tags || []),
      ...ads.flatMap(ad => ad.tags || []),
    ]),
  ];

  if (!uniqueTags || uniqueTags.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative bg-gradient-to-r from-amber-500 to-amber-600 text-white py-6 mb-6 rounded-xl shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-10"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">تگ‌های محصولات و آگهی‌ها</h1>
          <p className="text-lg md:text-xl opacity-90">محصولات و آگهی‌های خود را بر اساس تگ‌های مرتبط کاوش کنید</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {uniqueTags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg hover:bg-amber-500 hover:text-white transition text-center text-lg font-semibold"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
}

export const revalidate = 3600; // ISR with 1-hour revalidation