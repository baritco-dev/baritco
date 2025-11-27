// app/shop/products/page.jsx
import ShopCategoryGrid from '../../../components/Shop/ShopCategoryGrid';
import SkeletonShopCategoryGrid from '@/components/ui/SkeletonShopCategoryGrid';
import Breadcrumb from '@/components/Breadcrumb'; // Breadcrumb خودکار و بدون خطا
import { fetchShopCategories } from '../../../lib/mocks/shopCategories';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'فروشگاه تجهیزات معدنی و صنعتی | باریتکو',
  description: 'خرید تجهیزات حفاری، مواد شیمیایی، افزودنی‌های بتن، ابزار دقیق و همه چیز برای صنعت معدن با بهترین قیمت و ارسال سریع به سراسر ایران',
  keywords: 'تجهیزات معدنی, مواد معدنی, حفاری, افزودنی بتن, ابزار معدن, خرید آنلاین معدن, باریتکو',
  openGraph: {
    title: 'فروشگاه باریتکو - تجهیزات معدنی و صنعتی',
    description: 'خرید تجهیزات حفاری، مواد شیمیایی و ابزار معدن با بهترین قیمت',
    url: 'https://baritco.ir/shop',
    images: ['/images/iron1.jpg'],
    type: 'website',
  },
};

export default async function ShopHomePage() {
  let categories = [];
  let isLoading = true;

  try {
    categories = await fetchShopCategories();
    isLoading = false;
  } catch (err) {
    console.error('خطا در بارگذاری دسته‌بندی‌های فروشگاه:', err);
  }

  return (
    <>
      {/* بنر اصلی فروشگاه */}
      <div className="relative w-full h-96 md:h-screen max-h-96 overflow-hidden">
        <Image
          src="/images/iron1.jpg"
          alt="فروشگاه تجهیزات معدنی باریتکو"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            فروشگاه باریتکو
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            تجهیزات حفاری، مواد شیمیایی، افزودنی‌های بتن و همه چیز برای صنعت معدن
          </p>
        </div>
      </div>

      {/* Breadcrumb خودکار + عنوان */}
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb کاملاً خودکار — بدون هیچ پارامتری! */}
        <Breadcrumb />

        <div className="text-center mb-12 mt-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            دسته‌بندی محصولات
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            بیش از ۵۰۰ محصول تخصصی برای معادن، کارخانجات و پروژه‌های عمرانی
          </p>
        </div>

        {/* گرید دسته‌بندی‌ها یا اسکلتون حرفه‌ای */}
        <div className="mt-10">
          {isLoading ? (
            <SkeletonShopCategoryGrid />
          ) : categories.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-500">دسته‌بندی محصولی یافت نشد</p>
            </div>
          ) : (
            <ShopCategoryGrid categories={categories} />
          )}
        </div>

        {/* بنر تبلیغاتی پایین */}
        <div className="mt-20 bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-10 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">تخفیف ویژه این هفته!</h3>
          <p className="text-xl mb-6">تا ۳۰٪ تخفیف روی افزودنی‌های بتن و مواد شیمیایی</p>
          <Link
            href="/shop"
            className="inline-block bg-white text-amber-600 font-bold text-lg px-10 py-4 rounded-full hover:bg-gray-100 transition"
          >
            خرید با تخفیف
          </Link>
        </div>
      </div>
    </>
  );
}

export const revalidate = 3600;




// import ShopCategoryGrid from '../../../components/Shop/ShopCategoryGrid';
// import SkeletonLoader from '../../../components/SkeletonLoader';
// import { fetchShopCategories } from '../../../lib/mocks/shopCategories';

// // تنظیمات متادیتا برای سئو صفحه فروشگاه
// export const metadata = {
//   title: 'فروشگاه - باریتکو',
//   description: 'دسته‌بندی محصولات معدنی و صنعتی در پلتفرم باریتکو',
// };

// // صفحه اصلی فروشگاه که دسته‌بندی‌ها را نمایش می‌دهد
// export default async function ShopPage() {
//   // دریافت دسته‌بندی‌های فروشگاه از فایل موک
//   let categories = [];
//   let error = null;

//   try {
//     categories = await fetchShopCategories();
//   } catch (err) {
//     // ثبت خطا برای مدیریت حالت‌های ناموفق
//     error = err;
//   }

//   return (
//     <div className="container py-8">
//       {/* عنوان صفحه */}
//       <h1 className="text-3xl font-bold mb-6">فروشگاه</h1>

//       {/* بررسی وجود خطا یا دسته‌بندی‌های خالی */}
//       {error || categories.length === 0 ? (
//         // نمایش اسکلت لودینگ در صورت خطا یا نبود داده
//         <SkeletonLoader />
//       ) : (
//         // نمایش دسته‌بندی‌ها با استفاده از کامپوننت ShopCategoryGrid
//         <ShopCategoryGrid categories={categories} />
//       )}
//     </div>
//   );
// }

// // تنظیم ISR برای به‌روزرسانی صفحه هر یک ساعت
// export const revalidate = 3600;