"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProducts, addToComparison, removeFromComparison, setModalOpen } from "../../lib/redux/slices/productSlice";
import { searchProducts } from "../../lib/api/products";
import Image from "next/image";
import AddToCartButton from "../AddToCartButton";
import WishlistButton from "../WishlistButton";
import { Scale, Plus, X } from "lucide-react";

export default function ProductComparison() {
  const dispatch = useDispatch();
  const { items: products, comparison, isModalOpen, status, error } = useSelector((state) => state.products || { items: [], comparison: [], isModalOpen: false, status: "idle", error: null });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getProducts());
    }
  }, [status, dispatch]);

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 2) {
      const results = await searchProducts(e.target.value);
      setSearchResults(results.filter((p) => !comparison.some((item) => item.id === p.id)));
    } else {
      setSearchResults([]);
    }
  };

  const handleAddToComparison = (product) => {
    if (comparison.length < 4) {
      dispatch(addToComparison(product));
      setSearchTerm("");
      setSearchResults([]);
      setIsSearchVisible(false);
    } else {
      alert("حداکثر ۴ محصول می‌توانید مقایسه کنید!");
    }
  };

  const closeModal = () => {
    dispatch(setModalOpen(false));
    setSearchTerm("");
    setSearchResults([]);
    setIsSearchVisible(false);
  };

  if (!isModalOpen) {
    return null; // اگر مودال بسته است، چیزی رندر نشود
  }

  if (status === "loading") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50inverse">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg w-full">
          <p className="text-gray-600 dark:text-gray-300">در حال بارگذاری محصولات...</p>
        </div>
      </div>
    );
  }

  if (status === "failed" || error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg w-full">
          <p className="text-gray-600 dark:text-gray-300">خطا در بارگذاری محصولات: {error || "نامشخص"}</p>
        </div>
      </div>
    );
  }

  const features = ['title', 'price', 'inStock', 'description'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 max-w-7xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Scale className="w-8 h-8 text-amber-500" />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">مقایسه محصولات ({comparison.length}/4)</h1>
          </div>
          <button onClick={closeModal} className="text-red-500 hover:text-red-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {comparison.length === 0 && !isSearchVisible && (
          <div className="text-center">
            <div className="mx-auto max-w-md">
              <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Scale className="w-10 h-10 text-amber-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">لیست مقایسه شما خالی است</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">محصولات مورد نظر خود را برای مقایسه اضافه کنید</p>
              <button
                onClick={() => setIsSearchVisible(true)}
                className="inline-flex px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:shadow-lg transition-all items-center gap-2 mx-auto"
              >
                <Plus className="w-5 h-5" />
                افزودن کالا
              </button>
            </div>
          </div>
        )}

        {comparison.length > 0 && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {comparison.map((product) => (
                <div key={product.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md relative">
                  <button
                    onClick={() => dispatch(removeFromComparison(product.id))}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <Image
                    src={product.image || "/images/default-product.jpg"}
                    alt={product.title}
                    width={200}
                    height={150}
                    className="object-cover rounded-lg mb-4"
                  />
                  {features.map((feature) => (
                    <p key={feature} className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {feature === 'title' ? 'نام:' : feature === 'price' ? 'قیمت:' : feature === 'inStock' ? 'موجودی:' : 'توضیحات:'}
                      <span className="font-medium text-gray-900 dark:text-white ml-2">
                        {feature === 'price' ? `${product[feature]} تومان` : feature === 'inStock' ? (product[feature] ? 'موجود' : 'ناموجود') : product[feature] || 'ـ'}
                      </span>
                    </p>
                  ))}
                  <div className="flex gap-4 mt-4">
                    <AddToCartButton product={product} className="flex-1" />
                    <WishlistButton item={product} type="products" className="flex-1" />
                  </div>
                </div>
              ))}
              {comparison.length < 4 && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md flex items-center justify-center">
                  <button
                    onClick={() => setIsSearchVisible(true)}
                    className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    افزودن کالا
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {isSearchVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">انتخاب محصول برای مقایسه</h2>
                <button
                  onClick={() => setIsSearchVisible(false)}
                  className="text-gray-600 dark:text-gray-300 hover:text-red-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <input
                type="text"
                placeholder="جستجوی محصول..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-2 border rounded mb-4"
              />
              <div className="space-y-2">
                {searchResults.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-300">محصولی یافت نشد.</p>
                ) : (
                  searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleAddToComparison(product)}
                      className="w-full text-left p-2 bg-gray-50 hover:bg-gray-100 rounded"
                    >
                      <div className="flex justify-between">
                        <span>{product.title}</span>
                        <span>{product.price} تومان</span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

