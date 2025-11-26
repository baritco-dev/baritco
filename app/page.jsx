import Link from 'next/link';
import Image from 'next/image';
import Slider from '../components/Slider';
import { fetchProducts } from '../lib/mocks/products';
import { fetchSliderItems } from '../lib/mocks/slider';

// تنظیمات متادیتا برای صفحه اصلی
export const metadata = {
  title: 'صفحه اصلی - باریتکو',
  description: 'پلتفرم تخصصی معدن و صنایع معدنی',
};

// صفحه اصلی برنامه
export default async function HomePage() {
  // دریافت محصولات و آیتم‌های اسلایدر
  const products = await fetchProducts();
  const sliderItems = await fetchSliderItems();

  return (
    <div className="container py-8">
      <Slider items={sliderItems} />
      {/* عنوان و توضیحات صفحه */}
      <h1 className="text-3xl font-bold mb-6 mt-8">خوش آمدید به باریتکو</h1>
      <p className="mb-4">پلتفرم تخصصی برای فعالان صنعت معدن و صنایع مرتبط.</p>
      {/* لیست محصولات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={200}
              className="object-cover rounded-lg"
              loading="lazy"
            />
            <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
            <p className="text-gray-600">{product.description.slice(0, 100)}...</p>
            <Link href={`/shop/products/${product.slug}`} className="text-primary mt-2 inline-block">
              مشاهده جزئیات
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// تنظیم ISR برای به‌روزرسانی صفحه هر یک ساعت
export const revalidate = 3600;