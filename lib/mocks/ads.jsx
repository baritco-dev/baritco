const adCategories = [
  {
    id: 'metal-mines',
    name: 'معادن فلزی',
    slug: 'metal-mines',
    description: 'شامل معادن طلا، آهن، مس و ...',
    image: '/images/categories/metal-mines.jpg',
  },
  {
    id: 'non-metal-mines',
    name: 'معادن غیرفلزی',
    slug: 'non-metal-mines',
    description: 'شامل سیلیس، بنتونیت و ...',
    image: '/images/categories/non-metal-mines.jpg',
  },
  {
    id: 'metal-minerals',
    name: 'مواد معدنی فلزی',
    slug: 'metal-minerals',
    description: 'شامل طلا، مس، آهن و ...',
    image: '/images/categories/metal-minerals.jpg',
  },
  {
    id: 'non-metal-minerals',
    name: 'مواد معدنی غیرفلزی',
    slug: 'non-metal-minerals',
    description: 'شامل سیلیس، بنتونیت و ...',
    image: '/images/categories/non-metal-minerals.jpg',
  },
  {
    id: 'decorative-stones',
    name: 'سنگ‌های ساختمانی/تزئینی',
    slug: 'decorative-stones',
    description: 'شامل تراورتن، مرمر و ...',
    image: '/images/categories/decorative-stones.jpg',
  },
  {
    id: 'gemstones',
    name: 'سنگ‌های زینتی و کلکسیونی',
    slug: 'gemstones',
    description: 'سنگ‌های زینتی و کلکسیونی',
    image: '/images/categories/gemstones.jpg',
  },
  {
    id: 'construction-materials',
    name: 'مصالح ساختمانی',
    slug: 'construction-materials',
    description: 'شامل شن و ماسه، سنگ لاشه و ...',
    image: '/images/categories/construction-materials.jpg',
  },
  {
    id: 'equipment',
    name: 'تجهیزات',
    slug: 'equipment',
    description: 'شامل تجهیزات معدنی، حفاری و ...',
    image: '/images/categories/equipment.jpg',
  },
  {
    id: 'machinery',
    name: 'ماشین‌آلات',
    slug: 'machinery',
    description: 'شامل ماشین‌آلات حفاری و ...',
    image: '/images/categories/machinery.jpg',
  },
  {
    id: 'services-consulting',
    name: 'خدمات و مشاوره',
    slug: 'services-consulting',
    description: 'شامل زمین‌شناسی، حفاری و ...',
    image: '/images/categories/services-consulting.jpg',
  },
  {
    id: 'investment',
    name: 'مشارکت و سرمایه‌گذاری',
    slug: 'investment',
    description: 'مشارکت و سرمایه‌گذاری',
    image: '/images/categories/investment.jpg',
  },
  {
    id: 'jobs',
    name: 'استخدام و کاریابی',
    slug: 'jobs',
    description: 'استخدام و کاریابی',
    image: '/images/categories/jobs.jpg',
  },
  {
    id: 'education',
    name: 'آموزش',
    slug: 'education',
    description: 'آموزش‌های معدنی و صنعتی',
    image: '/images/categories/education.jpg',
  },
];

