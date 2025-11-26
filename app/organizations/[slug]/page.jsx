import Image from 'next/image';
import SocialShare from '../../../components/SocialShare';
import { fetchOrganizationBySlug } from '../../../lib/mocks/organizations';
import { generateOrganizationSchema } from '../../../lib/utils/seo';
import SkeletonLoader from '../../../components/SkeletonLoader';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const organization = await fetchOrganizationBySlug(slug);
  return {
    metadataBase: new URL('https://bariteco.ir'),
    title: organization?.name || 'شرکت/معدن - باریتکو',
    description: organization?.description || 'جزئیات شرکت یا معدن در پلتفرم باریتکو',
    openGraph: {
      title: organization?.name || 'شرکت/معدن - باریتکو',
      description: organization?.description || 'جزئیات شرکت یا معدن در پلتفرم باریتکو',
      images: [organization?.image || '/images/default-organization.jpg'],
      url: `/organizations/${slug}`,
    },
  };
}

export default async function OrganizationDetailPage({ params }) {
  try {
    const { slug } = await params;
    const organization = await fetchOrganizationBySlug(slug);

    if (!organization) {
      return (
        <div className="container py-8">
          <p className="text-red-500">شرکت یا معدن یافت نشد</p>
          <SkeletonLoader />
        </div>
      );
    }

    const schema = generateOrganizationSchema(organization);

    return (
      <div className="container py-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <h1 className="text-3xl font-bold mb-4">{organization.name}</h1>
        <Image
          src={organization?.image || '/images/default-organization.jpg'}
          alt={organization.name}
          width={800}
          height={400}
          className="object-cover rounded-lg mb-4"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 800px"
        />
        <p className="text-gray-600 mb-2">نوع: {organization.type}</p>
        <div className="prose prose-sm">
          <p>{organization.description}</p>
        </div>
        <SocialShare url={`/organizations/${organization.slug}`} title={organization.name} />
      </div>
    );
  } catch (error) {
    return (
      <div className="container py-8">
        <p className="text-red-500">خطا در بارگذاری شرکت یا معدن: {error.message}</p>
        <SkeletonLoader />
      </div>
    );
  }
}

export const revalidate = 3600; // ISR with 1-hour revalidation




// import Image from 'next/image';
// import SocialShare from '../../../components/SocialShare';
// import { fetchOrganizationBySlug } from '../../../lib/mocks/organizations';
// import { generateOrganizationSchema } from '../../../lib/utils/seo';
// import SkeletonLoader from '../../../components/SkeletonLoader';

// export async function generateMetadata({ params }) {
//   const organization = await fetchOrganizationBySlug(params.slug);
//   return {
//     title: organization?.name || 'شرکت/معدن - باریتکو',
//     description: organization?.description || 'جزئیات شرکت یا معدن در پلتفرم باریتکو',
//     openGraph: {
//       title: organization?.name || 'شرکت/معدن - باریتکو',
//       description: organization?.description || 'جزئیات شرکت یا معدن در پلتفرم باریتکو',
//       images: [organization?.image || '/images/default-organization.jpg'],
//       url: `https://bariteco.ir/organizations/${params.slug}`,
//     },
//   };
// }

// export default async function OrganizationDetailPage({ params }) {
//   try {
//     const organization = await fetchOrganizationBySlug(params.slug);

//     if (!organization) {
//       return (
//         <div className="container py-8">
//           <p className="text-red-500">شرکت یا معدن یافت نشد</p>
//           <SkeletonLoader />
//         </div>
//       );
//     }

//     const schema = generateOrganizationSchema(organization);

//     return (
//       <div className="container py-8">
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
//         />
//         <h1 className="text-3xl font-bold mb-4">{organization.name}</h1>
//         <Image
//           src={organization.image}
//           alt={organization.name}
//           width={800}
//           height={400}
//           className="object-cover rounded-lg mb-4"
//           loading="lazy"
//           sizes="(max-width: 768px) 100vw, 800px"
//         />
//         <p className="text-gray-600 mb-2">نوع: {organization.type}</p>
//         <div className="prose prose-sm">
//           <p>{organization.description}</p>
//         </div>
//         <SocialShare url={`https://bariteco.ir/organizations/${organization.slug}`} title={organization.name} />
//       </div>
//     );
//   } catch (error) {
//     return (
//       <div className="container py-8">
//         <p className="text-red-500">خطا در بارگذاری شرکت یا معدن: {error.message}</p>
//         <SkeletonLoader />
//       </div>
//     );
//   }
// }

// export const revalidate = 3600; // ISR with 1-hour revalidation