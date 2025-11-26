export const sliderItems = [
  {
    id: 1,
    title: 'به باریتکو خوش آمدید',
    description: 'پلتفرم تخصصی معدن و صنایع معدنی با خدمات متنوع',
    image: '/images/slider/welcome.jpg',
  },
  {
    id: 2,
    title: 'آگهی‌های معدنی',
    description: 'آخرین آگهی‌های خرید و فروش مواد معدنی و تجهیزات',
    image: '/images/slider/mineAds.jpg',
  },
  {
    id: 3,
    title: 'مجله تخصصی',
    description: 'مقالات و اخبار به‌روز در حوزه معدن',
    image: '/images/slider/mineMag2.webp',
  },
  {
    id: 4,
    title: 'نمایشگاه معدن تهران',
    description: 'مشارکت در نمایشگاه بین‌المللی معدن و صنایع معدنی تهران 2025',
    image: '/images/slider/TehranNema.webp',
  },
  {
    id: 5,
    title: 'تکنولوژی‌های نوین معدنی',
    description: 'آخرین فناوری‌ها برای استخراج و فرآوری مواد معدنی',
    image: '/images/slider/mineTech.jpg',
  },
];

export async function fetchSliderItems() {
  return sliderItems;
}