const mockAds = [
  {
    id: 1,
    slug: 'ironore',
    title: 'فروش سنگ آهن با خلوص بالا',
    name: 'فروش سنگ آهن',
    description: 'فروش سنگ آهن با خلوص 62% مناسب برای صنایع فولادسازی',
    category: 'metal-minerals',
    isGolden: true,
    price: 500000,
    priceUnit: 'تومان/تن',
    mineralType: 'سنگ آهن',
    grade: '62%',
    quantity: '10000 تن',
    location: 'یزد، ایران',
    deliveryMethod: 'FOB',
    certifications: ['ISO 9001'],
    paymentTerms: 'نقدی',
    minOrder: '100 تن',
    contact: '09123456789',
    contactEmail: 'contact@ironoreco.com',
    owner: 'شرکت معدنی یزد',
    ownerType: 'معدن',
    image: '/images/ironore-ad.jpg',
    images: ['/images/ironore1.jpg', '/images/ironore2.jpg'],
    videoUrl: null,
    tags: ['iron', 'metal', 'ore'],
    createdAt: '2025-07-01T10:00:00Z',
    updatedAt: '2025-08-01T10:00:00Z',
    status: 'فعال',
    isNegotiable: true,
    expiryDate: '2025-12-31T23:59:59Z',
    views: 1200,
    priority: 1,
  },
  {
    id: 2,
    slug: 'coppermine',
    title: 'معدن مس با ذخیره بالا',
    name: 'معدن مس',
    description: 'معدن مس با ذخیره 1 میلیون تن و خلوص 2.5% مناسب برای استخراج صنعتی',
    category: 'metal-mines',
    isGolden: true,
    price: 0,
    priceUnit: null,
    mineralType: 'مس',
    grade: '2.5%',
    quantity: '1000000 تن',
    location: 'کرمان، ایران',
    deliveryMethod: 'FOB',
    certifications: ['ISO 9001'],
    paymentTerms: 'نقدی',
    minOrder: null,
    contact: '09129876543',
    contactEmail: 'info@coppermineco.com',
    owner: 'معدن مس کرمان',
    ownerType: 'معدن',
    image: '/images/coppermine-ad.jpg',
    images: ['/images/coppermine1.jpg', '/images/coppermine2.jpg'],
    videoUrl: 'https://www.youtube.com/watch?v=coppermine',
    tags: ['copper', 'metal', 'mine'],
    createdAt: '2025-07-02T12:00:00Z',
    updatedAt: '2025-08-02T12:00:00Z',
    status: 'فعال',
    isNegotiable: false,
    expiryDate: '2026-01-01T23:59:59Z',
    views: 800,
    priority: 2,
  },
  {
    id: 3,
    slug: 'drillmachine',
    title: 'فروش دستگاه حفاری پیشرفته',
    name: 'دستگاه حفاری',
    description: 'دستگاه حفاری مدل 2023 با گارانتی، مناسب برای پروژه‌های معدنی',
    category: 'equipment',
    isGolden: false,
    price: 150000000,
    priceUnit: 'تومان',
    condition: 'new',
    year: 2023,
    quantity: '1 دستگاه',
    location: 'تهران، ایران',
    deliveryMethod: 'تحویل در محل',
    certifications: ['ISO 9001'],
    paymentTerms: 'نقدی',
    minOrder: '1 دستگاه',
    contact: '09122334455',
    contactEmail: 'sales@drillco.com',
    owner: 'شرکت تجهیزات معدنی تهران',
    ownerType: 'شرکت',
    image: '/images/drill-ad.jpg',
    images: ['/images/drill1.jpg', '/images/drill2.jpg'],
    videoUrl: null,
    tags: ['drill', 'equipment', 'mining'],
    createdAt: '2025-08-03T09:00:00Z',
    updatedAt: '2025-08-03T09:00:00Z',
    status: 'فعال',
    isNegotiable: true,
    expiryDate: '2026-01-31T23:59:59Z',
    views: 1500,
    priority: 3,
  },
  {
    id: 4,
    slug: 'silicaselling',
    title: 'فروش سیلیس با کیفیت برای شیشه‌سازی',
    name: 'فروش سیلیس',
    description: 'فروش سیلیس با خلوص 99%، مناسب برای صنایع شیشه‌سازی و سرامیک',
    category: 'non-metal-minerals',
    isGolden: false,
    price: 300000,
    priceUnit: 'تومان/تن',
    mineralType: 'سیلیس',
    grade: '99%',
    quantity: '20000 تن',
    location: 'همدان، ایران',
    deliveryMethod: 'FOB',
    certifications: ['ISO 9001'],
    paymentTerms: 'نقدی',
    minOrder: '200 تن',
    contact: '09126543210',
    contactEmail: 'info@silicaco.com',
    owner: 'معدن سیلیس همدان',
    ownerType: 'معدن',
    image: '/images/silica-ad.jpg',
    images: ['/images/silica1.jpg', '/images/silica2.jpg'],
    videoUrl: null,
    tags: ['silica', 'non-metal', 'glass', 'ceramic'],
    createdAt: '2025-07-04T15:00:00Z',
    updatedAt: '2025-08-04T15:00:00Z',
    status: 'فعال',
    isNegotiable: true,
    expiryDate: '2025-12-15T23:59:59Z',
    views: 600,
    priority: 4,
  },
];

/**
 * دریافت تمام آگهی‌ها
 * @returns {Promise<Array>} آرایه‌ای از تمام آگهی‌ها
 */
export async function fetchAds() {
  return [...mockAds];
}

/**
 * دریافت آگهی‌ها بر اساس دسته‌بندی
 * @param {string} category - شناسه دسته‌بندی (مثلاً 'metal-minerals')
 * @returns {Promise<Array>} آرایه‌ای از آگهی‌های فیلترشده
 */
export async function fetchAdsByCategory(category) {
  if (!category) {
    console.warn('[fetchAdsByCategory] No category provided');
    return [];
  }

  const normalizedCategory = category.toLowerCase();
  console.log(`[fetchAdsByCategory] Fetching ads for category: ${normalizedCategory}`);
  const filteredAds = mockAds.filter((ad) => ad.category.toLowerCase() === normalizedCategory);
  console.log(`[fetchAdsByCategory] Found ${filteredAds.length} ads for category: ${normalizedCategory}`);
  return [...filteredAds];
}

/**
 * دریافت آگهی بر اساس slug
 * @param {string} slug - شناسه یکتا (slug) آگهی
 * @returns {Promise<Object|null>} شیء آگهی یا null اگر یافت نشد
 */
export async function fetchAdBySlug(slug) {
  if (!slug) {
    console.warn('[fetchAdBySlug] No slug provided');
    return null;
  }

  const normalizedSlug = slug.toLowerCase();
  console.log(`[fetchAdBySlug] Fetching ad for slug: ${normalizedSlug}`);
  const ad = mockAds.find((ad) => ad.slug.toLowerCase() === normalizedSlug) || null;
  if (!ad) {
    console.warn(`[fetchAdBySlug] Ad not found for slug: ${normalizedSlug}`);
  } else {
    console.log(`[fetchAdBySlug] Ad found: ${JSON.stringify(ad)}`);
  }
  return ad ? { ...ad } : null;
}

/**
 * دریافت تمام دسته‌بندی‌های آگهی‌ها
 * @returns {Promise<Array>} آرایه‌ای از دسته‌بندی‌ها
 */
export async function fetchAdCategories() {
  return [...adCategories];
}

/**
 * دریافت آگهی‌ها بر اساس تگ
 * @param {string} tag - تگ مورد نظر (مثلاً 'metal')
 * @returns {Promise<Array>} آرایه‌ای از آگهی‌های فیلترشده
 */
export async function fetchAdsByTag(tag) {
  if (!tag || typeof tag !== 'string') {
    console.warn('[fetchAdsByTag] Invalid tag provided:', tag);
    return [];
  }
  console.log(`[fetchAdsByTag] Fetching ads for tag: ${tag}`);
  const filteredAds = mockAds.filter((ad) => ad.tags?.includes(tag));
  console.log(`[fetchAdsByTag] Found ${filteredAds.length} ads for tag: ${tag}`);
  return [...filteredAds];
}


