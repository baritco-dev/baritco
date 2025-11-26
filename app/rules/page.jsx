import RulesContent from '../../components/RulesContent';

export const metadata = {
  title: 'قوانین و مقررات - باریتکو',
  description: 'قوانین و مقررات استفاده از پلتفرم باریتکو برای خرید و فروش محصولات معدنی و صنعتی',
  openGraph: {
    title: 'قوانین و مقررات - باریتکو',
    description: 'قوانین و مقررات استفاده از پلتفرم باریتکو برای خرید و فروش محصولات معدنی و صنعتی',
    url: 'https://bariteco.ir/rules',
  },
};

export default function RulesPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">قوانین و مقررات</h1>
      <RulesContent />
    </div>
  );
}