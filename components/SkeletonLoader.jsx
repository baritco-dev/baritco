export default function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-64 bg-gray-200 rounded-lg"></div>
      <div className="h-8 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="flex gap-4">
        <div className="h-10 bg-gray-200 rounded w-32"></div>
        <div className="h-10 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );
}