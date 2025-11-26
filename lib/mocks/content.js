// /lib/mocks/content.js
export const mockContent = [
  // News
  {
    id: 1,
    slug: 'MiningNews2025',
    title: 'افزایش تولید سنگ آهن در سال 1404',
    excerpt: 'تولید سنگ آهن در ایران با رشد چشمگیری مواجه شده است.',
    content: 'در سال 1404، تولید سنگ آهن در ایران به دلیل سرمایه‌گذاری‌های جدید افزایش یافت...',
    image: '/images/news-1.jpg',
    contentType: 'news',
  },
  {
    id: 2,
    slug: 'TehranMiningExpo',
    title: 'نمایشگاه بین‌المللی معدن تهران',
    excerpt: 'نمایشگاه معدن تهران در آبان 1404 برگزار می‌شود.',
    content: 'نمایشگاه بین‌المللی معدن تهران با حضور شرکت‌های داخلی و خارجی...',
    image: '/images/news-2.jpg',
    contentType: 'news',
  },
  // Magazine
  {
    id: 3,
    slug: 'MiningTrends2025',
    title: 'روندهای جدید در صنعت معدن ۱۴۰۴',
    excerpt: 'بررسی فناوری‌های نوین در استخراج و فرآوری.',
    content: 'در سال ۱۴۰۴، فناوری‌های جدید مانند اتوماسیون و هوش مصنوعی در صنعت معدن...',
    image: '/images/article-1.jpg',
    contentType: 'magazine',
  },
  {
    id: 4,
    slug: 'SustainableMining',
    title: 'معدن‌کاری پایدار',
    excerpt: 'چگونه می‌توان معدن‌کاری را با محیط‌زیست سازگار کرد.',
    content: 'معدن‌کاری پایدار با کاهش اثرات زیست‌محیطی و استفاده از روش‌های نوین...',
    image: '/images/article-2.jpg',
    contentType: 'magazine',
  },
  // Tenders
  {
    id: 5,
    slug: 'IronOreTender',
    title: 'مناقصه استخراج سنگ آهن',
    description: 'مناقصه برای استخراج سنگ آهن در معدن X',
    type: 'مناقصه',
    image: '/images/tender-1.jpg',
    contentType: 'tender',
  },
  {
    id: 6,
    slug: 'EquipmentAuction',
    title: 'مزایده فروش تجهیزات معدنی',
    description: 'مزایده برای فروش تجهیزات معدنی دست دوم',
    type: 'مزایده',
    image: '/images/tender-2.jpg',
    contentType: 'tender',
  },
];

export async function fetchContentByType(contentType) {
  console.log(`fetchContentByType called with contentType: ${contentType}`);
  return mockContent.filter((item) => item.contentType === contentType);
}

export async function fetchContentBySlug(slug, contentType) {
  console.log(`fetchContentBySlug called with slug: ${slug}, contentType: ${contentType}`);
  if (!slug || !contentType) {
    console.log('No slug or contentType provided');
    return null;
  }
  const item = mockContent.find(
    (item) => item.slug.toLowerCase() === slug.toLowerCase() && item.contentType === contentType
  ) || null;
  console.log('Found item:', item);
  return item;
}