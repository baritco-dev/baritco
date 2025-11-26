import Image from 'next/image';
import SocialShare from '../../../components/SocialShare';
import { fetchContentBySlug } from '../../../lib/api/content';
import { generateNewsSchema } from '../../../lib/utils/seo';
import SkeletonLoader from '../../../components/SkeletonLoader';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const news = await fetchContentBySlug(slug, 'news');
  return {
    metadataBase: new URL('https://bariteco.ir'),
    title: news?.title || 'اخبار - باریتکو',
    description: news?.excerpt || 'جزئیات خبر در پلتفرم باریتکو',
    openGraph: {
      title: news?.title || 'اخبار - باریتکو',
      description: news?.excerpt || 'جزئیات خبر در پلتفرم باریتکو',
      images: [news?.image || '/images/default-news.jpg'],
      url: `/news/${slug}`,
    },
  };
}

export default async function NewsDetailPage({ params }) {
  try {
    const { slug } = await params;
    const news = await fetchContentBySlug(slug, 'news');

    if (!news) {
      return (
        <div className="container py-8">
          <p className="text-red-500">خبر یافت نشد</p>
          <SkeletonLoader />
        </div>
      );
    }

    const schema = generateNewsSchema(news);

    return (
      <div className="container py-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
        <Image
          src={news?.image || '/images/default-news.jpg'}
          alt={news.title}
          width={800}
          height={400}
          className="object-cover rounded-lg mb-4"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 800px"
        />
        <div className="prose prose-sm">
          <p>{news.content}</p>
        </div>
        <SocialShare url={`/news/${news.slug}`} title={news.title} />
      </div>
    );
  } catch (error) {
    return (
      <div className="container py-8">
        <p className="text-red-500">خطا در بارگذاری خبر: {error.message}</p>
        <SkeletonLoader />
      </div>
    );
  }
}

export const revalidate = 3600; // ISR with 1-hour revalidation