import { fetchProductBySlug } from '../api/products';
import { fetchAdBySlug } from '../api/ads';
import { fetchContentBySlug } from '../api/content';

// تعریف نام‌های ثابت برای مسیرهای استاتیک
const staticLabels = {
  about: 'درباره ما',
  contactUs: 'تماس با ما',
  rules: 'قوانین',
  team: 'تیم باریتکو',
  wishlist: 'علاقه‌مندی‌ها',
  magazine: 'مجله',
  news: 'اخبار',
  tenders: 'مناقصات و مزایدات',
  shop: 'فروشگاه',
  ads: 'آگهی‌ها',
  clinic: 'کلینیک',
  organizations: 'شرکت‌ها',
  products: 'محصولات',
  specialists: 'متخصصان',
  booking: 'رزرو',
  create: 'ثبت آگهی',
  cart: 'سبد خرید',
  checkout: 'تسویه حساب',
  'become-seller': 'فروشنده شو',
  profile: 'پروفایل',
  login: 'ورود',
  register: 'ثبت‌نام',
};

// تعریف نام‌های خوانا برای دسته‌بندی‌های محصولات
const categoryLabels = {
  'laboratory-equipment': 'تجهیزات آزمایشگاهی',
  'metallic-minerals': 'مواد معدنی فلزی',
};

// تعریف نام‌های خوانا برای دسته‌بندی‌های آگهی‌ها
const adCategoryLabels = {
  'metal-mines': 'معادن فلزی',
  'non-metal-mines': 'معادن غیرفلزی',
  'metal-minerals': 'مواد معدنی فلزی',
  'non-metal-minerals': 'مواد معدنی غیرفلزی',
  'decorative-stones': 'سنگ‌های ساختمانی/تزئینی',
  'gemstones': 'سنگ‌های زینتی و کلکسیونی',
  'construction-materials': 'مصالح ساختمانی',
  'equipment': 'تجهیزات',
  'machinery': 'ماشین‌آلات',
  'services-consulting': 'خدمات و مشاوره',
  'investment': 'مشارکت و سرمایه‌گذاری',
  'jobs': 'استخدام و کاریابی',
  'education': 'آموزش',
  'others': 'سایر',
};

// تعریف slugهای خاص از next.config.js
const specialSlugs = {
  magazine: ['miningtrends2025', 'sustainablemining'],
  news: ['miningnews2025', 'tehranminingexpo'],
  tenders: ['ironoretender', 'equipmentauction'],
  ads: ['ironoreselling', 'copperoreselling', 'goldminingequipment', 'silicaselling'],
};

export const getBreadcrumbItems = async (pathname) => {
  const segments = pathname.split('/').filter(segment => segment);
  const breadcrumbItems = [{ label: 'خانه', href: '/' }];
  let currentPath = '';

  // بررسی مسیرهای بازنویسی‌شده برای محصولات
  const isRewrittenProduct = !segments.includes('shop') && 
                             !specialSlugs.magazine.includes(segments[0]) && 
                             !specialSlugs.news.includes(segments[0]) && 
                             !specialSlugs.tenders.includes(segments[0]) && 
                             !specialSlugs.ads.includes(segments[0]) && 
                             !staticLabels[segments[0]];

  if (isRewrittenProduct) {
    const slug = segments[0];
    const product = await fetchProductBySlug(slug);
    if (product) {
      breadcrumbItems.push(
        { label: 'فروشگاه', href: '/shop' },
        { label: categoryLabels[product.category] || product.category.replace(/-/g, ' '), href: `/shop/${product.category}` },
        { label: product.title, href: `/${slug}`, isLast: true }
      );
      return breadcrumbItems;
    }
  }

  // بررسی مسیرهای جزئیات آگهی (/ads/[slug])
  const isAdDetail = segments[0] === 'ads' && segments.length === 2;
  if (isAdDetail) {
    const slug = segments[1];
    const ad = await fetchAdBySlug(slug);
    if (ad) {
      breadcrumbItems.push(
        { label: 'آگهی‌ها', href: '/ads' },
        { label: adCategoryLabels[ad.category] || ad.category.replace(/-/g, ' '), href: `/ads/${ad.category}` },
        { label: ad.title, href: `/ads/${slug}`, isLast: true }
      );
      return breadcrumbItems;
    }
  }

  // بررسی مسیرهای بازنویسی‌شده برای مقالات (/miningtrends2025)
  if (specialSlugs.magazine.includes(segments[0])) {
    const slug = segments[0];
    const article = await fetchContentBySlug(slug, 'magazine');
    if (article) {
      breadcrumbItems.push(
        { label: 'مجله', href: '/magazine' },
        { label: article.title, href: `/magazine/${slug}`, isLast: true }
      );
      return breadcrumbItems;
    }
  }

  // بررسی مسیرهای بازنویسی‌شده برای اخبار (/miningnews2025)
  if (specialSlugs.news.includes(segments[0])) {
    const slug = segments[0];
    const news = await fetchContentBySlug(slug, 'news');
    if (news) {
      breadcrumbItems.push(
        { label: 'اخبار', href: '/news' },
        { label: news.title, href: `/news/${slug}`, isLast: true }
      );
      return breadcrumbItems;
    }
  }

  // بررسی مسیرهای بازنویسی‌شده برای مناقصات (/ironoretender)
  if (specialSlugs.tenders.includes(segments[0])) {
    const slug = segments[0];
    const tender = await fetchContentBySlug(slug, 'tender');
    if (tender) {
      breadcrumbItems.push(
        { label: 'مناقصات و مزایدات', href: '/tenders' },
        { label: tender.title, href: `/tenders/${slug}`, isLast: true }
      );
      return breadcrumbItems;
    }
  }

  // مدیریت مسیرهای استاندارد
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    // مدیریت مسیرهای استاتیک
    if (staticLabels[segment]) {
      breadcrumbItems.push({
        label: staticLabels[segment],
        href: currentPath,
        isLast,
      });
    } else {
      // مدیریت مسیرهای داینامیک
      let label = segment.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
      breadcrumbItems.push({
        label: adCategoryLabels[segment] || categoryLabels[segment] || label,
        href: currentPath,
        isLast,
      });
    }
  });

  return breadcrumbItems;
};

