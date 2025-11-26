'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Heart } from 'lucide-react';
import { toast } from 'react-toastify';
import { addToWishlist, removeFromWishlist } from '../lib/redux/slices/wishlistSlice';

export default function WishlistButton({ item, type }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const isInWishlist = wishlist[type].some((i) => i.id === item.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist({ itemId: item.id, type }));
      toast.success('از علاقه‌مندی‌ها حذف شد', {
        position: 'top-right',
        autoClose: 2000,
      });
    } else {
      dispatch(addToWishlist({ item, type }));
      toast.success('به علاقه‌مندی‌ها اضافه شد', {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        toggleWishlist();
      }}
      className={`border px-6 py-2 rounded-lg transition-colors ${
        isInWishlist ? 'bg-red-100 border-red-500 text-red-500' : 'border-gray-300 text-gray-400 hover:text-red-500'
      }`}
    >
      <Heart className={`w-5 h-5 inline-block mr-2 ${isInWishlist ? 'fill-red-500' : ''}`} />
      {isInWishlist ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
    </button>
  );
}