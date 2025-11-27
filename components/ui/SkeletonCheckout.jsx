// components/ui/SkeletonCheckout.jsx
export default function SkeletonCheckout() {
  return (
    <div className="container mx-auto px-4 py-12 animate-pulse">
      {/* عنوان */}
      <div className="h-16 bg-gray-300 rounded-xl w-64 mx-auto mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* فرم ارسال */}
        <div className="space-y-6">
          <div className="h-10 bg-gray-300 rounded-xl w-48" />
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded-lg" />
            <div className="h-32 bg-gray-200 rounded-lg" />
            <div className="h-12 bg-gray-200 rounded-lg" />
            <div className="h-12 bg-gray-200 rounded-lg" />
            <div className="h-14 bg-gray-300 rounded-xl" />
          </div>
        </div>

        {/* جزئیات سفارش */}
        <div className="space-y-6">
          <div className="h-10 bg-gray-300 rounded-xl w-48" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 pb-4 border-b">
                <div className="bg-gray-300 rounded-lg w-16 h-16" />
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gray-300 rounded w-4/5" />
                  <div className="h-5 bg-gray-200 rounded w-32" />
                </div>
                <div className="h-7 bg-gray-300 rounded w-28" />
              </div>
            ))}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex justify-between">
                <div className="h-6 bg-gray-300 rounded w-32" />
                <div className="h-7 bg-gray-300 rounded w-32" />
              </div>
              <div className="flex justify-between">
                <div className="h-6 bg-gray-300 rounded w-24" />
                <div className="h-7 bg-green-200 rounded w-28" />
              </div>
              <div className="flex justify-between pt-4 border-t">
                <div className="h-8 bg-gray-400 rounded w-40" />
                <div className="h-9 bg-amber-400 rounded w-40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}