// تابع برای دریافت نام‌های داینامیک
export const getDynamicBreadcrumbLabel = async (segment, segmentType) => {
  if (segmentType === 'product') {
    const product = await fetchProductBySlug(segment);
    return product?.title || segment.replace(/-/g, ' ');
  }
  if (segmentType === 'ad') {
    const ad = await fetchAdBySlug(segment);
    return ad?.title || segment.replace(/-/g, ' ');
  }
  if (segmentType === 'article') {
    const article = await fetchContentBySlug(segment, 'magazine');
    return article?.title || segment.replace(/-/g, ' ');
  }
  if (segmentType === 'news') {
    const news = await fetchContentBySlug(segment, 'news');
    return news?.title || segment.replace(/-/g, ' ');
  }
  if (segmentType === 'tender') {
    const tender = await fetchContentBySlug(segment, 'tender');
    return tender?.title || segment.replace(/-/g, ' ');
  }
  return adCategoryLabels[segment] || categoryLabels[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
};





// import { fetchProductBySlug } from '../api/products';
// import { fetchAdBySlug } from '../api/ads';
// import { fetchArticleBySlug } from '../api/magazine';
// import { fetchNewsBySlug } from '../api/news';
// import { fetchTenderBySlug } from '../api/tenders';

// // تعریف نام‌های ثابت برای مسیرهای استاتیک
// const staticLabels = {
//   about: 'درباره ما',
//   contactUs: 'تماس با ما',
//   rules: 'قوانین',
//   team: 'تیم باریتکو',
//   wishlist: 'علاقه‌مندی‌ها',
//   magazine: 'مجله',
//   news: 'اخبار',
//   tenders: 'مناقصات و مزایدات',
//   shop: 'فروشگاه',
//   ads: 'آگهی‌ها',
//   clinic: 'کلینیک',
//   organizations: 'شرکت‌ها',
//   products: 'محصولات',
//   specialists: 'متخصصان',
//   booking: 'رزرو',
//   create: 'ثبت آگهی',
//   cart: 'سبد خرید',
//   checkout: 'تسویه حساب',
//   'become-seller': 'فروشنده شو',
//   profile: 'پروفایل',
//   login: 'ورود',
//   register: 'ثبت‌نام',
// };

// // تعریف نام‌های خوانا برای دسته‌بندی‌های محصولات
// const categoryLabels = {
//   'laboratory-equipment': 'تجهیزات آزمایشگاهی',
//   'metallic-minerals': 'مواد معدنی فلزی',
// };

// // تعریف نام‌های خوانا برای دسته‌بندی‌های آگهی‌ها
// const adCategoryLabels = {
//   'metal-mines': 'معادن فلزی',
//   'non-metal-mines': 'معادن غیرفلزی',
//   'metal-minerals': 'مواد معدنی فلزی',
//   'non-metal-minerals': 'مواد معدنی غیرفلزی',
//   'decorative-stones': 'سنگ‌های ساختمانی/تزئینی',
//   'gemstones': 'سنگ‌های زینتی و کلکسیونی',
//   'construction-materials': 'مصالح ساختمانی',
//   'equipment': 'تجهیزات',
//   'machinery': 'ماشین‌آلات',
//   'services-consulting': 'خدمات و مشاوره',
//   'investment': 'مشارکت و سرمایه‌گذاری',
//   'jobs': 'استخدام و کاریابی',
//   'education': 'آموزش',
//   'others': 'سایر',
// };

// // تعریف slugهای خاص از next.config.js
// const specialSlugs = {
//   magazine: ['miningtrends2025', 'sustainablemining'],
//   news: ['miningnews2025', 'tehranminingexpo'],
//   tenders: ['ironoretender', 'equipmentauction'],
//   ads: ['ironoreselling', 'copperoreselling', 'goldminingequipment', 'silicaselling'],
// };

// export const getBreadcrumbItems = async (pathname) => {
//   const segments = pathname.split('/').filter(segment => segment);
//   const breadcrumbItems = [{ label: 'خانه', href: '/' }];
//   let currentPath = '';

//   // بررسی مسیرهای بازنویسی‌شده برای محصولات
//   const isRewrittenProduct = !segments.includes('shop') && !specialSlugs.magazine.includes(segments[0]) && 
//                              !specialSlugs.news.includes(segments[0]) && !specialSlugs.tenders.includes(segments[0]) && 
//                              !specialSlugs.ads.includes(segments[0]) && !staticLabels[segments[0]];

//   if (isRewrittenProduct) {
//     const slug = segments[0];
//     const product = await fetchProductBySlug(slug);
//     if (product) {
//       breadcrumbItems.push(
//         { label: 'فروشگاه', href: '/shop' },
//         { label: categoryLabels[product.category] || product.category.replace(/-/g, ' '), href: `/shop/${product.category}` },
//         { label: product.title, href: `/${slug}`, isLast: true }
//       );
//       return breadcrumbItems;
//     }
//   }

//   // بررسی مسیرهای جزئیات آگهی (/ads/[slug])
//   const isAdDetail = segments[0] === 'ads' && segments.length === 2;
//   if (isAdDetail) {
//     const slug = segments[1];
//     const ad = await fetchAdBySlug(slug);
//     if (ad) {
//       breadcrumbItems.push(
//         { label: 'آگهی‌ها', href: '/ads' },
//         { label: adCategoryLabels[ad.category] || ad.category.replace(/-/g, ' '), href: `/ads/${ad.category}` },
//         { label: ad.title, href: `/ads/${slug}`, isLast: true }
//       );
//       return breadcrumbItems;
//     }
//   }

//   // بررسی مسیرهای بازنویسی‌شده برای مقالات (/miningtrends2025)
//   if (specialSlugs.magazine.includes(segments[0])) {
//     const slug = segments[0];
//     const article = await fetchArticleBySlug(slug);
//     if (article) {
//       breadcrumbItems.push(
//         { label: 'مجله', href: '/magazine' },
//         { label: article.title, href: `/magazine/${slug}`, isLast: true }
//       );
//       return breadcrumbItems;
//     }
//   }

//   // بررسی مسیرهای بازنویسی‌شده برای اخبار (/miningnews2025)
//   if (specialSlugs.news.includes(segments[0])) {
//     const slug = segments[0];
//     const news = await fetchNewsBySlug(slug);
//     if (news) {
//       breadcrumbItems.push(
//         { label: 'اخبار', href: '/news' },
//         { label: news.title, href: `/news/${slug}`, isLast: true }
//       );
//       return breadcrumbItems;
//     }
//   }

//   // بررسی مسیرهای بازنویسی‌شده برای مناقصات (/ironoretender)
//   if (specialSlugs.tenders.includes(segments[0])) {
//     const slug = segments[0];
//     const tender = await fetchTenderBySlug(slug);
//     if (tender) {
//       breadcrumbItems.push(
//         { label: 'مناقصات و مزایدات', href: '/tenders' },
//         { label: tender.title, href: `/tenders/${slug}`, isLast: true }
//       );
//       return breadcrumbItems;
//     }
//   }

//   // مدیریت مسیرهای استاندارد
//   segments.forEach((segment, index) => {
//     currentPath += `/${segment}`;
//     const isLast = index === segments.length - 1;

//     // مدیریت مسیرهای استاتیک
//     if (staticLabels[segment]) {
//       breadcrumbItems.push({
//         label: staticLabels[segment],
//         href: currentPath,
//         isLast,
//       });
//     } else {
//       // مدیریت مسیرهای داینامیک
//       let label = segment.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
//       breadcrumbItems.push({
//         label: adCategoryLabels[segment] || categoryLabels[segment] || label,
//         href: currentPath,
//         isLast,
//       });
//     }
//   });

//   return breadcrumbItems;
// };

// // تابع برای دریافت نام‌های داینامیک
// export const getDynamicBreadcrumbLabel = async (segment, segmentType) => {
//   if (segmentType === 'product') {
//     const product = await fetchProductBySlug(segment);
//     return product?.title || segment.replace(/-/g, ' ');
//   }
//   if (segmentType === 'ad') {
//     const ad = await fetchAdBySlug(segment);
//     return ad?.title || segment.replace(/-/g, ' ');
//   }
//   if (segmentType === 'article') {
//     const article = await fetchArticleBySlug(segment);
//     return article?.title || segment.replace(/-/g, ' ');
//   }
//   if (segmentType === 'news') {
//     const news = await fetchNewsBySlug(segment);
//     return news?.title || segment.replace(/-/g, ' ');
//   }
//   if (segmentType === 'tender') {
//     const tender = await fetchTenderBySlug(segment);
//     return tender?.title || segment.replace(/-/g, ' ');
//   }
//   return adCategoryLabels[segment] || categoryLabels[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
// };


