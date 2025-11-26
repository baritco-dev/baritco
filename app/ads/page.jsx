// /app/ads/page.jsx
import AdCategoryGrid from '../../components/Adds/AdCategoryGrid';
import SkeletonLoader from '../../components/SkeletonLoader';
import { fetchAdCategories } from '../../lib/mocks/ads';

export const metadata = {
  title: 'آگهی‌ها - باریتکو',
  description: 'دسته‌بندی آگهی‌های معدنی و صنعتی در پلتفرم باریتکو',
};

export default async function AdsPage() {
  let categories = [];
  let error = null;

  try {
    categories = await fetchAdCategories();
  } catch (err) {
    error = err;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">آگهی‌ها</h1>
      {error || categories.length === 0 ? (
        <SkeletonLoader />
      ) : (
        <AdCategoryGrid categories={categories} />
      )}
    </div>
  );
}

export const revalidate = 3600; // ISR with 1-hour revalidation

