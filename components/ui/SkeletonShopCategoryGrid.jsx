// components/ui/SkeletonShopCategoryGrid.jsx
export default function SkeletonShopCategoryGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 animate-pulse">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
        <div
          key={i}
          className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-gray-200"
        >
          {/* تصویر دسته‌بندی */}
          <div className="aspect-square w-full bg-gray-300 border-2 border-dashed rounded-2xl" />

          {/* عنوان دسته‌بندی */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-5">
            <div className="h-7 bg-gray-200 rounded-lg w-4/5 mx-auto" />
          </div>

          {/* افکت هاور */}
          <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition-all duration-300" />
        </div>
      ))}
    </div>
  );
}