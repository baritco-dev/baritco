// components/ui/SkeletonAdCard.jsx
export default function SkeletonAdCard() {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-all animate-pulse bg-white">
      {/* تصویر */}
      <div className="bg-gray-300 border-2 border-dashed rounded-xl w-full h-48 mb-4" />

      {/* نشان ویژه */}
      <div className="absolute top-6 right-6">
        <div className="bg-gray-300 rounded-full w-16 h-6" />
      </div>

      {/* عنوان */}
      <div className="h-7 bg-gray-300 rounded-lg mb-3 w-4/5" />

      {/* توضیحات */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-300 rounded w-11/12" />
        <div className="h-4 bg-gray-300 rounded w-10/12" />
      </div>

      {/* قیمت و مکان */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-8 bg-amber-200 rounded-lg w-32" />
        <div className="h-5 bg-gray-300 rounded w-28" />
      </div>

      {/* تگ‌ها */}
      <div className="flex gap-2 mb-4">
        <div className="h-7 bg-gray-300 rounded-full px-4 w-20" />
        <div className="h-7 bg-gray-300 rounded-full px-4 w-24" />
      </div>

      {/* دکمه‌ها */}
      <div className="flex justify-between items-center">
        <div className="h-10 bg-amber-500 rounded-lg w-36" />
        <div className="h-9 bg-gray-300 rounded-full w-9" />
      </div>
    </div>
  );
}