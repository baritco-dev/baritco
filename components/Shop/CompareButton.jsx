"use client";

import { useDispatch, useSelector } from "react-redux";
import { addToComparison, removeFromComparison, setModalOpen } from "../../lib/redux/slices/productSlice";

export default function CompareButton({ product }) {
  const dispatch = useDispatch();
  const { comparison } = useSelector((state) => state.products || { comparison: [] });
  const isInComparison = comparison.some((item) => item.id === product.id);

  const handleToggleComparison = () => {
    if (isInComparison) {
      dispatch(removeFromComparison(product.id));
    } else {
      if (comparison.length < 4) {
        dispatch(addToComparison(product));
        dispatch(setModalOpen(true)); // باز کردن لایت‌باکس
      } else {
        alert("حداکثر ۴ محصول می‌توانید مقایسه کنید!");
      }
    }
  };

  return (
    <button
      onClick={handleToggleComparison}
      className={`px-4 py-2 rounded transition ${
        isInComparison
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
    >
      {isInComparison ? "حذف از مقایسه" : "افزودن به مقایسه"}
    </button>
  );
}