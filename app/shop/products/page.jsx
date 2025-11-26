import ShopCategoryGrid from '../../../components/Shop/ShopCategoryGrid';
import SkeletonLoader from '../../../components/SkeletonLoader';
import { fetchShopCategories } from '../../../lib/mocks/shopCategories';

// تنظیمات متادیتا برای سئو صفحه فروشگاه
export const metadata = {
  title: 'فروشگاه - باریتکو',
  description: 'دسته‌بندی محصولات معدنی و صنعتی در پلتفرم باریتکو',
};

// صفحه اصلی فروشگاه که دسته‌بندی‌ها را نمایش می‌دهد
export default async function ShopPage() {
  // دریافت دسته‌بندی‌های فروشگاه از فایل موک
  let categories = [];
  let error = null;

  try {
    categories = await fetchShopCategories();
  } catch (err) {
    // ثبت خطا برای مدیریت حالت‌های ناموفق
    error = err;
  }

  return (
    <div className="container py-8">
      {/* عنوان صفحه */}
      <h1 className="text-3xl font-bold mb-6">فروشگاه</h1>

      {/* بررسی وجود خطا یا دسته‌بندی‌های خالی */}
      {error || categories.length === 0 ? (
        // نمایش اسکلت لودینگ در صورت خطا یا نبود داده
        <SkeletonLoader />
      ) : (
        // نمایش دسته‌بندی‌ها با استفاده از کامپوننت ShopCategoryGrid
        <ShopCategoryGrid categories={categories} />
      )}
    </div>
  );
}

// تنظیم ISR برای به‌روزرسانی صفحه هر یک ساعت
export const revalidate = 3600;