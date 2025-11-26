import Link from 'next/link';
import { fetchProductsByTag } from '../../../lib/mocks/products';
import { fetchAdsByTag } from '../../../lib/mocks/ads';
import SkeletonLoader from '../../../components/SkeletonLoader';
import ProductCard from '../../../components/Shop/ProductCard';
import AdCard from '../../../components/Adds/AdCard';

export async function generateMetadata({ params }) {
  const { tag } = await params;
  return {
    metadataBase: new URL('https://baritco.ir'),
    title: `محصولات و آگهی‌ها با تگ ${tag} - باریتکو`,
    description: `لیست محصولات و آگهی‌های مرتبط با تگ ${tag} در پلتفرم باریتکو`,
    openGraph: {
      title: `محصولات و آگهی‌ها با تگ ${tag} - باریتکو`,
      description: `لیست محصولات و آگهی‌های مرتبط با تگ ${tag} در پلتفرم باریتکو`,
      url: `/tags/${tag}`,
    },
  };
}

export default async function TagProductsPage({ params }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const products = await fetchProductsByTag(decodedTag);
  const ads = await fetchAdsByTag(decodedTag);

  if ((!products || products.length === 0) && (!ads || ads.length === 0)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">محصولات و آگهی‌ها با تگ {decodedTag}</h1>
        <p className="text-gray-600">هیچ محصول یا آگهی‌ای با این تگ یافت نشد.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative bg-gradient-to-r from-amber-500 to-amber-600 text-white py-6 mb-6 rounded-xl shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-10"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">محصولات و آگهی‌ها با تگ {decodedTag}</h1>
          <p className="text-lg md:text-xl opacity-90">محصولات و آگهی‌های مرتبط با تگ {decodedTag} را کاوش کنید</p>
        </div>
      </div>
      {products.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4">محصولات</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
      {ads.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4">آگهی‌ها</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ads.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export const revalidate = 3600; // ISR with 1-hour revalidation


