// components/ui/SkeletonProductCard.jsx
export default function SkeletonProductCard() {
  return (
    <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 animate-pulse bg-white">
      <div className="bg-gray-300 border-2 border-dashed rounded-t-xl w-full h-64" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-300 rounded-lg w-4/5" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-11/12" />
        </div>
        <div className="flex justify-between items-center pt-3">
          <div className="h-8 bg-amber-200 rounded-lg w-32" />
          <div className="h-10 bg-amber-500 rounded-xl w-28" />
        </div>
      </div>
    </div>
  );
}