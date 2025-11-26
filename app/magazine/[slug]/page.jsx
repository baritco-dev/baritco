import Image from 'next/image';
import SocialShare from '../../../components/SocialShare';
import { fetchContentBySlug } from '../../../lib/api/content';
import { generateArticleSchema } from '../../../lib/utils/seo';
import SkeletonLoader from '../../../components/SkeletonLoader';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await fetchContentBySlug(slug, 'magazine');
  return {
    metadataBase: new URL('https://bariteco.ir'),
    title: article?.title || 'مقاله - باریتکو',
    description: article?.excerpt || 'جزئیات مقاله در مجله باریتکو',
    openGraph: {
      title: article?.title || 'مقاله - باریتکو',
      description: article?.excerpt || 'جزئیات مقاله در مجله باریتکو',
      images: [article?.image || '/images/default-article.jpg'],
      url: `/magazine/${slug}`,
    },
  };
}

export default async function ArticleDetailPage({ params }) {
  try {
    const { slug } = await params;
    const article = await fetchContentBySlug(slug, 'magazine');

    if (!article) {
      return (
        <div className="container py-8">
          <p className="text-red-500">مقاله یافت نشد</p>
          <SkeletonLoader />
        </div>
      );
    }

    const schema = generateArticleSchema(article);

    return (
      <div className="container py-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <Image
          src={article?.image || '/images/default-article.jpg'}
          alt={article.title}
          width={800}
          height={400}
          className="object-cover rounded-lg mb-4"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 800px"
        />
        <div className="prose prose-sm">
          <p>{article.content}</p>
        </div>
        <SocialShare url={`/magazine/${article.slug}`} title={article.title} />
      </div>
    );
  } catch (error) {
    return (
      <div className="container py-8">
        <p className="text-red-500">خطا در بارگذاری مقاله: {error.message}</p>
        <SkeletonLoader />
      </div>
    );
  }
}

export const revalidate = 3600; // ISR with 1-hour revalidation