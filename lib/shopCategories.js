// lib/shopCategories.js
export const shopCategories = [
  {
    slug: 'drilling-equipment',
    name: 'تجهیزات حفاری',
    parent: null,
  },
  {
    slug: 'chemicals',
    name: 'مواد شیمیایی',
    parent: null,
  },
  {
    slug: 'metal-minerals',
    name: 'مواد معدنی فلزی',
    parent: null,
  },
  {
    slug: 'non-metal-minerals',
    name: 'مواد معدنی غیرفلزی',
    parent: null,
  },
  {
    slug: 'iron-ore',
    name: 'سنگ آهن',
    parent: 'metal-minerals',
  },
  {
    slug: 'copper-ore',
    name: 'سنگ مس',
    parent: 'metal-minerals',
  },
  {
    slug: 'barite',
    name: 'باریت',
    parent: 'non-metal-minerals',
  },
  {
    slug: 'bentonite',
    name: 'بنتونیت',
    parent: 'non-metal-minerals',
  },
  // هر دسته‌بندی جدید که اضافه کردی → فقط اینجا یه خط اضافه کن!
];

// تابع هوشمند برای ساخت مسیر کامل
export function getCategoryPath(slug) {
  const path = [];
  let current = shopCategories.find(cat => cat.slug === slug);

  while (current) {
    path.unshift({
      name: current.name,
      href: current.parent ? `/shop/${current.slug}` : '/shop'
    });
    if (!current.parent) break;
    current = shopCategories.find(cat => cat.slug === current.parent);
  }

  // همیشه "فروشگاه" رو اول بذار
  return [{ name: 'فروشگاه', href: '/shop' }, ...path];
}