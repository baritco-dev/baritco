// app/shop/products/[slug]/page.jsx
import Image from 'next/image';
import Link from 'next/link';
import SocialShare from '../../../../components/SocialShare';
import ProductComparison from '../../../../components/Shop/ProductComparison';
import ProductTabs from '../../../../components/Shop/ProductTabs';
import SkeletonProductDetail from '@/components/ui/SkeletonProductDetail';
import Breadcrumb from '@/components/Breadcrumb'; // بدون پارامتر!
import { fetchProductBySlug, fetchProductReviews, fetchRelatedProducts } from '../../../../lib/mocks/products';
import { generateProductSchema } from '../../../../lib/utils/seo';
import AddToCartButton from '../../../../components/AddToCartButton';
import WishlistButton from '../../../../components/WishlistButton';
import CompareButton from '../../../../components/Shop/CompareButton';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return {
      title: 'محصول یافت نشد - باریتکو',
      description: 'محصول مورد نظر شما در فروشگاه باریتکو یافت نشد.',
    };
  }

  return {
    metadataBase: new URL('https://bariteco.ir'),
    title: `${product.title} | فروشگاه باریتکو`,
    description: product.description || `خرید ${product.title} با بهترین قیمت و کیفیت در باریتکو`,
    keywords: `${product.title}, خرید ${product.title}, ${product.category || 'تجهیزات معدنی'}, فروشگاه باریتکو, باریتکو`,
    openGraph: {
      title: product.title,
      description: product.description || `خرید ${product.title} با بهترین قیمت`,
      images: [product.image || '/images/default-product.jpg'],
      url: `/shop/products/${slug}`,
      locale: 'fa_IR',
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  const reviews = await fetchProductReviews(slug);
  const relatedProducts = await fetchRelatedProducts(slug);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb خودکار — بدون پارامتر */}
        <Breadcrumb />
        <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">محصول یافت نشد</h2>
          <Link
            href="/shop"
            className="inline-block bg-amber-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-amber-600 transition"
          >
            بازگشت به فروشگاه
          </Link>
        </div>
        <SkeletonProductDetail />
      </div>
    );
  }

  const schema = generateProductSchema(product);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Breadcrumb کاملاً خودکار — بدون هیچ پارامتری! */}
      <Breadcrumb />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* تصاویر محصول */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-gray-200 shadow-xl">
              <Image
                src={product.image || '/images/default-product.jpg'}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">ناموجود</span>
                </div>
              )}
            </div>

            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-gray-200">
                    <Image
                      src={img}
                      alt={`${product.title} - تصویر ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* اطلاعات محصول */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-6">
              <span className="text-4xl font-bold text-amber-600">
                {product.price.toLocaleString('fa-IR')} تومان
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-2xl text-gray-500 line-through">
                  {product.originalPrice.toLocaleString('fa-IR')} تومان
                </span>
              )}
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              {product.description || 'توضیحات محصول در دسترس نیست.'}
            </p>

            <div className="py-6 border-t border-b space-y-4 text-lg">
              <p className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                وضعیت: {product.inStock ? 'موجود در انبار' : 'ناموجود'}
              </p>
              {product.inStock && product.stockQuantity && (
                <p className="text-gray-600">
                  تعداد موجود: {product.stockQuantity.toLocaleString('fa-IR')} عدد
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <AddToCartButton product={product} />
              <WishlistButton item={product} type="products" />
              <CompareButton product={product} openModalOnAdd={true} />
            </div>

            <div className="pt-6 border-t">
              <p className="text-gray-600 mb-4 text-lg">این محصول را به اشتراک بگذارید:</p>
              <SocialShare url={`https://baritco.ir/shop/products/${slug}`} title={product.title} />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <ProductTabs product={product} reviews={reviews} relatedProducts={relatedProducts} />
        </div>

        <div className="mt-12">
          <ProductComparison productIds={[product.id]} />
        </div>
      </div>
    </div>
  );
}

export const revalidate = 3600;




