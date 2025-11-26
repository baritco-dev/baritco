import Link from 'next/link';
import Image from 'next/image';
import SocialShare from '../SocialShare';

export default function AdCard({ ad }) {
  const defaultImage = '/images/default-ad.jpg';

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition relative">
      {ad.isGolden && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">
          ویژه
        </div>
      )}
      <Image
        src={ad.image || defaultImage}
        alt={ad.title || 'آگهی بدون عنوان'}
        width={300}
        height={200}
        className="object-cover rounded-lg"
        loading="lazy"
      />
      <h3 className="text-lg font-semibold mt-2">{ad.title || 'بدون عنوان'}</h3>
      <p className="text-gray-600">{ad.description ? ad.description.slice(0, 100) + '...' : 'بدون توضیحات'}</p>
      <div className="mt-2 text-sm text-gray-500">
        {ad.location && <p>مکان: {ad.location}</p>}
        {ad.price > 0 && <p>قیمت: {ad.price.toLocaleString('fa-IR')} تومان</p>}
        {ad.purity && <p>خلوص: {ad.purity}</p>}
        {ad.condition && (
          <p>وضعیت: {ad.condition === 'new' ? 'نو' : ad.condition === 'used' ? 'کارکرده' : 'بازسازی‌شده'}</p>
        )}
        {ad.quantityAvailable && <p>مقدار موجود: {ad.quantityAvailable.toLocaleString('fa-IR')} تن</p>}
      </div>
      {ad.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {ad.tags.slice(0, 2).map((tag, index) => (
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
        <Link href={`/ads/${ad.slug}`} className="text-primary hover:underline">
          مشاهده جزئیات
        </Link>
        <SocialShare url={`https://baritco.ir/ads/${ad.slug}`} title={ad.title || 'آگهی'} />
      </div>
    </div>
  );
}


