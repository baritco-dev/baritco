import Link from 'next/link';
import Image from 'next/image';
import { fetchContent } from '../../lib/api/content';
import SkeletonLoader from '../../components/SkeletonLoader';

export const metadata = {
  title: 'مناقصات و مزایدات - باریتکو',
  description: 'لیست مناقصات و مزایدات حوزه معدن و صنایع مرتبط',
};

export default async function TendersPage() {
  const tenders = await fetchContent('tender');

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">مناقصات و مزایدات</h1>
      {!tenders || tenders.length === 0 ? (
        <SkeletonLoader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tenders.map((tender) => (
            <div key={tender.id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
              <Image
                src={tender.image}
                alt={tender.title}
                width={300}
                height={200}
                className="object-cover rounded-lg"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 300px"
              />
              <h3 className="text-lg font-semibold mt-2">{tender.title}</h3>
              <p className="text-gray-600">{tender.description?.slice(0, 100)}...</p>
              <p className="text-sm text-gray-500">نوع: {tender.type}</p>
              <Link href={`/tenders/${tender.slug.toLowerCase()}`} className="text-primary mt-2 inline-block">
                مشاهده جزئیات
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export const revalidate = 3600; // ISR with 1-hour revalidation