// import Image from 'next/image';
// import Link from 'next/link';
// import SocialShare from '../../../../components/SocialShare';
// import ProductComparison from '../../../../components/Shop/ProductComparison';
// import ProductTabs from '../../../../components/Shop/ProductTabs';
// import { fetchProductBySlug, fetchProductReviews, fetchRelatedProducts } from '../../../../lib/mocks/products';
// import { generateProductSchema } from '../../../../lib/utils/seo';
// import SkeletonLoader from '../../../../components/SkeletonLoader';
// import AddToCartButton from '../../../../components/AddToCartButton';
// import WishlistButton from '../../../../components/WishlistButton';
// import CompareButton from '../../../../components/Shop/CompareButton';

// export async function generateMetadata({ params }) {
//   const { slug } = await params;
//   const product = await fetchProductBySlug(slug);
//   return {
//     metadataBase: new URL('https://bariteco.ir'),
//     title: product?.title || 'محصول - باریتکو',
//     description: product?.description || 'جزئیات محصول در پلتفرم باریتکو',
//     openGraph: {
//       title: product?.title || 'محصول - باریتکو',
//       description: product?.description || 'جزئیات محصول در پلتفرم باریتکو',
//       images: [product?.image || '/images/default-product.jpg'],
//       url: `/shop/products/${slug}`,
//     },
//   };
// }

// export default async function ProductPage({ params }) {
//   const { slug } = await params;
//   const product = await fetchProductBySlug(slug);
//   const reviews = await fetchProductReviews(slug);
//   const relatedProducts = await fetchRelatedProducts(slug);

//   if (!product) {
//     return <SkeletonLoader />;
//   }

//   const schema = generateProductSchema(product);

//   return (
//     <div className="container py-8">
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
//       />
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="space-y-4">
//           <Image
//             src={product?.image || '/images/default-product.jpg'}
//             alt={product.title}
//             width={500}
//             height={400}
//             className="object-cover rounded-lg"
//             loading="lazy"
//           />
//           <div className="flex gap-2">
//             {product.images?.map((image, index) => (
//               <Image
//                 key={index}
//                 src={image || '/images/default-product.jpg'}
//                 alt={`${product.title} ${index + 1}`}
//                 width={100}
//                 height={80}
//                 className="object-cover rounded-lg"
//                 loading="lazy"
//               />
//             ))}
//           </div>
//         </div>
//         <div>
//           <h1 className="text-3xl font-bold">{product.title}</h1>
//           <p className="text-gray-600 mt-2">{product.description}</p>
//           <div className="mt-4">
//             <span className="text-2xl font-semibold">{product.price} تومان</span>
//             {product.discount && (
//               <span className="text-gray-500 line-through ml-2">
//                 {product.originalPrice} تومان
//               </span>
//             )}
//           </div>
//           <p className="text-green-600 mt-2">
//             {product.inStock ? `موجود (${product.stockQuantity} عدد)` : 'ناموجود'}
//           </p>
//           <div className="mt-4">
//             <span className="text-gray-600">تگ‌ها: </span>
//             {product.tags.map((tag) => (
//               <Link
//                 key={tag}
//                 href={`/tags/${encodeURIComponent(tag)}`}
//                 className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-amber-100 px-2 py-1 rounded mr-2 hover:bg-amber-500 hover:text-white transition"
//               >
//                 {tag}
//               </Link>
//             ))}
//           </div>
//           <div className="flex gap-4 mt-4">
//             <AddToCartButton product={product} />
//             <WishlistButton item={product} type="products" />
//             <CompareButton product={product} openModalOnAdd={true} />
//           </div>
//           <SocialShare url={`/shop/products/${product.slug}`} title={product.title} />
//         </div>
//       </div>
//       <ProductTabs product={product} reviews={reviews} relatedProducts={relatedProducts} />
//       <ProductComparison productIds={[product.id]} />
//     </div>
//   );
// }

// export const revalidate = 3600; // ISR with 1-hour revalidation
