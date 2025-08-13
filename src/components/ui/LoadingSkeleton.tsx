import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  type: 'card' | 'timeline' | 'list';
  count?: number;
}

export function LoadingSkeleton({ type, count = 3 }: LoadingSkeletonProps) {
  const shimmer = {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-xl p-4 border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <motion.div
            {...shimmer}
            className="w-8 h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg"
            style={{ backgroundSize: '200% 100%' }}
          />
          <motion.div
            {...shimmer}
            className="w-16 h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"
            style={{ backgroundSize: '200% 100%' }}
          />
        </div>
        <motion.div
          {...shimmer}
          className="w-12 h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full"
          style={{ backgroundSize: '200% 100%' }}
        />
      </div>
      
      <motion.div
        {...shimmer}
        className="w-3/4 h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded mb-2"
        style={{ backgroundSize: '200% 100%' }}
      />
      
      <motion.div
        {...shimmer}
        className="w-full h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded mb-1"
        style={{ backgroundSize: '200% 100%' }}
      />
      
      <motion.div
        {...shimmer}
        className="w-2/3 h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"
        style={{ backgroundSize: '200% 100%' }}
      />
    </div>
  );

  const SkeletonTimeline = () => (
    <div className="relative pb-8">
      <div className="absolute left-4 top-8 w-0.5 h-full bg-gray-200" />
      <div className="absolute left-2 top-6 w-4 h-4 bg-gray-300 rounded-full" />
      
      <div className="ml-10">
        <SkeletonCard />
      </div>
    </div>
  );

  const SkeletonList = () => (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
      <motion.div
        {...shimmer}
        className="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg"
        style={{ backgroundSize: '200% 100%' }}
      />
      <div className="flex-1">
        <motion.div
          {...shimmer}
          className="w-1/2 h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded mb-1"
          style={{ backgroundSize: '200% 100%' }}
        />
        <motion.div
          {...shimmer}
          className="w-3/4 h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"
          style={{ backgroundSize: '200% 100%' }}
        />
      </div>
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'timeline':
        return <SkeletonTimeline />;
      case 'list':
        return <SkeletonList />;
      default:
        return <SkeletonCard />;
    }
  };

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
}