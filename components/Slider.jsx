"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Slider({ items = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!items || items.length === 0) return; // جلوگیری از اجرای تایمر اگر items خالی باشد

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000); // تغییر اسلاید هر 5 ثانیه
    return () => clearInterval(interval);
  }, [items]); // وابستگی به items به جای items.length

  if (!items || items.length === 0) {
    return <div className="text-center py-8">هیچ موردی برای نمایش وجود ندارد</div>;
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white p-4">
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p>{item.description.slice(0, 100)}...</p>
          </div>
        </div>
      ))}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full"
      >
        &larr;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full"
      >
        &rarr;
      </button>
    </div>
  );
}