export const mockOrganizations = [
  {
    id: 1,
    slug: 'MiningCorp',
    name: 'شرکت معدنی پیشرو',
    description: 'تولیدکننده سنگ آهن و مواد معدنی با کیفیت بالا.',
    image: '/images/organization-1.jpg',
    type: 'معدن',
  },
  {
    id: 2,
    slug: 'SteelFactory',
    name: 'کارخانه فولاد آریا',
    description: 'تولید فولاد و محصولات فلزی با فناوری پیشرفته.',
    image: '/images/organization-2.jpg',
    type: 'کارخانه',
  },
];

export async function fetchOrganizations() {
  return mockOrganizations;
}

export async function fetchOrganizationBySlug(slug) {
  if (!slug) return null;
  return mockOrganizations.find((org) => org.slug.toLowerCase() === slug.toLowerCase()) || null;
}