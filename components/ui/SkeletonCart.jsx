// components/ui/SkeletonCart.jsx
export default function SkeletonCart() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      {/* عنوان */}
      <div className="h-16 bg-gray-300 rounded-xl w-80 mx-auto mb-12" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* لیست محصولات */}
        <div className="lg:col-span-2 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex gap-6">
                <div className="bg-gray-300 rounded-xl w-32 h-32" />
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-gray-300 rounded-lg w-4/5" />
                  <div className="h-6 bg-gray-200 rounded w-3/5" />
                  <div className="flex items-center gap-4">
                    <div className="h-12 bg-gray-200 rounded-lg w-32" />
                    <div className="h-10 bg-gray-300 rounded-xl w-28" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* خلاصه سفارش */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div className="h-10 bg-gray-300 rounded-xl w-48" />
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="h-6 bg-gray-200 rounded w-32" />
              <div className="h-7 bg-gray-300 rounded w-32" />
            </div>
            <div className="h-14 bg-gray-300 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}