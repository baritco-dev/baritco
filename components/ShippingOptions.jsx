import React, { useMemo } from 'react';

export default function ShippingOptions({ selectedMethod, onSelect }) {
  const shippingOptions = useMemo(() => [
    { name: 'پست', value: 'post', cost: 50000 },
    { name: 'تیپاکس (پس‌کرایه)', value: 'tipax', cost: 0 },
    { name: 'باربری (پس‌کرایه)', value: 'barbari', cost: 0 },
    { name: 'پرداخت در محل', value: 'cod', cost: 0 },
  ], []);

  const handleSelect = (option) => {
    onSelect(option);
    localStorage.setItem('shippingMethod', JSON.stringify(option));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-amber-100 mb-4 flex items-center gap-2">
        <svg
          className="w-6 h-6 text-amber-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        روش ارسال
      </h3>
      <div className="space-y-2">
        {shippingOptions.map((option) => (
          <label key={option.value} className="flex items-center gap-2">
            <input
              type="radio"
              name="shipping"
              value={option.value}
              checked={selectedMethod?.value === option.value}
              onChange={() => handleSelect(option)}
              className="form-radio text-amber-500 focus:ring-amber-500"
            />
            <span className="text-gray-800 dark:text-amber-100">
              {option.name}: {option.cost === 0 ? 'رایگان' : `${option.cost.toLocaleString('fa-IR')} تومان`}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

