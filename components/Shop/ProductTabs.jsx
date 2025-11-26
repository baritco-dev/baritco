// /components/Shop/ProductTabs.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react"; // استفاده از lucide-react به جای Heroicons

export default function ProductTabs({ product, reviews, relatedProducts }) {
  const [activeTab, setActiveTab] = useState("description");

  // محاسبه میانگین امتیاز نظرات
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="mt-8">
      <div className="flex border-b space-x-2">
        {[
          { id: "description", label: "توضیحات", icon: "/icons/description.svg" },
          { id: "features", label: "ویژگی‌ها", icon: "/icons/features.svg" },
          { id: "variants", label: "واریانت‌ها", icon: "/icons/variants.svg" },
          { id: "reviews", label: "نظرات", icon: "/icons/reviews.svg" },
          { id: "related", label: "محصولات مرتبط", icon: "/icons/related.svg" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 border-b-2 transition-colors ${
              activeTab === tab.id ? "border-primary text-primary" : "border-transparent hover:border-primary"
            }`}
          >
            {tab.icon && (
              <Image src={tab.icon} alt={tab.label} width={20} height={20} className="mr-2" />
            )}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4 animate-fade-in">
        {activeTab === "description" && (
          <div className="prose prose-sm">
            <p>{product.fullDescription || product.description}</p>
            <p className="mt-2"><strong>برند:</strong> {product.brand || "نامشخص"}</p>
            <p><strong>تگ‌ها:</strong> {product.tags?.join(", ") || "بدون تگ"}</p>
          </div>
        )}
        {activeTab === "features" && (
          <ul className="list-disc pr-5">
            {product.features?.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        )}
        {activeTab === "variants" && (
          <div>
            {product.variants?.length > 0 ? (
              <ul className="space-y-2">
                {product.variants.map((variant, index) => (
                  <li key={index} className="border p-2 rounded">
                    <p><strong>نوع:</strong> {variant.size || variant.purity || variant.type || "نامشخص"}</p>
                    <p><strong>قیمت:</strong> {variant.price.toLocaleString('fa-IR')} تومان</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>هیچ واریانتی برای این محصول موجود نیست.</p>
            )}
          </div>
        )}
        {activeTab === "reviews" && (
          <div className="space-y-4">
            <div className="flex items-center">
              <p className="font-semibold">میانگین امتیاز: {averageRating}/5</p>
              <div className="flex ml-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.round(averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
            {reviews.length === 0 ? (
              <p>نظری برای این محصول ثبت نشده است.</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <p className="font-semibold">{review.user}</p>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-sm text-gray-500">امتیاز: {review.rating}/5</p>
                </div>
              ))
            )}
            <form className="mt-4 border-t pt-4">
              <h4 className="font-semibold">ثبت نظر</h4>
              <textarea
                className="w-full p-2 border rounded"
                placeholder="نظر خود را بنویسید..."
                rows={4}
              />
              <div className="mt-2">
                <label className="mr-2">امتیاز:</label>
                <select className="border rounded p-1">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <option key={score} value={score}>{score}</option>
                  ))}
                </select>
              </div>
              <button className="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
                ارسال نظر
              </button>
            </form>
          </div>
        )}
        {activeTab === "related" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="border rounded-lg p-4">
                <Image
                  src={relatedProduct.image}
                  alt={relatedProduct.title}
                  width={200}
                  height={150}
                  className="object-cover rounded-lg"
                  loading="lazy"
                />
                <h3 className="text-lg font-semibold mt-2">{relatedProduct.title}</h3>
                <Link href={`/shop/products/${relatedProduct.slug}`} className="text-primary">
                  مشاهده جزئیات
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


