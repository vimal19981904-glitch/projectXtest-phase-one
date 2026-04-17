import { cn } from "@/lib/utils";

/**
 * SkeletonCard - shimmering placeholder for domain cards.
 * @param className - additional classes for layout matching.
 */
export default function SkeletonCard({ className }) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 border border-[#D2D2D7]/50",
        className
      )}
    >
      {/* Animated Shimmer Overlay */}
      <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-r from-transparent via-[#E8E8ED]/30 dark:via-gray-700/50 to-transparent" />
      
      {/* Card Content Skeleton Structure */}
      <div className="p-8 space-y-6 relative z-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded-md" />
        </div>
        
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-md" />
          <div className="h-4 w-[90%] bg-gray-200 dark:bg-gray-700 rounded-md" />
          <div className="h-4 w-[70%] bg-gray-200 dark:bg-gray-700 rounded-md" />
        </div>
        
        <div className="pt-6 border-t border-[#D2D2D7]/20 flex justify-between items-center">
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded-md" />
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md" />
        </div>
      </div>
    </div>
  );
}
