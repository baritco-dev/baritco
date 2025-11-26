import Image from 'next/image';
import SocialShare from '../../../components/SocialShare';
import { fetchSpecialistBySlug } from '../../../lib/mocks/clinic';
import { generateSpecialistSchema } from '../../../lib/utils/seo';
import SkeletonLoader from '../../../components/SkeletonLoader';
import WishlistButton from '../../../components/WishlistButton';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const specialist = await fetchSpecialistBySlug(slug);
  return {
    metadataBase: new URL('https://bariteco.ir'),
    title: specialist?.name || 'متخصص - باریتکو',
    description: specialist?.bio || 'پروفایل متخصص در کلینیک معدن باریتکو',
    openGraph: {
      title: specialist?.name || 'متخصص - باریتکو',
      description: specialist?.bio || 'پروفایل متخصص در کلینیک معدن باریتکو',
      images: [specialist?.image || '/images/default-specialist.jpg'],
      url: `/clinic/${slug}`,
    },
  };
}

export default async function SpecialistDetailPage({ params }) {
  try {
    const { slug } = await params;
    const specialist = await fetchSpecialistBySlug(slug);

    if (!specialist) {
      return (
        <div className="container py-8">
          <p className="text-red-500">متخصص یافت نشد</p>
          <SkeletonLoader />
        </div>
      );
    }

    const schema = generateSpecialistSchema(specialist);

    return (
      <div className="container py-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <h1 className="text-3xl font-bold mb-4">{specialist.name}</h1>
        <Image
          src={specialist?.image || '/images/default-specialist.jpg'}
          alt={specialist.name}
          width={800}
          height={400}
          className="object-cover rounded-lg mb-4"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 800px"
        />
        <p className="text-gray-600 mb-2">تخصص: {specialist.specialty}</p>
        <div className="prose prose-sm">
          <p>{specialist.bio}</p>
        </div>
        <div className="flex gap-4 mt-4">
          <WishlistButton item={specialist} type="specialists" />
        </div>
        <SocialShare url={`/clinic/${specialist.slug}`} title={specialist.name} />
      </div>
    );
  } catch (error) {
    return (
      <div className="container py-8">
        <p className="text-red-500">خطا در بارگذاری پروفایل متخصص: {error.message}</p>
        <SkeletonLoader />
      </div>
    );
  }
}

export const revalidate = 3600; // ISR with 1-hour revalidation




// import Image from 'next/image';
// import SocialShare from '../../../components/SocialShare';
// import { fetchSpecialistBySlug } from '../../../lib/mocks/clinic';
// import { generateSpecialistSchema } from '../../../lib/utils/seo';
// import SkeletonLoader from '../../../components/SkeletonLoader';
// import WishlistButton from '../../../components/WishlistButton';

// export async function generateMetadata({ params }) {
//   const { slug } = await params; // Await params to get slug
//   const specialist = await fetchSpecialistBySlug(slug);
//   return {
//     metadataBase: new URL('https://bariteco.ir'), // Set metadataBase to resolve warning
//     title: specialist?.name || 'متخصص - باریتکو',
//     description: specialist?.bio || 'پروفایل متخصص در کلینیک معدن باریتکو',
//     openGraph: {
//       title: specialist?.name || 'متخصص - باریتکو',
//       description: specialist?.bio || 'پروفایل متخصص در کلینیک معدن باریتکو',
//       images: [specialist?.image || '/images/default-specialist.jpg'],
//       url: `/clinic/${slug}`,
//     },
//   };
// }

// export default async function SpecialistDetailPage({ params }) {
//   try {
//     const { slug } = await params; // Await params to get slug
//     const specialist = await fetchSpecialistBySlug(slug);

//     if (!specialist) {
//       return (
//         <div className="container py-8">
//           <p className="text-red-500">متخصص یافت نشد</p>
//           <SkeletonLoader />
//         </div>
//       );
//     }

//     const schema = generateSpecialistSchema(specialist);

//     return (
//       <div className="container py-8">
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
//         />
//         <h1 className="text-3xl font-bold mb-4">{specialist.name}</h1>
//         <Image
//           src={specialist.image}
//           alt={specialist.name}
//           width={800}
//           height={400}
//           className="object-cover rounded-lg mb-4"
//           loading="lazy"
//           sizes="(max-width: 768px) 100vw, 800px"
//         />
//         <p className="text-gray-600 mb-2">تخصص: {specialist.specialty}</p>
//         <div className="prose prose-sm">
//           <p>{specialist.bio}</p>
//         </div>
//         <div className="flex gap-4 mt-4">
//           <WishlistButton item={specialist} type="specialists" />
//         </div>
//         <SocialShare url={`https://bariteco.ir/clinic/${specialist.slug}`} title={specialist.name} />
//       </div>
//     );
//   } catch (error) {
//     return (
//       <div className="container py-8">
//         <p className="text-red-500">خطا در بارگذاری پروفایل متخصص: {error.message}</p>
//         <SkeletonLoader />
//       </div>
//     );
//   }
// }

// export const revalidate = 3600; // ISR with 1-hour revalidation

