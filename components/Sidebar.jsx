
'use client';

import { useState } from 'react';

export default function Sidebar({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState([0, 10000000]);

  // فراخوانی onFilterChange هنگام تغییر فیلترها توسط کاربر
  const handlePriceRangeChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
    onFilterChange({ priceRange: newPriceRange });
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">فیلتر آگهی‌ها</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-2">محدوده قیمت (تومان)</label>
          <input
            type="range"
            min="0"
            max="10000000"
            step="100000"
            value={priceRange[0]}
            onChange={(e) => handlePriceRangeChange([+e.target.value, priceRange[1]])}
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="10000000"
            step="100000"
            value={priceRange[1]}
            onChange={(e) => handlePriceRangeChange([priceRange[0], +e.target.value])}
            className="w-full"
          />
          <div className="flex justify-between">
            <span>{priceRange[0].toLocaleString('fa-IR')} تومان</span>
            <span>{priceRange[1].toLocaleString('fa-IR')} تومان</span>
          </div>
        </div>
      </div>
    </div>
  );
}

