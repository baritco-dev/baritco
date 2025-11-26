import Link from 'next/link';
import Image from 'next/image';
import { fetchOrganizations } from '../../lib/mocks/organizations';
import SkeletonLoader from '../../components/SkeletonLoader';

export const metadata = {
  title: 'شرکت‌ها و معادن - باریتکو',
  description: 'لیست شرکت‌ها، معادن و کارخانه‌های معدنی در پلتفرم باریتکو',
};

export default async function OrganizationsPage() {
  const organizations = await fetchOrganizations();

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">شرکت‌ها و معادن</h1>
      {!organizations || organizations.length === 0 ? (
        <SkeletonLoader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {organizations.map((org) => (
            <div key={org.id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
              <Image
                src={org.image}
                alt={org.name}
                width={300}
                height={200}
                className="object-cover rounded-lg"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 300px"
              />
              <h3 className="text-lg font-semibold mt-2">{org.name}</h3>
              <p className="text-gray-600">{org.description.slice(0, 100)}...</p>
              <p className="text-sm text-gray-500">نوع: {org.type}</p>
              <Link href={`/organizations/${org.slug.toLowerCase()}`} className="text-primary mt-2 inline-block">
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