import Link from 'next/link';
import Image from 'next/image';

export default function AdCategoryGrid({ categories }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link href={`/ads/${category.id}`} key={category.id}>
          <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition cursor-pointer">
            {category.image && (
              <Image
                src={category.image}
                alt={category.name}
                width={300}
                height={200}
                className="object-cover rounded-lg mb-4"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
              />
            )}
            <h3 className="text-lg font-semibold">{category.name}</h3>
            <p className="text-gray-600">{category.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}