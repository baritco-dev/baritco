import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold">باریتکو</h3>
          <p className="mt-2">پلتفرم جامع برای محصولات معدنی و خدمات</p>
        </div>
        <div>
          <h3 className="text-lg font-bold">لینک‌های مفید</h3>
          <ul className="mt-2 space-y-2">
            <li><Link href="/about">درباره ما</Link></li>
            <li><Link href="/contactUs">تماس با ما</Link></li>
            <li><Link href="/rules">قوانین</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold">خدمات</h3>
          <ul className="mt-2 space-y-2">
            <li><Link href="/shop/products">فروشگاه</Link></li>
            <li><Link href="/ads">آگهی‌ها</Link></li>
            <li><Link href="/clinic">کلینیک معدن</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold">تماس با ما</h3>
          <p className="mt-2">ایمیل: info@baritco.com</p>
          <p>تلفن: 1234-5678-9012</p>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p>&copy; {new Date().getFullYear()} باریتکو. تمامی حقوق محفوظ است.</p>
      </div>
    </footer>
  );
}