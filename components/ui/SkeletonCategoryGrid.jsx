// components/ui/SkeletonCategoryGrid.jsx
export default function SkeletonCategoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 animate-pulse">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
        <div
          key={i}
          className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white"
        >
          {/* تصویر دسته‌بندی */}
          <div className="aspect-square w-full bg-gray-300 border-2 border-dashed rounded-xl" />

          {/* عنوان دسته‌بندی */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="h-6 bg-gray-200 rounded-lg w-4/5 mx-auto" />
          </div>

          {/* افکت هاور (برای زیبایی بیشتر) */}
          <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/20 transition-all duration-300" />
        </div>
      ))}
    </div>
  );
}