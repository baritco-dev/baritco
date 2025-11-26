// /components/Shop/ShopCategoryGrid.jsx
import Link from 'next/link';
import Image from 'next/image';
import { fetchProductsByCategory } from '../../lib/mocks/products';
import SkeletonLoader from '../SkeletonLoader';

export default async function ShopCategoryGrid({ categories }) {
  // دریافت تعداد محصولات برای هر دسته به صورت موازی
  const categoryCounts = await Promise.all(
    categories.map(async (category) => {
      const products = await fetchProductsByCategory(category.id);
      return { id: category.id, count: products.length };
    })
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.length === 0 ? (
        <SkeletonLoader />
      ) : (
        categories.map((category) => (
          <Link href={`/shop/${category.id}`} key={category.id}>
            <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition cursor-pointer bg-white">
              {/* نمایش تصویر دسته‌بندی */}
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.name}
                  width={200}
                  height={150}
                  className="object-cover rounded-lg mb-4"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-36 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-500">بدون تصویر</span>
                </div>
              )}
              {/* آیکون دسته‌بندی */}
              {category.icon && (
                <Image
                  src={category.icon}
                  alt={`${category.name} icon`}
                  width={24}
                  height={24}
                  className="mb-2"
                />
              )}
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="text-gray-600 text-sm">{category.description}</p>
              {/* تعداد محصولات */}
              <p className="text-sm text-gray-500 mt-2">
                {categoryCounts.find(c => c.id === category.id)?.count || 0} محصول
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}


