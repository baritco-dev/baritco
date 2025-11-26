'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import ThemeToggle from '../ThemeToggle';
import { Heart } from 'lucide-react';
import { syncWishlist } from '../../lib/redux/slices/wishlistSlice';

export default function NavMenu() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart); // تغییر به state.cart.cart
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    // Calculate initial cart and wishlist counts
    const cartCount = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;
    setCartItemCount(cartCount);

    const wishCount = Object.values(wishlist).reduce((sum, items) => sum + items.length, 0);
    setWishlistCount(wishCount);

    // Listen for storage changes to update cart count
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const newCartCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
      setCartItemCount(newCartCount);

      // Avoid dispatching syncWishlist during storage event to prevent reducer conflict
      // Wishlist count is updated via Redux state changes
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [cart, wishlist, dispatch]);

  // Update wishlist count whenever wishlist changes
  useEffect(() => {
    const wishCount = Object.values(wishlist).reduce((sum, items) => sum + items.length, 0);
    setWishlistCount(wishCount);
  }, [wishlist]);

  return (
    <nav className="flex gap-4 items-center">
      <Link href="/about">درباره ما</Link>
      <Link href="/contact">تماس با ما</Link>
      <Link href="/shop/become-seller">فروشنده شو</Link>
      <Link href="/ads/create">ثبت آگهی</Link>
      <Link href="/auth/login" className="bg-primary text-white px-3 py-1 rounded-lg">
        ورود/ثبت‌نام
      </Link>
      <div className="relative">
        <Link href="/wishlist" className="bg-primary text-white px-3 py-1 rounded-lg flex items-center justify-center">
          <Heart className="w-5 h-5" />
        </Link>
        {wishlistCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {wishlistCount}
          </span>
        )}
      </div>
      <div className="relative">
        <Link href="/shop/cart" className="bg-primary text-white px-3 py-1 rounded-lg flex items-center justify-center">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </Link>
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartItemCount}
          </span>
        )}
      </div>
      <ThemeToggle />
    </nav>
  );
}




// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useSelector, useDispatch } from 'react-redux';
// import ThemeToggle from '../ThemeToggle';
// import { Heart } from 'lucide-react';
// import { syncWishlist } from '../../lib/redux/slices/wishlistSlice';

// export default function NavMenu() {
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.products.cart);
//   const wishlist = useSelector((state) => state.wishlist.wishlist);
//   const [cartItemCount, setCartItemCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0);

//   useEffect(() => {
//     // Calculate initial cart and wishlist counts
//     const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
//     setCartItemCount(cartCount);

//     const wishCount = Object.values(wishlist).reduce((sum, items) => sum + items.length, 0);
//     setWishlistCount(wishCount);

//     // Listen for storage changes to update cart count
//     const handleStorageChange = () => {
//       const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
//       const newCartCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
//       setCartItemCount(newCartCount);

//       // Avoid dispatching syncWishlist during storage event to prevent reducer conflict
//       // Wishlist count is updated via Redux state changes
//     };

//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, [cart, wishlist, dispatch]);

//   // Update wishlist count whenever wishlist changes
//   useEffect(() => {
//     const wishCount = Object.values(wishlist).reduce((sum, items) => sum + items.length, 0);
//     setWishlistCount(wishCount);
//   }, [wishlist]);

//   return (
//     <nav className="flex gap-4 items-center">
//       <Link href="/about">درباره ما</Link>
//       <Link href="/contact">تماس با ما</Link>
//       <Link href="/shop/become-seller">فروشنده شو</Link>
//       <Link href="/ads/create">ثبت آگهی</Link>
//       <Link href="/auth/login" className="bg-primary text-white px-3 py-1 rounded-lg">
//         ورود/ثبت‌نام
//       </Link>
//       <div className="relative">
//         <Link href="/wishlist" className="bg-primary text-white px-3 py-1 rounded-lg flex items-center justify-center">
//           <Heart className="w-5 h-5" />
//         </Link>
//         {wishlistCount > 0 && (
//           <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//             {wishlistCount}
//           </span>
//         )}
//       </div>
//       <div className="relative">
//         <Link href="/shop/cart" className="bg-primary text-white px-3 py-1 rounded-lg flex items-center justify-center">
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//             />
//           </svg>
//         </Link>
//         {cartItemCount > 0 && (
//           <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//             {cartItemCount}
//           </span>
//         )}
//       </div>
//       <ThemeToggle />
//     </nav>
//   );
// }

