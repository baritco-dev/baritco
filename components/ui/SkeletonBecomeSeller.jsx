// components/ui/SkeletonBecomeSeller.jsx
export default function SkeletonBecomeSeller() {
  return (
    <div className="container mx-auto px-4 py-16 animate-pulse">
      {/* عنوان */}
      <div className="text-center mb-16">
        <div className="h-12 bg-gray-300 rounded-xl w-96 mx-auto mb-6" />
        <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-4" />
        <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto" />
      </div>

      {/* کارت اصلی */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-10">
          <div className="space-y-8">
            <div className="h-14 bg-gray-200 rounded-xl" />
            <div className="h-14 bg-gray-200 rounded-xl" />
            <div className="h-32 bg-gray-200 rounded-xl" />
            <div className="h-14 bg-gray-200 rounded-xl" />
            <div className="flex gap-4">
              <div className="h-14 bg-gray-300 rounded-xl flex-1" />
              <div className="h-14 bg-amber-400 rounded-xl w-48" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}