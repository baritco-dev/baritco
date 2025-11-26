import Link from 'next/link';
import Image from 'next/image';
import { fetchSpecialists } from '../../../lib/mocks/clinic';
import SkeletonLoader from '../../../components/SkeletonLoader';

export const metadata = {
  title: 'متخصصان - باریتکو',
  description: 'لیست متخصصان کلینیک معدن باریتکو',
};

export default async function SpecialistsPage() {
  const specialists = await fetchSpecialists();

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">متخصصان</h1>
      {!specialists || specialists.length === 0 ? (
        <SkeletonLoader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {specialists.map((specialist) => (
            <div key={specialist.id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
              <Image
                src={specialist.image}
                alt={specialist.name}
                width={300}
                height={200}
                className="object-cover rounded-lg"
                loading="lazy"
              />
              <h3 className="text-lg font-semibold mt-2">{specialist.name}</h3>
              <p className="text-gray-600">{specialist.specialty}</p>
              <Link href={`/clinic/${specialist.slug.toLowerCase()}`} className="text-primary mt-2 inline-block">
                مشاهده پروفایل
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export const revalidate = 3600; // ISR with 1-hour revalidation