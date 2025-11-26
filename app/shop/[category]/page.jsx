'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '../../../components/Sidebar';
import SkeletonLoader from '../../../components/SkeletonLoader';
import { fetchProductsByCategory } from '../../../lib/mocks/products';
import { use } from 'react';

// کامپوننت صفحه دسته‌بندی محصولات
export default function CategoryPage({ params }) {
  // باز کردن Promise مربوط به params با استفاده از React.use
  const { category } = use(params);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 10000000],
    inStock: false,
    minRating: 0,
  });
  const [loading, setLoading] = useState(true);

  // بارگذاری محصولات بر اساس دسته‌بندی
  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProductsByCategory(category);
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, [category]);

  // اعمال فیلترها به محصولات
  useEffect(() => {
    const filtered = products.filter((product) => {
      const inPriceRange =
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const inStockMatch = !filters.inStock || product.inStock;
      const ratingMatch = product.rating >= filters.minRating;
      return inPriceRange && inStockMatch && ratingMatch;
    });
    setFilteredProducts(filtered);
  }, [filters, products]);

  // مدیریت تغییرات فیلترها
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="container py-8">
      {/* عنوان صفحه با استفاده از category بازشده */}
      <h1 className="text-3xl font-bold mb-6">محصولات - {category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* سایدبار فیلترها */}
        <div className="col-span-1">
          <Sidebar onFilterChange={handleFilterChange} />
        </div>
        {/* لیست محصولات */}
        <div className="col-span-3">
          {loading ? (
            // نمایش اسکلت لودینگ در حالت بارگذاری
            <SkeletonLoader />
          ) : filteredProducts.length === 0 ? (
            // پیام در صورت نبود محصول
            <p>محصولی در این دسته‌بندی یافت نشد.</p>
          ) : (
            // نمایش محصولات فیلترشده
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link href={`/${product.slug}`} key={product.id}>
                  <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
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
                    <p className="text-primary mt-2">مشاهده جزئیات</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}