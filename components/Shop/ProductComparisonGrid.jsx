"use client";

import Image from "next/image";

export default function ProductComparisonGrid({ products, onRemove }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {products.length === 0 ? (
        <p>هیچ محصولی برای مقایسه انتخاب نشده است.</p>
      ) : (
        products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 relative">
            <button
              onClick={() => onRemove(product.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              حذف
            </button>
            <Image
              src={product.image || "/images/default-product.jpg"}
              alt={product.title}
              width={200}
              height={150}
              className="object-cover rounded-lg"
              loading="lazy"
            />
            <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
            <p>قیمت: {product.price} تومان</p>
            <p>موجودی: {product.inStock ? "موجود" : "ناموجود"}</p>
          </div>
        ))
      )}
    </div>
  );
}
