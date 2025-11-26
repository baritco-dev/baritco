// /lib/mocks/shopCategories.jsx
const shopCategoriesData = [
  {
    id: 'metallic-minerals',
    name: 'مواد معدنی فلزی',
    description: 'شامل آهن، مس، آلومینیوم و غیره',
    image: '/images/metallic.jpg',
    icon: 'metallic-icon.svg',
  },
  {
    id: 'non-metallic-minerals',
    name: 'مواد معدنی غیرفلزی',
    description: 'شامل باریت، بنتونیت و غیره',
    image: '/images/non-metallic.jpg',
    icon: 'non-metallic-icon.svg',
  },
  {
    id: 'construction-materials',
    name: 'مصالح ساختمانی',
    description: 'سیمان، گچ، آهک و غیره',
    image: '/images/construction.jpg',
    icon: 'construction-icon.svg',
  },
  {
    id: 'mining-equipment',
    name: 'تجهیزات معدنی',
    description: 'ابزارها و تجهیزات مورد استفاده در معدن',
    image: '/images/mining-equip.jpg',
    icon: 'equip-icon.svg',
  },
  {
    id: 'mining-machinery',
    name: 'ماشین‌آلات معدن',
    description: 'بیل مکانیکی، لودر و غیره',
    image: '/images/machinery.jpg',
    icon: 'machinery-icon.svg',
  },
  {
    id: 'laboratory-equipment',
    name: 'تجهیزات آزمایشگاهی',
    description: 'دستگاه‌های آنالیز و تست',
    image: '/images/lab.jpg',
    icon: 'lab-icon.svg',
  },
  {
    id: 'geological-equipment',
    name: 'تجهیزات زمین‌شناسی',
    description: 'ابزارهای اکتشاف زمین‌شناسی',
    image: '/images/geo.jpg',
    icon: 'geo-icon.svg',
  },
];

// تابع کمکی برای شبیه‌سازی delay API
const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchShopCategories(filterId = null) {
  await simulateDelay();
  if (filterId) {
    const category = shopCategoriesData.find(c => c.id === filterId);
    if (!category) {
      throw new Error(`Category "${filterId}" not found`);
    }
    return [category];
  }
  return shopCategoriesData;
}

