'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '../../../components/Sidebar';
import SkeletonProductCard from '@/components/ui/SkeletonProductCard';
import Breadcrumb from '@/components/Breadcrumb';
import { fetchProductsByCategory } from '../../../lib/mocks/products';
import { getPersianName } from '@/lib/shopCategoryPersian';
import { use } from 'react';

export default function CategoryPage({ params }) {
  const { category } = use(params);
  const persianName = getPersianName(category);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 10000000],
    inStock: false,
    minRating: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProductsByCategory(category);
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, [category]);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const inPriceRange = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const inStockMatch = !filters.inStock || product.inStock;
      const ratingMatch = product.rating >= filters.minRating;
      return inPriceRange && inStockMatch && ratingMatch;
    });
    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb/>
      </div>

      {/* عنوان و توضیحات دسته‌بندی */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-amber-100 mb-4">
            {persianName}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            بهترین تجهیزات و مواد معدنی {persianName} با قیمت مناسب و ارسال سریع به سراسر ایران
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* سایدبار فیلترها */}
          <div className="md:col-span-1">
            <Sidebar onFilterChange={handleFilterChange} />
          </div>

          {/* لیست محصولات */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(12)].map((_, i) => (
                  <SkeletonProductCard key={i} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                  محصولی در این دسته‌بندی یافت نشد
                </h3>
                <p className="text-xl text-gray-600 mb-8">
                  به زودی محصولات جدید اضافه می‌شه!
                </p>
                <Link
                  href="/shop"
                  className="inline-block bg-amber-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-amber-600 transition"
                >
                  بازگشت به فروشگاه
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <Link href={`/shop/products/${product.slug}`} key={product.id}>
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                      <div className="relative aspect-square">
                        <Image
                          src={product.image || '/images/default-product.jpg'}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.inStock === false && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">ناموجود</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                          {product.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-amber-600">
                            {product.price.toLocaleString('fa-IR')} تومان
                          </span>
                          <span className="text-primary font-bold text-lg hover:underline">
                            مشاهده جزئیات
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}




// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import Sidebar from '../../../components/Sidebar';
// import SkeletonLoader from '../../../components/SkeletonLoader';
// import { fetchProductsByCategory } from '../../../lib/mocks/products';
// import { use } from 'react';

// // کامپوننت صفحه دسته‌بندی محصولات
// export default function CategoryPage({ params }) {
//   // باز کردن Promise مربوط به params با استفاده از React.use
//   const { category } = use(params);

//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [filters, setFilters] = useState({
//     priceRange: [0, 10000000],
//     inStock: false,
//     minRating: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   // بارگذاری محصولات بر اساس دسته‌بندی
//   useEffect(() => {
//     async function loadProducts() {
//       const data = await fetchProductsByCategory(category);
//       setProducts(data);
//       setFilteredProducts(data);
//       setLoading(false);
//     }
//     loadProducts();
//   }, [category]);

//   // اعمال فیلترها به محصولات
//   useEffect(() => {
//     const filtered = products.filter((product) => {
//       const inPriceRange =
//         product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
//       const inStockMatch = !filters.inStock || product.inStock;
//       const ratingMatch = product.rating >= filters.minRating;
//       return inPriceRange && inStockMatch && ratingMatch;
//     });
//     setFilteredProducts(filtered);
//   }, [filters, products]);

//   // مدیریت تغییرات فیلترها
//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//   };

//   return (
//     <div className="container py-8">
//       {/* عنوان صفحه با استفاده از category بازشده */}
//       <h1 className="text-3xl font-bold mb-6">محصولات - {category}</h1>
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {/* سایدبار فیلترها */}
//         <div className="col-span-1">
//           <Sidebar onFilterChange={handleFilterChange} />
//         </div>
//         {/* لیست محصولات */}
//         <div className="col-span-3">
//           {loading ? (
//             // نمایش اسکلت لودینگ در حالت بارگذاری
//             <SkeletonLoader />
//           ) : filteredProducts.length === 0 ? (
//             // پیام در صورت نبود محصول
//             <p>محصولی در این دسته‌بندی یافت نشد.</p>
//           ) : (
//             // نمایش محصولات فیلترشده
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {filteredProducts.map((product) => (
//                 <Link href={`/${product.slug}`} key={product.id}>
//                   <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
//                     <Image
//                       src={product.image}
//                       alt={product.title}
//                       width={300}
//                       height={200}
//                       className="object-cover rounded-lg"
//                       loading="lazy"
//                     />
//                     <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
//                     <p className="text-gray-600">{product.description.slice(0, 100)}...</p>
//                     <p className="text-primary mt-2">مشاهده جزئیات</p>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }