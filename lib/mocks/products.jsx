const products = [
  {
    id: 1,
    slug: 'datamine-training',
    title: 'آموزش نرم‌افزار دیتاماین',
    description: 'دوره آموزشی جامع برای نرم‌افزار دیتاماین',
    fullDescription: 'دوره آموزشی جامع برای یادگیری نرم‌افزار دیتاماین جهت استفاده در پروژه‌های معدنی.',
    price: 2000000,
    originalPrice: 2500000,
    discount: true,
    inStock: true,
    stockQuantity: 50,
    rating: 4,
    image: '/images/datamine.jpg',
    images: ['/images/datamine1.jpg', '/images/datamine2.jpg'],
    category: 'laboratory-equipment',
    features: ['مدت زمان: 20 ساعت', 'مدرس: متخصصان با تجربه', 'پشتیبانی آنلاین'],
    tags: ['آموزش', 'نرم‌افزار', 'معدن'],
    brand: 'Baritco Academy',
    variants: [{ size: 'آنلاین', price: 2000000 }, { size: 'حضوری', price: 3000000 }],
  },
  {
    id: 2,
    slug: 'xrd-analysis',
    title: 'آنالیز XRD',
    description: 'خدمات آنالیز XRD برای مواد معدنی',
    fullDescription: 'آنالیز دقیق XRD برای شناسایی ساختار کریستالی مواد معدنی.',
    price: 3000000,
    inStock: true,
    stockQuantity: 100,
    rating: 5,
    image: '/images/xrd.jpg',
    images: ['/images/xrd1.jpg', '/images/xrd2.jpg'],
    category: 'laboratory-equipment',
    features: ['دقت بالا', 'تحویل سریع', 'گزارش جامع'],
    tags: ['آنالیز', 'XRD', 'مواد معدنی'],
    brand: 'LabTech',
    variants: [],
  },
  {
    id: 3,
    slug: 'iron-ore',
    title: 'سنگ آهن',
    description: 'سنگ آهن با خلوص بالا',
    fullDescription: 'سنگ آهن با خلوص بالا مناسب برای صنایع فولادسازی.',
    price: 500000,
    inStock: true,
    stockQuantity: 10,
    rating: 3,
    image: '/images/iron1.jpg',
    images: ['/images/iron2.webp', '/images/iron3.jpg'],
    category: 'metallic-minerals',
    features: ['خلوص: 62%', 'مناسب برای فولادسازی', 'تحویل فوری'],
    tags: ['سنگ آهن', 'فلزی', 'معدن'],
    brand: 'IronMine Co.',
    variants: [{ purity: '62%', price: 500000 }, { purity: '65%', price: 600000 }],
  },
  {
    id: 4,
    slug: 'barite-powder',
    title: 'پودر باریت',
    description: 'پودر باریت با کیفیت بالا برای حفاری',
    fullDescription: 'پودر باریت مناسب برای صنایع نفت و گاز.',
    price: 1500000,
    inStock: true,
    stockQuantity: 300,
    rating: 4.5,
    image: '/images/barite.jpg',
    images: ['/images/barite1.jpg'],
    category: 'non-metallic-minerals',
    features: ['خلوص: 98%', 'اندازه ذرات: 325 مش'],
    tags: ['باریت', 'غیرفلزی', 'حفاری'],
    brand: 'Baritco Minerals',
    variants: [],
  },
  {
    id: 5,
    slug: 'cement-bag',
    title: 'کیسه سیمان',
    description: 'سیمان پرتلند تیپ 2',
    fullDescription: 'سیمان با کیفیت برای ساخت‌وساز.',
    price: 200000,
    inStock: false,
    stockQuantity: 0,
    rating: 4,
    image: '/images/cement.jpg',
    images: [],
    category: 'construction-materials',
    features: ['وزن: 50 کیلوگرم', 'استاندارد: ملی ایران'],
    tags: ['سیمان', 'ساختمانی'],
    brand: 'Cement Factory',
    variants: [{ type: 'تیپ 1', price: 180000 }],
  },
  {
    id: 6,
    slug: 'mining-drill',
    title: 'دریل معدنی',
    description: 'دریل هیدرولیک برای اکتشاف',
    fullDescription: 'دریل قدرتمند برای عملیات معدنی.',
    price: 50000000,
    inStock: true,
    stockQuantity: 10,
    rating: 5,
    image: '/images/drill.jpg',
    images: ['/images/drill1.jpg'],
    category: 'mining-equipment',
    features: ['قدرت: 100 اسب بخار', 'عمق حفاری: 500 متر'],
    tags: ['دریل', 'تجهیزات معدنی'],
    brand: 'DrillTech',
    variants: [],
  },
  {
    id: 7,
    slug: 'excavator',
    title: 'بیل مکانیکی',
    description: 'بیل مکانیکی سنگین',
    fullDescription: 'بیل مکانیکی برای استخراج معادن.',
    price: 200000000,
    inStock: true,
    stockQuantity: 5,
    rating: 4.8,
    image: '/images/excavator.jpg',
    images: [],
    category: 'mining-machinery',
    features: ['ظرفیت: 2 متر مکعب', 'موتور: دیزل'],
    tags: ['بیل', 'ماشین‌آلات'],
    brand: 'HeavyMach',
    variants: [{ size: 'کوچک', price: 150000000 }],
  },
  {
    id: 8,
    slug: 'spectrometer',
    title: 'اسپکترومتر',
    description: 'دستگاه اسپکترومتر برای آنالیز عناصر',
    fullDescription: 'اسپکترومتر پیشرفته برای آزمایشگاه معدنی.',
    price: 10000000,
    inStock: true,
    stockQuantity: 20,
    rating: 4.2,
    image: '/images/spectrometer.jpg',
    images: [],
    category: 'laboratory-equipment',
    features: ['دقت: 0.01%', 'محدوده: عناصر سنگین'],
    tags: ['اسپکترومتر', 'آزمایشگاهی'],
    brand: 'LabInstruments',
    variants: [],
  },
  {
    id: 9,
    slug: 'geological-hammer',
    title: 'چکش زمین‌شناسی',
    description: 'چکش حرفه‌ای برای اکتشاف',
    fullDescription: 'چکش مقاوم برای نمونه‌برداری.',
    price: 500000,
    inStock: true,
    stockQuantity: 100,
    rating: 3.5,
    image: '/images/hammer.jpg',
    images: [],
    category: 'geological-equipment',
    features: ['جنس: فولاد', 'وزن: 1 کیلوگرم'],
    tags: ['چکش', 'زمین‌شناسی'],
    brand: 'GeoTools',
    variants: [],
  },
  {
    id: 10,
    slug: 'copper-ore',
    title: 'سنگ مس',
    description: 'سنگ مس با خلوص متوسط',
    fullDescription: 'سنگ مس مناسب برای ذوب و استخراج.',
    price: 800000,
    inStock: true,
    stockQuantity: 150,
    rating: 4,
    image: '/images/copper.jpg',
    images: [],
    category: 'metallic-minerals',
    features: ['خلوص: 25%', 'مناسب برای صنایع'],
    tags: ['مس', 'فلزی'],
    brand: 'CopperMine',
    variants: [],
  },
];

