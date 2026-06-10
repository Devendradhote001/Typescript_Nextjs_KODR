import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ProductSkeleton() {
  return (
    <Card className="overflow-hidden border-border bg-card">
      {/* Image */}
      <Skeleton className="h-64 w-full rounded-none" />

      <CardContent className="space-y-4 p-5">
        {/* Category */}
        <Skeleton className="h-5 w-24 rounded-full" />

        {/* Title */}
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />

        {/* Description */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />

        {/* Rating */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-5 pt-0">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-10 w-28 rounded-md" />
      </CardFooter>
    </Card>
  );
}

export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}