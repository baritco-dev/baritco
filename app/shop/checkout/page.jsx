'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { syncCart, clearCart } from '../../../lib/redux/slices/cartSlice'; // تغییر به cartSlice
import SkeletonLoader from '../../../components/SkeletonLoader';

const CartItem = React.memo(({ item }) => (
  <div
    key={item.id}
    className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100 dark:border-gray-700"
  >
    <div className="flex items-center gap-4">
      <Image
        src={item.image}
        alt={item.title}
        width={64}
        height={64}
        className="object-cover rounded-lg border border-gray-200 dark:border-gray-700"
        onError={(e) => (e.target.src = '/fallback-image.jpg')}
      />
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-amber-100">
          {item.title} (x{item.quantity})
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {item.price.toLocaleString('fa-IR')} تومان
        </p>
      </div>
    </div>
    <p className="text-lg font-semibold text-gray-800 dark:text-amber-100">
      {(item.price * item.quantity).toLocaleString('fa-IR')} تومان
    </p>
  </div>
));

export default function CheckoutPage() {
  const cart = useSelector((state) => state.cart.cart); // تغییر به state.cart.cart
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    paymentMethod: 'online',
  });
  const [formErrors, setFormErrors] = useState({});
  const [discount, setDiscount] = useState(
    JSON.parse(localStorage.getItem('discount') || '{"type":"none","value":0,"productId":null}')
  );
  const [shippingMethod, setShippingMethod] = useState(
    JSON.parse(localStorage.getItem('shippingMethod') || 'null')
  );

  useEffect(() => {
    const initializeCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      dispatch(syncCart(cart));
      setIsLoading(false);
    };

    initializeCart();
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setTimeout(() => dispatch(syncCart(updatedCart)), 0);
      setDiscount(JSON.parse(localStorage.getItem('discount') || '{"type":"none","value":0,"productId":null}'));
      setShippingMethod(JSON.parse(localStorage.getItem('shippingMethod') || 'null'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [dispatch]);

  const totalPrice = useMemo(() => {
    let subtotal = cart ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;
    let discountAmount = 0;

    if (discount.type === 'percentage') {
      if (discount.productId) {
        const item = cart?.find((i) => i.id === discount.productId);
        if (item) discountAmount = item.price * item.quantity * discount.value;
      } else {
        discountAmount = subtotal * discount.value;
      }
    } else if (discount.type === 'fixed') {
      if (discount.productId) {
        const item = cart?.find((i) => i.id === discount.productId);
        if (item) discountAmount = Math.min(discount.value, item.price * item.quantity);
      } else {
        discountAmount = Math.min(discount.value, subtotal);
      }
    }

    const shippingCost = shippingMethod?.cost ?? 0;
    return subtotal - discountAmount + shippingCost;
  }, [cart, discount, shippingMethod]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'نام و نام خانوادگی الزامی است';
    if (!formData.address.trim()) errors.address = 'آدرس الزامی است';
    if (!formData.phone.trim()) errors.phone = 'شماره تماس الزامی است';
    else if (!/^09\d{9}$/.test(formData.phone)) errors.phone = 'شماره تماس نامعتبر است';
    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
      dispatch(clearCart());
      localStorage.removeItem('discount');
      localStorage.removeItem('shippingMethod');
      toast.success('سفارش شما با موفقیت ثبت شد!');
      router.push('/payment');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-12 mb-12 rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-10"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">تسویه حساب</h1>
          <p className="text-lg md:text-xl opacity-90">سفارش خود را بررسی کنید.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {isLoading ? (
          <SkeletonLoader />
        ) : (!cart || cart.length === 0) ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-amber-100 mb-4">سبد خرید شما خالی است</h2>
            <p className="text-gray-600 dark:text-gray-400">لطفاً محصولاتی به سبد خرید خود اضافه کنید.</p>
            <button
              onClick={() => router.push('/shop')}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg mt-4"
            >
              بازگشت به فروشگاه
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-amber-100 mb-6 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                اطلاعات ارسال
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-amber-100 ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    required
                  />
                  {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="address">
                    آدرس
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-amber-100 ${
                      formErrors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    rows="4"
                    required
                  />
                  {formErrors.address && <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="phone">
                    شماره تماس
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-amber-100 ${
                      formErrors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="09xxxxxxxxx"
                    required
                  />
                  {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="paymentMethod">
                    روش پرداخت
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-amber-100"
                  >
                    <option value="online">پرداخت آنلاین</option>
                    <option value="cod">پرداخت در محل</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={isConfirming}
                  className={`w-full py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-2 ${
                    isConfirming
                      ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg'
                  }`}
                >
                  {isConfirming ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      در حال پردازش...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      تأیید و ادامه به پرداخت
                    </>
                  )}
                </button>
              </form>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-amber-100 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"
                  />
                </svg>
                جزئیات سفارش
              </h2>
              {cart?.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
              <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">جمع کل محصولات</span>
                  <span className="text-gray-800 dark:text-amber-100 font-medium">
                    {(cart ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0).toLocaleString('fa-IR')} تومان
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">تخفیف</span>
                  <span className="text-green-500">
                    {(discount.type !== 'none'
                      ? discount.type === 'percentage'
                        ? discount.productId
                          ? cart?.find((i) => i.id === discount.productId)?.price *
                              cart?.find((i) => i.id === discount.productId)?.quantity *
                              discount.value || 0
                          : (cart ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0) * discount.value
                        : Math.min(
                            discount.value,
                            discount.productId
                              ? cart?.find((i) => i.id === discount.productId)?.price *
                                  cart?.find((i) => i.id === discount.productId)?.quantity || 0
                              : (cart ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0)
                          )
                      : 0
                    ).toLocaleString('fa-IR')} تومان
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">هزینه ارسال ({shippingMethod?.name || 'انتخاب نشده'})</span>
                  <span className="text-gray-800 dark:text-amber-100 font-medium">
                    {(shippingMethod?.cost ?? 0) === 0 ? 'رایگان' : `${(shippingMethod?.cost ?? 0).toLocaleString('fa-IR')} تومان`}
                  </span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-gray-800 dark:text-amber-100 font-semibold">مبلغ قابل پرداخت</span>
                  <span className="text-gray-800 dark:text-amber-100 font-bold text-lg">
                    {totalPrice.toLocaleString('fa-IR')} تومان
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)' opacity='0.20'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}