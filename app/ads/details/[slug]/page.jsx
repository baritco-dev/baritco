import Image from 'next/image';
import Link from 'next/link';
import SocialShare from '../../../../components/SocialShare';
import { fetchAdBySlug } from '../../../../lib/mocks/ads';
import { generateAdSchema } from '../../../../lib/utils/seo';
import SkeletonAdDetail from '@/components/ui/SkeletonAdDetail';
import WishlistButton from '../../../../components/WishlistButton';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const ad = await fetchAdBySlug(slug);

  return {
    metadataBase: new URL('https://baritco.ir'),
    title: ad?.title || 'آگهی - باریتکو',
    description: ad?.description || 'جزئیات آگهی در پلتفرم باریتکو',
    openGraph: {
      title: ad?.title || 'آگهی - باریتکو',
      description: ad?.description || 'جزئیات آگهی در پلتفرم باریتکو',
      images: [ad?.image || '/images/default-ad.jpg'],
      url: `/ads/${slug}`,
    },
  };
}

export default async function AdPage({ params }) {
  try {
    const { slug } = await params;
    const ad = await fetchAdBySlug(slug);

    if (!ad) {
      return (
        <div className="container mx-auto px-4 py-8">
          <p className="text-red-500 text-center text-xl">
            آگهی با شناسه {slug} یافت نشد
          </p>
          <SkeletonAdDetail />
        </div>
      );
    }

    const schema = generateAdSchema(ad);

    return (
      <div className="container mx-auto px-4 py-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* تصاویر */}
          <div className="relative">
            {ad.isGolden && (
              <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded z-10">
                ویژه
              </div>
            )}
            <Image
              src={ad.image || '/images/default-ad.jpg'}
              alt={ad.title || 'آگهی بدون عنوان'}
              width={500}
              height={400}
              className="object-cover rounded-lg w-full"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 500px"
            />
            {ad.images && ad.images.length > 0 && (
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {ad.images.map((img, index) => (
                  <Image
                    key={index}
                    src={img || '/images/default-ad.jpg'}
                    alt={`${ad.title || 'آگهی'} ${index + 1}`}
                    width={100}
                    height={80}
                    className="object-cover rounded-lg flex-shrink-0"
                    loading="lazy"
                  />
                ))}
              </div>
            )}
          </div>

          {/* اطلاعات */}
          <div>
            <h1 className="text-3xl font-bold mb-3">{ad.title || 'بدون عنوان'}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {ad.description || 'بدون توضیحات'}
            </p>

            <div className="space-y-3 text-lg border-t border-b py-6">
              <p>تماس: {ad.contact || 'نامشخص'}</p>
              {ad.price > 0 && <p className="text-2xl font-bold text-amber-600">قیمت: {ad.price.toLocaleString('fa-IR')} تومان</p>}
              {ad.location && <p>مکان: {ad.location}</p>}
              {ad.province && <p>استان: {ad.province}</p>}
              {ad.mineralType && <p>نوع ماده معدنی: {ad.mineralType}</p>}
              {ad.quantity && <p>مقدار موجود: {ad.quantity.toLocaleString('fa-IR')} تن</p>}
              {ad.purity && <p>خلوص: {ad.purity}</p>}
              {ad.condition && (
                <p>وضعیت: {ad.condition === 'new' ? 'نو' : ad.condition === 'used' ? 'کارکرده' : 'بازسازی‌شده'}</p>
              )}
            </div>

            {ad.tags?.length > 0 && (
              <div className="mt-6">
                <span className="text-gray-600">تگ‌ها: </span>
                {ad.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="inline-block bg-gray-200 hover:bg-amber-500 hover:text-white transition px-3 py-1 rounded-full text-sm mr-2"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            <div className="flex gap-4 mt-8">
              <WishlistButton item={ad} type="ads" />
              <SocialShare url={`https://baritco.ir/ads/${ad.slug}`} title={ad.title} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`[AdPage] Error:`, error.message);
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500 text-center text-xl">خطا در بارگذاری آگهی</p>
        <SkeletonAdDetail />
      </div>
    );
  }
}

export const revalidate = 3600;








// import Image from 'next/image';
// import Link from 'next/link';
// import SocialShare from '../../../../components/SocialShare';
// import { fetchAdBySlug } from '../../../../lib/mocks/ads';
// import { generateAdSchema } from '../../../../lib/utils/seo';
// import SkeletonLoader from '../../../../components/SkeletonLoader';
// import WishlistButton from '../../../../components/WishlistButton';

// export async function generateMetadata({ params }) {
//   const { slug } = await params;
//   const ad = await fetchAdBySlug(slug);
//   console.log(`[generateMetadata] Slug: ${slug}, Ad found: ${ad ? JSON.stringify(ad) : 'null'}`);
//   return {
//     metadataBase: new URL('https://baritco.ir'),
//     title: ad?.title || 'آگهی - باریتکو',
//     description: ad?.description || 'جزئیات آگهی در پلتفرم باریتکو',
//     openGraph: {
//       title: ad?.title || 'آگهی - باریتکو',
//       description: ad?.description || 'جزئیات آگهی در پلتفرم باریتکو',
//       images: [ad?.image || '/images/default-ad.jpg'],
//       url: `/ads/${slug}`,
//     },
//   };
// }

// export default async function AdPage({ params }) {
//   try {
//     const { slug } = await params;
//     console.log(`[AdPage] Fetching ad for slug: ${slug}`);
//     const ad = await fetchAdBySlug(slug);

//     if (!ad) {
//       console.error(`[AdPage] Ad not found for slug: ${slug}`);
//       return (
//         <div className="container mx-auto px-4 py-8">
//           <p className="text-red-500">آگهی با شناسه {slug} یافت نشد</p>
//           <SkeletonLoader />
//         </div>
//       );
//     }

//     console.log(`[AdPage] Ad found: ${JSON.stringify(ad)}`);
//     const schema = generateAdSchema(ad);

//     return (
//       <div className="container mx-auto px-4 py-8">
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
//         />
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="relative">
//             {ad.isGolden && (
//               <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">
//                 ویژه
//               </div>
//             )}
//             <Image
//               src={ad.image || '/images/default-ad.jpg'}
//               alt={ad.title || 'آگهی بدون عنوان'}
//               width={500}
//               height={400}
//               className="object-cover rounded-lg"
//               loading="lazy"
//               sizes="(max-width: 768px) 100vw, 500px"
//             />
//             <div className="flex gap-2 mt-4">
//               {ad.images?.map((img, index) => (
//                 <Image
//                   key={index}
//                   src={img || '/images/default-ad.jpg'}
//                   alt={`${ad.title || 'آگهی'} ${index + 1}`}
//                   width={100}
//                   height={80}
//                   className="object-cover rounded-lg"
//                   loading="lazy"
//                   sizes="100px"
//                 />
//               ))}
//             </div>
//           </div>
//           <div>
//             <h1 className="text-3xl font-bold">{ad.title || 'بدون عنوان'}</h1>
//             <p className="text-gray-600 mt-2">{ad.description || 'بدون توضیحات'}</p>
//             <div className="mt-4 space-y-2">
//               <p>تماس: {ad.contact || 'نامشخص'}</p>
//               {ad.price > 0 && <p>قیمت: {ad.price.toLocaleString('fa-IR')} تومان</p>}
//               {ad.location && <p>مکان: {ad.location}</p>}
//               {ad.province && <p>استان: {ad.province}</p>}
//               {ad.mineralType && <p>نوع ماده معدنی: {ad.mineralType}</p>}
//               {ad.reserves && <p>ذخایر تخمینی: {ad.reserves.toLocaleString('fa-IR')} تن</p>}
//               {ad.quantity && <p>مقدار موجود: {ad.quantity.toLocaleString('fa-IR')} تن</p>}
//               {ad.purity && <p>خلوص: {ad.purity}</p>}
//               {ad.area && <p>مساحت: {ad.area.toLocaleString('fa-IR')} هکتار</p>}
//               {ad.condition && (
//                 <p>وضعیت: {ad.condition === 'new' ? 'نو' : ad.condition === 'used' ? 'کارکرده' : 'بازسازی‌شده'}</p>
//               )}
//               {ad.year && <p>سال ساخت: {ad.year}</p>}
//               {ad.jobType && (
//                 <p>نوع شغل: {ad.jobType === 'full-time' ? 'تمام‌وقت' : ad.jobType === 'part-time' ? 'پاره‌وقت' : 'قراردادی'}</p>
//               )}
//               {ad.experienceRequired && <p>تجربه مورد نیاز: {ad.experienceRequired} سال</p>}
//               {ad.investmentAmount && <p>مبلغ سرمایه‌گذاری: {ad.investmentAmount.toLocaleString('fa-IR')} تومان</p>}
//               {ad.partnershipType && (
//                 <p>نوع مشارکت: {ad.partnershipType === 'equity' ? 'سهامی' : 'وام'}</p>
//               )}
//               {ad.courseDuration && <p>مدت دوره: {ad.courseDuration}</p>}
//               {ad.details && Object.keys(ad.details).length > 0 && (
//                 <div>
//                   <p>جزئیات اضافی:</p>
//                   <ul className="list-disc pl-5">
//                     {Object.entries(ad.details).map(([key, value]) => (
//                       <li key={key}>{key}: {value}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//               {ad.tags?.length > 0 && (
//                 <div className="mt-4">
//                   <span className="text-gray-600">تگ‌ها: </span>
//                   {ad.tags.map((tag) => (
//                     <Link
//                       key={tag}
//                       href={`/tags/${encodeURIComponent(tag)}`}
//                       className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-amber-100 px-2 py-1 rounded mr-2 hover:bg-amber-500 hover:text-white transition"
//                     >
//                       {tag}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className="flex gap-4 mt-4">
//               <WishlistButton item={ad} type="ads" />
//               <SocialShare url={`/ads/${ad.slug}`} title={ad.title} />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   } catch (error) {
//     console.error(`[AdPage] Error loading ad for slug ${slug}:`, error.message);
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <p className="text-red-500">خطا در بارگذاری آگهی: {error.message}</p>
//         <SkeletonLoader />
//       </div>
//     );
//   }
// }

// export const revalidate = 3600; // ISR with 1-hour revalidation



