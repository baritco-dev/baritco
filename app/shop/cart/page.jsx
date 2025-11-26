'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-toastify';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  syncCart,
  clearCart,
} from '../../../lib/redux/slices/cartSlice';
import ShippingOptions from '../../../components/ShippingOptions';
import SkeletonLoader from '../../../components/SkeletonLoader';
import { fetchProductBySlug } from '../../../lib/mocks/products';

export default function CartPage() {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState({ type: 'none', value: 0, productId: null });
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

  const handleApplyDiscount = () => {
    const codes = {
      SAVE10: { type: 'percentage', value: 0.1 },
      SAVE20K: { type: 'fixed', value: 20000 },
      DATAMINE10: { type: 'percentage', value: 0.1, productId: 1 },
      DATAMINE5K: { type: 'fixed', value: 5000, productId: 1 },
    };

    if (codes[discountCode]) {
      const newDiscount = codes[discountCode];
      setDiscount(newDiscount);
      localStorage.setItem('discount', JSON.stringify(newDiscount));
      toast.success('تخفیف اعمال شد!');
    } else {
      toast.error('کد تخفیف نامعتبر است');
    }
  };

  const handleRemove = (id, title) => {
    dispatch(removeFromCart(id));
    toast.success(`محصول ${title} از سبد خرید حذف گردید`);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('سبد خرید خالی شد');
  };

  const handleCheckout = () => {
    if (!shippingMethod) {
      toast.error('لطفاً یک روش ارسال انتخاب کنید');
      return;
    }
    localStorage.setItem('shippingMethod', JSON.stringify(shippingMethod));
    router.push('/shop/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 px-4 py-2">
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-6 mb-6 rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-10"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">سبد خرید شما</h1>
          <p className="text-lg md:text-xl opacity-90">محصولات انتخاب‌شده خود را بررسی و سفارش نهایی را ثبت کنید</p>
        </div>
      </div>

      <div className="mx-auto">
        {isLoading ? (
          <SkeletonLoader />
        ) : (!cart || cart.length === 0) ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-amber-100 mb-2">سبد خرید شما خالی است</h2>
            <button
              onClick={() => router.push('/shop')}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg"
            >
              بازگشت به فروشگاه
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-amber-100 flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-amber-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    محصولات انتخابی ({cart.length})
                  </h2>
                  <button
                    onClick={handleClearCart}
                    className="text-red-500 hover:text-red-600 flex items-center gap-1"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    حذف همه
                  </button>
                </div>
                {cart.map((item) => {
                  const product = fetchProductBySlug(item.slug);
                  return (
                    <div
                      key={item.id}
                      className="p-6 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Image
                          src={item.image || '/images/default-product.jpg'}
                          alt={item.title}
                          width={100}
                          height={100}
                          className="object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-amber-100">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            موجودی: {product.stockQuantity} عدد
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            قیمت واحد: {item.price.toLocaleString('fa-IR')} تومان
                          </p>
                          <button
                            onClick={() => handleRemove(item.id, item.title)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
                          <button
                            onClick={() => dispatch(decrementQuantity(item.id))}
                            className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-amber-100"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-4 py-1 text-gray-800 dark:text-amber-100 font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => dispatch(incrementQuantity(item.id))}
                            className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-amber-100"
                            disabled={item.quantity >= product.stockQuantity}
                          >
                            +
                          </button>
                        </div>
                        <p className="text-lg font-semibold text-gray-800 dark:text-amber-100">
                          {(item.price * item.quantity).toLocaleString('fa-IR')} تومان
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-amber-100 mb-4">کد تخفیف</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="کد تخفیف را وارد کنید"
                    className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-amber-100"
                  />
                  <button
                    onClick={handleApplyDiscount}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-amber-100 rounded-lg"
                  >
                    اعمال
                  </button>
                </div>
              </div>
              <ShippingOptions selectedMethod={shippingMethod} onSelect={setShippingMethod} />
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-amber-100 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-2">
                  خلاصه سفارش
                </h2>
                <div className="space-y-4 mb-6">
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
                            ? cart?.find((i) => i.id === discount.productId)?.price * cart?.find((i) => i.id === discount.productId)?.quantity * discount.value || 0
                            : (cart ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0) * discount.value
                          : Math.min(
                              discount.value,
                              discount.productId
                                ? cart?.find((i) => i.id === discount.productId)?.price * cart?.find((i) => i.id === discount.productId)?.quantity || 0
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
                <button
                  onClick={handleCheckout}
                  disabled={!shippingMethod}
                  className={`w-full mt-2 py-3 rounded-xl font-bold text-lg ${
                    !shippingMethod
                      ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:shadow-lg'
                  }`}
                >
                  تسویه حساب
                </button>
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

