import { fetchAdsByCategory } from '../../../lib/mocks/ads';
import AdCard from '../../../components/Adds/AdCard';
import SkeletonLoader from '../../../components/SkeletonLoader';

export async function generateMetadata({ params }) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  return {
    metadataBase: new URL('https://baritco.ir'),
    title: `آگهی‌های دسته‌بندی ${decodedCategory} - باریتکو`,
    description: `لیست آگهی‌های مرتبط با دسته‌بندی ${decodedCategory} در پلتفرم باریتکو`,
    openGraph: {
      title: `آگهی‌های دسته‌بندی ${decodedCategory} - باریتکو`,
      description: `لیست آگهی‌های مرتبط با دسته‌بندی ${decodedCategory} در پلتفرم باریتکو`,
      url: `/ads/category/${category}`,
    },
  };
}

export default async function CategoryPage({ params }) {
  try {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);
    const ads = await fetchAdsByCategory(decodedCategory);

    if (!ads || ads.length === 0) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="relative bg-gradient-to-r from-amber-500 to-amber-600 text-white py-6 mb-6 rounded-xl shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-noise opacity-10"></div>
            <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">آگهی‌های دسته‌بندی {decodedCategory}</h1>
              <p className="text-lg md:text-xl opacity-90">هیچ آگهی‌ای در این دسته‌بندی یافت نشد</p>
            </div>
          </div>
          <SkeletonLoader />
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="relative bg-gradient-to-r from-amber-500 to-amber-600 text-white py-6 mb-6 rounded-xl shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-10"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">آگهی‌های دسته‌بندی {decodedCategory}</h1>
            <p className="text-lg md:text-xl opacity-90">آگهی‌های مرتبط با {decodedCategory} را کاوش کنید</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Error loading ads for category ${category}:`, error.message);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="relative bg-gradient-to-r from-amber-500 to-amber-600 text-white py-6 mb-6 rounded-xl shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-10"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">خطا</h1>
            <p className="text-lg md:text-xl opacity-90">خطا در بارگذاری آگهی‌ها: {error.message}</p>
          </div>
        </div>
        <SkeletonLoader />
      </div>
    );
  }
}

export const revalidate = 3600; // ISR with 1-hour revalidation

