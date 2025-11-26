import Link from 'next/link';
import Image from 'next/image';

export default function SpecialistCard({ specialist }) {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
      <Image
        src={specialist.image}
        alt={specialist.name}
        width={200}
        height={200}
        className="object-cover rounded-full mx-auto"
        loading="lazy"
      />
      <h3 className="text-lg font-semibold mt-2 text-center">{specialist.name}</h3>
      <p className="text-gray-600 text-center">{specialist.specialty}</p>
      <div className="flex justify-center mt-4">
        <Link href={`/clinic/specialists/${specialist.id}`} className="text-primary">
          مشاهده پروفایل
        </Link>
      </div>
    </div>
  );
}