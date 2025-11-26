'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { removeFromWishlist, clearWishlist } from '../../lib/redux/slices/wishlistSlice';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const [activeTab, setActiveTab] = useState('products');

  const tabs = [
    { id: 'products', label: 'محصولات', type: 'products' },
    { id: 'ads', label: 'آگهی‌ها', type: 'ads' },
    { id: 'specialists', label: 'کلینیک', type: 'specialists' },
    { id: 'tenders', label: 'مناقصات', type: 'tenders' },
  ];

  const handleRemove = (itemId, type) => {
    dispatch(removeFromWishlist({ itemId, type }));
    toast.success('از علاقه‌مندی‌ها حذف شد', {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const handleClear = (type) => {
    dispatch(clearWishlist({ type }));
    toast.success(`لیست علاقه‌مندی‌های ${tabs.find((tab) => tab.type === type).label} پاک شد`, {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const renderItems = (items, type) => {
    if (items.length === 0) {
      return <p className="text-gray-600">هیچ آیتمی در این دسته وجود ندارد.</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
            <Image
              src={item.image}
              alt={item.title || item.name}
              width={300}
              height={200}
              className="object-cover rounded-lg"
              loading="lazy"
            />
            <h3 className="text-lg font-semibold mt-2">{item.title || item.name}</h3>
            <p className="text-gray-600">{(item.description || item.bio || '').slice(0, 100)}...</p>
            <div className="flex justify-between items-center mt-4">
              <Link
                href={`/${
                  type === 'products' ? 'shop/products' : type === 'ads' ? 'ads' : type === 'specialists' ? 'clinic' : 'tenders'
                }/${item.slug}`}
                className="text-primary"
              >
                مشاهده جزئیات
              </Link>
              <button
                onClick={() => handleRemove(item.id, type)}
                className="text-red-500 hover:text-red-600"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">لیست علاقه‌مندی‌ها</h1>
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-semibold ${
              activeTab === tab.id
                ? 'border-b-2 border-amber-500 text-amber-500'
                : 'text-gray-600 hover:text-amber-500'
            }`}
          >
            {tab.label} ({wishlist[tab.type].length})
          </button>
        ))}
      </div>
      <div className="mb-4">
        <button
          onClick={() => handleClear(activeTab)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
          disabled={wishlist[activeTab].length === 0}
        >
          پاک کردن همه
        </button>
      </div>
      {renderItems(wishlist[activeTab], activeTab)}
    </div>
  );
}