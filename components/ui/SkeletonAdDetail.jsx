// components/ui/SkeletonAdDetail.jsx
export default function SkeletonAdDetail() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* بخش تصاویر */}
        <div className="space-y-4">
          <div className="bg-gray-300 border-2 border-dashed rounded-xl w-full h-96" />
          <div className="flex gap-3 overflow-x-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-300 rounded-lg w-28 h-24 flex-shrink-0" />
            ))}
          </div>
        </div>

        {/* بخش اطلاعات */}
        <div className="space-y-6">
          {/* نشان ویژه */}
          <div className="inline-block">
            <div className="bg-gray-300 rounded-full w-20 h-8" />
          </div>

          {/* عنوان */}
          <div className="h-10 bg-gray-300 rounded-lg w-11/12" />

          {/* توضیحات */}
          <div className="space-y-3">
            <div className="h-5 bg-gray-300 rounded w-full" />
            <div className="h-5 bg-gray-300 rounded w-full" />
            <div className="h-5 bg-gray-300 rounded w-11/12" />
            <div className="h-5 bg-gray-300 rounded w-10/12" />
          </div>

          {/* مشخصات */}
          <div className="border-t border-b py-6 space-y-4">
            <div className="flex justify-between">
              <div className="h-6 bg-gray-300 rounded w-32" />
              <div className="h-9 bg-amber-200 rounded-lg w-40" />
            </div>
            <div className="h-6 bg-gray-300 rounded w-48" />
            <div className="h-6 bg-gray-300 rounded w-36" />
            <div className="h-6 bg-gray-300 rounded w-44" />
          </div>

          {/* دکمه‌ها */}
          <div className="flex gap-4">
            <div className="h-14 bg-amber-500 rounded-xl w-48" />
            <div className="h-14 bg-green-500 rounded-xl w-48" />
          </div>
        </div>
      </div>
    </div>
  );
}