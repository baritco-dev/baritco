'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../lib/redux/slices/cartSlice';
import { toast } from 'react-toastify';

export default function AddToCartButton({ product }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    const existingItem = cart.find((item) => item.id === product.id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;

    if (product.inStock && currentQuantity < product.stockQuantity) {
      setIsAdding(true);
      dispatch(addToCart(product));
      toast.success(`محصول ${product.title} به سبد خرید اضافه شد`);
      setTimeout(() => setIsAdding(false), 500);
    } else if (!product.inStock) {
      toast.error('محصول ناموجود است');
    } else {
      toast.error(`موجودی محصول ${product.title} کافی نیست`);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`px-6 py-2 rounded-lg ${
        product.inStock && !isAdding
          ? 'bg-primary text-white'
          : 'bg-gray-400 text-white cursor-not-allowed'
      }`}
      disabled={!product.inStock || isAdding}
    >
      {isAdding ? 'در حال افزودن...' : 'افزودن به سبد خرید'}
    </button>
  );
}