const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchProducts() {
  await simulateDelay();
  return products;
}

export async function fetchProductBySlug(slug) {
  await simulateDelay();
  if (!slug || typeof slug !== 'string') {
    console.warn('Invalid slug provided to fetchProductBySlug:', slug);
    return null;
  }
  const product = products.find(p => p.slug === slug);
  if (!product) {
    console.warn(`Product with slug "${slug}" not found`);
    return null;
  }
  return product;
}

export async function fetchProductReviews(slug) {
  await simulateDelay();
  if (!slug || typeof slug !== 'string') {
    console.warn('Invalid slug provided to fetchProductReviews:', slug);
    return [];
  }
  return [
    { id: 1, user: 'کاربر 1', comment: 'محصول عالی بود!', rating: 5 },
    { id: 2, user: 'کاربر 2', comment: 'کیفیت خوب ولی قیمت بالاست.', rating: 4 },
    { id: 3, user: 'کاربر 3', comment: 'رضایت‌بخش.', rating: Math.floor(Math.random() * 5) + 1 },
  ];
}

export async function fetchRelatedProducts(slug) {
  await simulateDelay();
  if (!slug || typeof slug !== 'string') {
    console.warn('Invalid slug provided to fetchRelatedProducts:', slug);
    return [];
  }
  const product = await fetchProductBySlug(slug);
  if (!product) return [];
  return products.filter(p => p.category === product.category && p.slug !== slug).slice(0, 4);
}

export async function fetchProductsByCategory(category) {
  await simulateDelay();
  if (!category || typeof category !== 'string') {
    console.warn('Invalid category provided to fetchProductsByCategory:', category);
    return [];
  }
  return products.filter(p => p.category === category);
}

export async function searchProducts(query) {
  await simulateDelay();
  if (!query || typeof query !== 'string') {
    console.warn('Invalid query provided to searchProducts:', query);
    return [];
  }
  const lowerQuery = query.toLowerCase();
  return products.filter(p =>
    p.title.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

export async function fetchProductsByTag(tag) {
  await simulateDelay();
  if (!tag || typeof tag !== 'string') {
    console.warn('Invalid tag provided to fetchProductsByTag:', tag);
    return [];
  }
  return products.filter(p => p.tags.includes(tag));
}

