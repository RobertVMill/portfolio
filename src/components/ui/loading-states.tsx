// components/ui/loading-states.tsx
import React from 'react';

export const CardSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);

export const ProjectsSkeleton = () => (
  <div className="grid md:grid-cols-2 gap-8">
    {[1, 2, 3, 4].map((i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

export const TextSkeleton = () => (
  <div className="space-y-3 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
  </div>
);

// Usage example in projects/loading.tsx:
export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
      <div className="h-6 bg-gray-200 rounded w-2/3 mb-12 animate-pulse"></div>
      <ProjectsSkeleton />
    </div>
  );
}