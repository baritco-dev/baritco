export const mockSpecialists = [
  {
    id: 1,
    slug: 'DrMiningExpert',
    name: 'دکتر علی معدنی',
    specialty: 'متخصص معدن',
    bio: 'متخصص با ۲۰ سال تجربه در استخراج و فرآوری مواد معدنی.',
    image: '/images/specialist-1.jpg',
  },
  {
    id: 2,
    slug: 'GeologyConsultant',
    name: 'مهندس رضا زمین‌شناس',
    specialty: 'مشاور زمین‌شناسی',
    bio: 'کارشناس ارشد زمین‌شناسی با تمرکز بر اکتشاف معادن.',
    image: '/images/specialist-2.jpg',
  },
];

export async function fetchSpecialists() {
  return mockSpecialists;
}

export async function fetchSpecialistBySlug(slug) {
  if (!slug) return null;
  return mockSpecialists.find((specialist) => specialist.slug.toLowerCase() === slug.toLowerCase()) || null;
}