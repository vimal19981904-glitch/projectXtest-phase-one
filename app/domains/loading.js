import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
  return (
    <div className="w-full h-screen bg-[#F5F5F7] p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Skeleton */}
        <div className="w-full h-[300px] bg-gray-200 dark:bg-gray-800 rounded-[2.5rem] mb-12 animate-pulse" />
        
        {/* Content Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} className="h-[250px]" />
          ))}
        </div>
      </div>
    </div>
  );
}
