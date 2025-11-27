// app/ads/page.jsx
import AdCategoryGrid from '../../components/Adds/AdCategoryGrid';
import SkeletonCategoryGrid from '@/components/ui/SkeletonCategoryGrid';
import { fetchAdCategories } from '../../lib/mocks/ads';

export const metadata = {
  title: 'آگهی‌ها - باریتکو',
  description: 'دسته‌بندی آگهی‌های معدنی و صنعتی در پلتفرم باریتکو',
  openGraph: {
    title: 'آگهی‌ها - باریتکو',
    description: 'دسته‌بندی آگهی‌های معدنی و صنعتی در پلتفرم باریتکو',
    url: 'https://baritco.ir/ads',
  },
};

export default async function AdsPage() {
  let categories = [];
  let isLoading = true;

  try {
    categories = await fetchAdCategories();
    isLoading = false;
  } catch (err) {
    console.error('خطا در بارگذاری دسته‌بندی‌ها:', err);
    isLoading = true;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* عنوان صفحه */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          {isLoading ? (
            <div className="h-12 bg-gray-300 rounded-lg w-64 mx-auto" />
          ) : (
            'آگهی‌های باریتکو'
          )}
        </h1>
        <p className="text-lg text-gray-600">
          {isLoading ? (
            <div className="h-5 bg-gray-300 rounded w-96 mx-auto" />
          ) : (
            'همه آگهی‌های معدنی، صنعتی و تجهیزاتی در یک جا'
          )}
        </p>
      </div>

      {/* گرید دسته‌بندی‌ها یا اسکلتون */}
      <div className="mt-12">
        {isLoading || categories.length === 0 ? (
          <SkeletonCategoryGrid />
        ) : (
          <AdCategoryGrid categories={categories} />
        )}
      </div>

      {/* پیام خطا یا خالی بودن */}
      {categories.length === 0 && !isLoading && (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">دسته‌بندی‌ای یافت نشد</p>
        </div>
      )}
    </div>
  );
}

export const revalidate = 3600; // هر ساعت یکبار بازسازی





// // /app/ads/page.jsx
// import AdCategoryGrid from '../../components/Adds/AdCategoryGrid';
// import SkeletonLoader from '../../components/SkeletonLoader';
// import { fetchAdCategories } from '../../lib/mocks/ads';

// export const metadata = {
//   title: 'آگهی‌ها - باریتکو',
//   description: 'دسته‌بندی آگهی‌های معدنی و صنعتی در پلتفرم باریتکو',
// };

// export default async function AdsPage() {
//   let categories = [];
//   let error = null;

//   try {
//     categories = await fetchAdCategories();
//   } catch (err) {
//     error = err;
//   }

//   return (
//     <div className="container py-8">
//       <h1 className="text-3xl font-bold mb-6">آگهی‌ها</h1>
//       {error || categories.length === 0 ? (
//         <SkeletonLoader />
//       ) : (
//         <AdCategoryGrid categories={categories} />
//       )}
//     </div>
//   );
// }

// export const revalidate = 3600; // ISR with 1-hour revalidation

