
// /components/ProductCard.jsx
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import AddToCartButton from '../AddToCartButton';
import WishlistButton from '../WishlistButton';
import SocialShare from '../SocialShare';

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition relative">
      <Image
        src={product.image}
        alt={product.title}
        width={300}
        height={200}
        className="object-cover rounded-lg"
        loading="lazy"
      />
      <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
      <div className="flex items-center mt-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < Math.round(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
      <p className="text-gray-600 mt-1">{product.price.toLocaleString('fa-IR')} تومان</p>
      {product.discount && (
        <p className="text-gray-500 line-through text-sm">
          {product.originalPrice.toLocaleString('fa-IR')} تومان
        </p>
      )}
      <p className="text-sm text-green-600 mt-1">
        {product.inStock ? `موجود (${product.stockQuantity} عدد)` : 'ناموجود'}
      </p>
      {product.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {product.tags.slice(0, 2).map((tag, index) => (
            <Link
              key={index}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="text-xs bg-gray-100 rounded px-2 py-1 hover:bg-amber-500 hover:text-white transition"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-2">
          <Link href={`/${product.slug}`} className="text-primary hover:underline">
            مشاهده جزئیات
          </Link>
          <AddToCartButton product={product} />
          <WishlistButton item={product} type="products" />
        </div>
        <SocialShare url={`https://baritco.ir/${product.slug}`} title={product.title} />
      </div>
      {product.discount && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          تخفیف
        </span>
      )}
    </div>
  );
}

