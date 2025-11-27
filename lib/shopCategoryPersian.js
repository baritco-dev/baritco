// lib/shopCategoryPersian.js
export const persianCategoryNames = {
  'drilling-equipment': 'تجهیزات حفاری',
  'chemicals': 'مواد شیمیایی',
  'concrete-additives': 'افزودنی‌های بتن',
  'metal-minerals': 'مواد معدنی فلزی',
  'non-metal-minerals': 'مواد معدنی غیرفلزی',
  'tools': 'ابزارآلات',
  'safety-equipment': 'تجهیزات ایمنی',
  'barite': 'باریت',
  'bentonite': 'بنتونیت',
  'silica': 'سیلیس',
  'iron-ore': 'سنگ آهن',
  'copper-ore': 'سنگ مس',
};

export const getPersianName = (slug) => {
  return persianCategoryNames[slug] || slug.replace(/-/g, ' ').charAt(0).toUpperCase() + slug.replace(/-/g, ' ').slice(1);
};