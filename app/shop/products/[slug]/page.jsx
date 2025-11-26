import Image from 'next/image';
import Link from 'next/link';
import SocialShare from '../../../../components/SocialShare';
import ProductComparison from '../../../../components/Shop/ProductComparison';
import ProductTabs from '../../../../components/Shop/ProductTabs';
import { fetchProductBySlug, fetchProductReviews, fetchRelatedProducts } from '../../../../lib/mocks/products';
import { generateProductSchema } from '../../../../lib/utils/seo';
import SkeletonLoader from '../../../../components/SkeletonLoader';
import AddToCartButton from '../../../../components/AddToCartButton';
import WishlistButton from '../../../../components/WishlistButton';
import CompareButton from '../../../../components/Shop/CompareButton';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  return {
    metadataBase: new URL('https://bariteco.ir'),
    title: product?.title || 'محصول - باریتکو',
    description: product?.description || 'جزئیات محصول در پلتفرم باریتکو',
    openGraph: {
      title: product?.title || 'محصول - باریتکو',
      description: product?.description || 'جزئیات محصول در پلتفرم باریتکو',
      images: [product?.image || '/images/default-product.jpg'],
      url: `/shop/products/${slug}`,
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  const reviews = await fetchProductReviews(slug);
  const relatedProducts = await fetchRelatedProducts(slug);

  if (!product) {
    return <SkeletonLoader />;
  }

  const schema = generateProductSchema(product);

  return (
    <div className="container py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Image
            src={product?.image || '/images/default-product.jpg'}
            alt={product.title}
            width={500}
            height={400}
            className="object-cover rounded-lg"
            loading="lazy"
          />
          <div className="flex gap-2">
            {product.images?.map((image, index) => (
              <Image
                key={index}
                src={image || '/images/default-product.jpg'}
                alt={`${product.title} ${index + 1}`}
                width={100}
                height={80}
                className="object-cover rounded-lg"
                loading="lazy"
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <div className="mt-4">
            <span className="text-2xl font-semibold">{product.price} تومان</span>
            {product.discount && (
              <span className="text-gray-500 line-through ml-2">
                {product.originalPrice} تومان
              </span>
            )}
          </div>
          <p className="text-green-600 mt-2">
            {product.inStock ? `موجود (${product.stockQuantity} عدد)` : 'ناموجود'}
          </p>
          <div className="mt-4">
            <span className="text-gray-600">تگ‌ها: </span>
            {product.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-amber-100 px-2 py-1 rounded mr-2 hover:bg-amber-500 hover:text-white transition"
              >
                {tag}
              </Link>
            ))}
          </div>
          <div className="flex gap-4 mt-4">
            <AddToCartButton product={product} />
            <WishlistButton item={product} type="products" />
            <CompareButton product={product} openModalOnAdd={true} />
          </div>
          <SocialShare url={`/shop/products/${product.slug}`} title={product.title} />
        </div>
      </div>
      <ProductTabs product={product} reviews={reviews} relatedProducts={relatedProducts} />
      <ProductComparison productIds={[product.id]} />
    </div>
  );
}

export const revalidate = 3600; // ISR with 1-hour revalidation
