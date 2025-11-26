import Link from 'next/link';
import Image from 'next/image';
import { fetchContent } from '../../lib/api/content';
import SkeletonLoader from '../../components/SkeletonLoader';

export const metadata = {
  title: 'مجله - باریتکو',
  description: 'مقالات تخصصی در حوزه معدن و صنایع مرتبط',
};

export default async function MagazinePage() {
  const articles = await fetchContent('magazine');

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">مجله</h1>
      {!articles || articles.length === 0 ? (
        <SkeletonLoader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
              <Image
                src={article.image}
                alt={article.title}
                width={300}
                height={200}
                className="object-cover rounded-lg"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 300px"
              />
              <h3 className="text-lg font-semibold mt-2">{article.title}</h3>
              <p className="text-gray-600">{article.excerpt?.slice(0, 100)}...</p>
              <Link href={`/magazine/${article.slug.toLowerCase()}`} className="text-primary mt-2 inline-block">
                ادامه مطلب
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export const revalidate = 3600; // ISR with 1-hour revalidation