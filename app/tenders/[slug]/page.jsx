import Image from 'next/image';
import SocialShare from '../../../components/SocialShare';
import { fetchContentBySlug } from '../../../lib/api/content';
import { generateTenderSchema } from '../../../lib/utils/seo';
import SkeletonLoader from '../../../components/SkeletonLoader';
import WishlistButton from '../../../components/WishlistButton';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tender = await fetchContentBySlug(slug, 'tender');
  return {
    metadataBase: new URL('https://bariteco.ir'),
    title: tender?.title || 'مناقصات و مزایدات - باریتکو',
    description: tender?.description || 'جزئیات مناقصه یا مزایده در پلتفرم باریتکو',
    openGraph: {
      title: tender?.title || 'مناقصات و مزایدات - باریتکو',
      description: tender?.description || 'جزئیات مناقصه یا مزایده در پلتفرم باریتکو',
      images: [tender?.image || '/images/default-tender.jpg'],
      url: `/tenders/${slug}`,
    },
  };
}

export default async function TenderDetailPage({ params }) {
  try {
    const { slug } = await params;
    const tender = await fetchContentBySlug(slug, 'tender');

    if (!tender) {
      return (
        <div className="container py-8">
          <p className="text-red-500">مناقصه یا مزایده یافت نشد</p>
          <SkeletonLoader />
        </div>
      );
    }

    const schema = generateTenderSchema(tender);

    return (
      <div className="container py-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <h1 className="text-3xl font-bold mb-4">{tender.title}</h1>
        <Image
          src={tender?.image || '/images/default-tender.jpg'}
          alt={tender.title}
          width={800}
          height={400}
          className="object-cover rounded-lg mb-4"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 800px"
        />
        <p className="text-gray-600 mb-2">نوع: {tender.type}</p>
        <div className="prose prose-sm">
          <p>{tender.description}</p>
        </div>
        <div className="flex gap-4 mt-4">
          <WishlistButton item={tender} type="tenders" />
        </div>
        <SocialShare url={`/tenders/${tender.slug}`} title={tender.title} />
      </div>
    );
  } catch (error) {
    return (
      <div className="container py-8">
        <p className="text-red-500">خطا در بارگذاری مناقصه یا مزایده: {error.message}</p>
        <SkeletonLoader />
      </div>
    );
  }
}

export const revalidate = 3600; // ISR with 1-hour revalidation